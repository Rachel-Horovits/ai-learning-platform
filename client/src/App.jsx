import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./store/UserContext";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import PromptPage from "./pages/PromptPage";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/prompt" element={<PromptPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
export default App;