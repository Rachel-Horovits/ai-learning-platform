import { useState } from "react";
import { sendPrompt } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../store/UserContext";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const { category, subCategory } = location.state || {};

  const handleSend = async () => {
    setLoading(true);
    setResponse("");
    try {
      const res = await sendPrompt({
        user: user._id,
        category,
        subCategory,
        prompt,
      });
      setResponse(res.data.response);
    } catch (err) {
      setResponse("שגיאה בשליחת השאלה");
    }
    setLoading(false);
  };

  if (!user) {
    navigate("/");
    return null;
  }
  if (!category || !subCategory) {
    navigate("/categories");
    return null;
  }

  return (
    <div>
      <h2>שלח שאלה ל-AI</h2>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="כתוב כאן את השאלה שלך..." />
      <button onClick={handleSend} disabled={!prompt || loading}>שלח</button>
      {loading && <div>טוען תשובה...</div>}
      {response && (
        <div>
          <h3>תשובת ה-AI:</h3>
          <div>{response}</div>
        </div>
      )}
    </div>
  );
}