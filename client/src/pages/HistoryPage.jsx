import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      getHistory(user._id).then(res => setHistory(res.data));
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>היסטוריית למידה</h2>
      <ul>
        {history.map((item) => (
          <li key={item._id}>
            <b>נושא:</b> {item.category?.name}<br />
            <b>תת-נושא:</b> {item.subCategory?.name}<br />
            <b>שאלה:</b> {item.prompt}<br />
            <b>תשובה:</b> {item.response}
          </li>
        ))}
      </ul>
    </div>
  );
}