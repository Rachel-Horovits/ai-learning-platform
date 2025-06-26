import { useUser } from "../store/UserContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/">בית</Link>{" | "}
      {user && (
        <>
          <Link to="/categories">קטגוריות</Link>{" | "}
          <Link to="/prompt">שלח שאלה</Link>{" | "}
          <Link to="/history">היסטוריה</Link>{" | "}
          <button onClick={logout}>התנתק</button>
        </>
      )}
      {!user && <span>אנא התחבר</span>}
    </nav>
  );
}