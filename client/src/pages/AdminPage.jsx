import { useEffect, useState } from "react";
import { getUsers, getHistory } from "../services/api";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  const handleSelectUser = async (userId) => {
    setSelectedUser(userId);
    const res = await getHistory(userId);
    setHistory(res.data);
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>משתמשים:</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            <button onClick={() => handleSelectUser(u._id)}>
              {u.name} ({u.phone})
            </button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h3>היסטוריית פרומפטים:</h3>
          <ul>
            {history.map((item) => (
              <li key={item._id}>
                <b>שאלה:</b> {item.prompt} <br />
                <b>תשובה:</b> {item.response}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}