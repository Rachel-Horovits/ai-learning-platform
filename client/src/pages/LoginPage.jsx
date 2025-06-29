import { useState, useEffect } from "react";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/categories");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(name, phone);
    } catch (err) {
      setError(err.response?.data?.error || "שגיאה בהתחברות");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>הרשמה / כניסה</h2>
      <input placeholder="שם" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} />
      <button type="submit">התחבר</button>
      {error && <div style={{ color: "red" }}>{error}</div>}

    </form>
  );
}