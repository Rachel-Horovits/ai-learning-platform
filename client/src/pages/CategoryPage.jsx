import { useEffect, useState } from "react";
import { getCategories, getSubCategories } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/UserContext";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Avatar,
  Fade,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import bgImage from "../assets/background.png";

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
      setSelectedSubCategory("");
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
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `url(${bgImage}) center center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: 420,
            width: "100%",
            textAlign: "center",
            background: "rgba(255,255,255,0.93)",
            boxShadow: "0 8px 32px 0 #b2dfdb55, 0 1.5px 8px 0 #80cbc455",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#26c6da",
              width: 64,
              height: 64,
              mb: 2,
              boxShadow: 2,
            }}
          >
            <CategoryIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="primary" mb={1}>
            Choose Your Topic
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Select a category and sub-category to continue
          </Typography>
          <Box sx={{ width: "100%", mb: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">
                <CategoryIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                label="Category"
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>Choose category</em>
                </MenuItem>
                {categories.map(cat => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" disabled={!selectedCategory}>
              <InputLabel id="sub-category-label">
                <SubtitlesIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Sub-Category
              </InputLabel>
              <Select
                labelId="sub-category-label"
                value={selectedSubCategory}
                label="Sub-Category"
                onChange={e => setSelectedSubCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>Choose sub-category</em>
                </MenuItem>
                {subCategories.map(sub => (
                  <MenuItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!selectedCategory || !selectedSubCategory}
            sx={{
              mt: 2,
              borderRadius: 3,
              fontWeight: 700,
              letterSpacing: 1,
              boxShadow: 2,
              background: "linear-gradient(90deg, #26c6da 0%, #80deea 100%)",
              color: "#fff",
            }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
}