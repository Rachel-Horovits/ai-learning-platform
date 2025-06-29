import { useEffect, useState } from "react";
import { getAllUsers, getAllPrompts, createAdmin } from "../services/api";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import AdminAdvanced from "./AdminAdvancedPage";

export default function AdminDashboard() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      getAllUsers().then(res => setUsers(res.data));
    }
  }, [user, navigate]);

  const handleSelectUser = async (userId) => {
    setSelectedUser(userId);
    const res = await getAllPrompts(userId);
    setPrompts(res.data);
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setAdminError("");
    setAdminSuccess("");
    try {
      await createAdmin(adminName, adminPhone);
      setAdminSuccess("מנהל נוסף בהצלחה!");
      setAdminName("");
      setAdminPhone("");
      getAllUsers().then(res => setUsers(res.data));
    } catch (err) {
      setAdminError(err.response?.data?.error || "שגיאה בהוספת מנהל");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleCreateAdmin}>
        <h3>הוסף מנהל חדש</h3>
        <input
          placeholder="שם"
          value={adminName}
          onChange={e => setAdminName(e.target.value)}
        />
        <input
          placeholder="טלפון"
          value={adminPhone}
          onChange={e => setAdminPhone(e.target.value)}
        />
        <button type="submit">הוסף מנהל</button>
        {adminError && <div style={{ color: "red" }}>{adminError}</div>}
        {adminSuccess && <div style={{ color: "green" }}>{adminSuccess}</div>}
      </form>

      <h3>משתמשים:</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            <button onClick={() => handleSelectUser(u._id)}>
              {u.name} ({u.phone}) {u.role === "admin" && <b>[מנהל]</b>}
            </button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h3>היסטוריית פרומפטים:</h3>
          <ul>
            {prompts.map((item) => (
              <li key={item._id}>
                <b>נושא:</b> {item.category?.name}<br />
                <b>תת-נושא:</b> {item.subCategory?.name}<br />
                <b>שאלה:</b> {item.prompt} <br />
                <b>תשובה:</b> {item.response}<br />
                <b>נשלח בתאריך:</b> {new Date(item.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={() => setShowAdvanced(true)}>אפשרויות נוספות</button>
      {showAdvanced && <AdminAdvanced onClose={() => setShowAdvanced(false)} />}
    </div>
  );
}