import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
} from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    if (!categoryName) {
      setCategoryError("Category name is required.");
      return;
    }
    try {
      await createCategory(categoryName);
      setCategoryName("");
      getAllCategories().then(res => setCategories(res.data));
    } catch (err) {
      setCategoryError(err.response?.data?.error || "Error adding category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    getAllCategories().then(res => setCategories(res.data));
  };

  const handleCreateSubCategory = async (e) => {
    e.preventDefault();
    setSubCategoryError("");
    if (!subCategoryName || !subCategoryCategory) {
      setSubCategoryError("All fields are required.");
      return;
    }
    try {
      await createSubCategory(subCategoryName, subCategoryCategory);
      setSubCategoryName("");
      setSubCategoryCategory("");
      getAllSubCategories().then(res => setSubCategories(res.data));
    } catch (err) {
      setSubCategoryError(err.response?.data?.error || "Error adding sub-category");
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    await deleteSubCategory(subCategoryId);
    getAllSubCategories().then(res => setSubCategories(res.data));
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        borderRadius: 5,
        minWidth: 350,
        maxWidth: 600,
        m: "auto",
        background: "linear-gradient(120deg, #e0f7fa 0%, #f1fcfb 100%)",
        boxShadow: "0 8px 32px 0 #b2dfdb55",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h5" color="primary" fontWeight={700} mb={2}>
        Advanced Management Options
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600} color="primary">
            Category Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleCreateCategory}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <TextField
                placeholder="Category Name"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                size="small"
                required
                InputProps={{
                  startAdornment: <CategoryIcon sx={{ mr: 1 }} />,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 3, fontWeight: 700 }}
              >
                Add
              </Button>
            </Box>
            {categoryError && <Alert severity="error" sx={{ mb: 2 }}>{categoryError}</Alert>}
          </form>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Existing Categories
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {categories.map(cat => (
              <Chip
                key={cat._id}
                label={cat.name}
                color="primary"
                icon={<CategoryIcon />}
                onDelete={() => handleDeleteCategory(cat._id)}
                deleteIcon={<DeleteIcon />}
                sx={{ fontWeight: 600, fontSize: 16, px: 2 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600} color="secondary">
            Sub-Category Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleCreateSubCategory}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <TextField
                placeholder="Sub-Category Name"
                value={subCategoryName}
                onChange={e => setSubCategoryName(e.target.value)}
                size="small"
                required
                InputProps={{
                  startAdornment: <SubtitlesIcon sx={{ mr: 1 }} />,
                }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }} required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={subCategoryCategory}
                  label="Category"
                  onChange={e => setSubCategoryCategory(e.target.value)}
                  required
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 3, fontWeight: 700 }}
              >
                Add
              </Button>
            </Box>
            {subCategoryError && <Alert severity="error" sx={{ mb: 2 }}>{subCategoryError}</Alert>}
          </form>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Existing Sub-Categories
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {subCategories.map(sub => (
              <Chip
                key={sub._id}
                label={`${sub.name} (${sub.category?.name || ""})`}
                color="secondary"
                icon={<SubtitlesIcon />}
                onDelete={() => handleDeleteSubCategory(sub._id)}
                deleteIcon={<DeleteIcon />}
                sx={{ fontWeight: 600, fontSize: 16, px: 2 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}