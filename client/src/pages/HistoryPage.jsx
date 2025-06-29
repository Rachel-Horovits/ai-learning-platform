import { useEffect, useState } from "react";
import { getHistory } from "../services/api";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Fade,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CategoryIcon from "@mui/icons-material/Category";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import bgImage from "../assets/background.png";

export default function HistoryPage() {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      getHistory(user._id).then(res => setHistory(res.data));
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw", // הוספה
        boxSizing: "border-box", // הוספה
        background: `url(${bgImage}) center center/cover no-repeat`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: 8,
        pb: 4,
        overflowX: "hidden", // הוספה

      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 6,
            maxWidth: 700,
            width: "100%",
            minHeight: 400,
            background: "rgba(255,255,255,0.97)",
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
            <HistoryEduIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="primary" mb={1}>
            Learning History
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            All your questions and AI answers in one place
          </Typography>
          <Box sx={{ width: "100%", mt: 2 }}>
            {history.length === 0 ? (
              <Typography color="text.secondary" sx={{ mt: 6, textAlign: "center" }}>
                No history yet. Start asking questions!
              </Typography>
            ) : (
              history.map((item, idx) => (
                <Paper
                  key={item._id}
                  elevation={3}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: 4,
                    background: "linear-gradient(90deg, #e0f7fa 0%, #f1fcfb 100%)",
                    boxShadow: "0 2px 8px 0 #b2dfdb33",
                    position: "relative",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Chip
                      icon={<CategoryIcon color="primary" />}
                      label={item.category?.name || "Unknown"}
                      sx={{ mr: 1, fontWeight: 600, bgcolor: "#e0f7fa" }}
                    />
                    <Chip
                      icon={<SubtitlesIcon color="secondary" />}
                      label={item.subCategory?.name || "Unknown"}
                      sx={{ mr: 1, fontWeight: 600, bgcolor: "#fce4ec" }}
                    />
                    <Chip
                      icon={<DoneAllIcon color="success" />}
                      label={new Date(item.createdAt).toLocaleString()}
                      sx={{ fontWeight: 600, bgcolor: "#e8f5e9" }}
                    />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                    <Tooltip title="Your Question" arrow>
                      <Avatar sx={{ bgcolor: "#80deea", mr: 2 }}>
                        <PsychologyAltIcon />
                      </Avatar>
                    </Tooltip>
                    <Box>
                      <Typography variant="subtitle2" color="primary">
                        Question:
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {item.prompt}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Tooltip title="AI's Answer" arrow>
                      <Avatar sx={{ bgcolor: "#b2dfdb", mr: 2 }}>
                        <HistoryEduIcon />
                      </Avatar>
                    </Tooltip>
                    <Box>
                      <Typography variant="subtitle2" color="secondary">
                        Answer:
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                        {item.response}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))
            )}
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}