import { useUser } from "../store/UserContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* להוסיף דף אודות<Link to="/">בית</Link>{" | "} */}
      {user && (
        <>
          <Link to="/categories">פלטפורמת למידה</Link>{" | "}
          <Link to="/history">היסטוריה</Link>{" | "}
          <button onClick={logout}>התנתק</button>
        </>
      )}
      {!user && <span>אנא התחבר</span>}
    </nav>
  );
}