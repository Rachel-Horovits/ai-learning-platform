import { useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/UserContext";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getSubCategories(selectedCategory).then(res => setSubCategories(res.data));
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleNext = () => {
    if (selectedCategory && selectedSubCategory) {
      navigate("/prompt", { state: { category: selectedCategory, subCategory: selectedSubCategory } });
    }
  };

  return (
    <div>
      <h2>בחר קטגוריה ותת-קטגוריה</h2>
      <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        <option value="">בחר קטגוריה</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <select value={selectedSubCategory} onChange={e => setSelectedSubCategory(e.target.value)} disabled={!selectedCategory}>
        <option value="">בחר תת-קטגוריה</option>
        {subCategories.map(sub => (
          <option key={sub._id} value={sub._id}>{sub.name}</option>
        ))}
      </select>
      <button onClick={handleNext} disabled={!selectedCategory || !selectedSubCategory}>המשך</button>
    </div>
  );
}