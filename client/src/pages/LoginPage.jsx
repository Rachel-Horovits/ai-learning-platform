import { useState } from "react";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function LoginPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { login, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/categories");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, phone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>הרשמה / כניסה</h2>
      <input placeholder="שם" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} />
      <button type="submit">התחבר</button>
    </form>
  );
}