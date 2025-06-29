import { useState, useEffect } from "react";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Alert,
  InputAdornment,
  useTheme,
  Fade,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import bgImage from "../assets/background.png";
import SplashCircle from "../components/SplashCircle";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const { login, user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      navigate("/categories");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(name, phone);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
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
        overflow: "hidden",
      }}
    >
      {showSplash && (
        <SplashCircle
          onFinish={() => setShowSplash(false)}
          showSkip={true}
          onSkip={() => setShowSplash(false)}
        />
      )}
      {/* Main login circle */}
      <Fade in={!showSplash} timeout={600}>
        <Box
          sx={{
            width: { xs: 340, sm: 420 },
            height: { xs: 340, sm: 420 },
            borderRadius: "50%",
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 32px 0 #b2dfdb55, 0 1.5px 8px 0 #80cbc455",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            position: "relative",
            backdropFilter: "blur(2px)",
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
            <ScienceIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="primary" mb={1}>
            AI Science Learning
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Smart science learning platform
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={e => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar sx={{ bgcolor: "#b2ebf2", width: 24, height: 24, fontSize: 14 }}>👤</Avatar>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar sx={{ bgcolor: "#b2ebf2", width: 24, height: 24, fontSize: 14 }}>📱</Avatar>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                borderRadius: 3,
                fontWeight: 700,
                letterSpacing: 1,
                boxShadow: 2,
                background: "linear-gradient(90deg, #26c6da 0%, #80deea 100%)",
                color: "#fff",
              }}
            >
              Sign In
            </Button>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </form>
        </Box>
      </Fade>
    </Box>
  );
}