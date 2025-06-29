import { useEffect, useState } from "react";
import { sendPrompt } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../store/UserContext";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Fade,
  Avatar,
} from "@mui/material";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import SendIcon from "@mui/icons-material/Send";
import bgImage from "../assets/background.png";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const { category, subCategory } = location.state || {};

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (!category || !subCategory) {
      navigate("/categories");
    }
  }, [user, category, subCategory, navigate]);

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
      setResponse("Error sending your question.");
    }
    setLoading(false);
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
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 6,
            maxWidth: 540,
            width: "100%",
            textAlign: "center",
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 8px 32px 0 #b2dfdb55, 0 1.5px 8px 0 #80cbc455",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#26c6da",
              width: 72,
              height: 72,
              mb: 2,
              boxShadow: 3,
              animation: "pulse 2s infinite alternate",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 #26c6da55" },
                "100%": { boxShadow: "0 0 32px 8px #26c6da33" },
              },
            }}
          >
            <PsychologyAltIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="primary" mb={1}>
            Ask AI Anything
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Type your science question and get an instant answer!
          </Typography>
          <TextField
            multiline
            minRows={3}
            maxRows={8}
            variant="outlined"
            placeholder="Type your question here..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              background: "rgba(240,248,255,0.7)",
              borderRadius: 2,
              fontSize: 18,
            }}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  onClick={handleSend}
                  disabled={!prompt || loading}
                  sx={{
                    borderRadius: 3,
                    ml: 1,
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #26c6da 0%, #80deea 100%)",
                  }}
                >
                  Send
                </Button>
              ),
            }}
            onKeyDown={e => {
              if (e.ctrlKey && e.key === "Enter" && prompt && !loading) {
                handleSend();
              }
            }}
          />
          {loading && (
            <Box sx={{ mt: 3 }}>
              <CircularProgress color="primary" />
              <Typography variant="body2" color="text.secondary" mt={1}>
                Thinking...
              </Typography>
            </Box>
          )}
          {response && (
            <Fade in timeout={600}>
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #e0f7fa 0%, #f1fcfb 100%)",
                  boxShadow: "0 2px 8px 0 #b2dfdb33",
                  textAlign: "left",
                  width: "100%",
                  minHeight: 80,
                  fontSize: 18,
                  color: "#263238",
                  position: "relative",
                }}
              >
                <Typography variant="subtitle2" color="primary" mb={1}>
                  AI's Answer:
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {response}
                </Typography>
              </Box>
            </Fade>
          )}
        </Paper>
      </Fade>
    </Box>
  );
}