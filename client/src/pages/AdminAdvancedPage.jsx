import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  deleteUser,
  deletePrompt,
  getAllPrompts
} from "../services/api";

export default function AdminAdvanced({ onClose }) {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryCategory, setSubCategoryCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");

  useEffect(() => {
    getAllCategories().then(res => setCategories(res.data));
    getAllSubCategories().then(res => setSubCategories(res.data));
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setCategoryError("");
    try {
      await createCategory(categoryName);
      setCategoryName("");
      getAllCategories().then(res => setCategories(res.data));
    } catch (err) {
      setCategoryError(err.response?.data?.error || "שגיאה בהוספת קטגוריה");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    getAllCategories().then(res => setCategories(res.data));
  };

  const handleCreateSubCategory = async (e) => {
    e.preventDefault();
    setSubCategoryError("");
    try {
      await createSubCategory(subCategoryName, subCategoryCategory);
      setSubCategoryName("");
      setSubCategoryCategory("");
      getAllSubCategories().then(res => setSubCategories(res.data));
    } catch (err) {
      setSubCategoryError(err.response?.data?.error || "שגיאה בהוספת תת-קטגוריה");
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    await deleteSubCategory(subCategoryId);
    getAllSubCategories().then(res => setSubCategories(res.data));
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.3)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: 30, borderRadius: 8, minWidth: 350, maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ float: "left" }}>סגור</button>
        <h2>אפשרויות ניהול מתקדמות</h2>

        <form onSubmit={handleCreateCategory}>
          <h3>הוסף קטגוריה</h3>
          <input
            placeholder="שם קטגוריה"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
          />
          <button type="submit">הוסף קטגוריה</button>
          {categoryError && <div style={{ color: "red" }}>{categoryError}</div>}
        </form>

        <h3>קטגוריות:</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat._id}>
              {cat.name}
              <button onClick={() => handleDeleteCategory(cat._id)} style={{ color: "red" }}>מחק</button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleCreateSubCategory}>
          <h3>הוסף תת-קטגוריה</h3>
          <input
            placeholder="שם תת-קטגוריה"
            value={subCategoryName}
            onChange={e => setSubCategoryName(e.target.value)}
          />
          <select
            value={subCategoryCategory}
            onChange={e => setSubCategoryCategory(e.target.value)}
          >
            <option value="">בחר קטגוריה</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <button type="submit">הוסף תת-קטגוריה</button>
          {subCategoryError && <div style={{ color: "red" }}>{subCategoryError}</div>}
        </form>

        <h3>תתי קטגוריות:</h3>
        <ul>
          {subCategories.map(sub => (
            <li key={sub._id}>
              {sub.name} ({sub.category?.name})
              <button onClick={() => handleDeleteSubCategory(sub._id)} style={{ color: "red" }}>מחק</button>
            </li>
          ))}
        </ul>

        {/* אפשר להוסיף כאן ניהול פרומפטים, מחיקת משתמשים וכו' */}
      </div>
    </div>
  );
}