import { useState, useEffect } from "react";
import { Box, Typography, Fade } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import IconButton from "@mui/material/IconButton";

const splashMessages = [
  {
    text: "Welcome to the future of science learning!",
    icon: <ScienceIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />,
  },
  {
    text: "Personalized AI-powered lessons for every learner.",
    icon: <PsychologyIcon color="secondary" sx={{ fontSize: 32, mr: 1 }} />,
  },
  {
    text: "Track your progress and explore new topics.",
    icon: <SchoolIcon color="success" sx={{ fontSize: 32, mr: 1 }} />,
  },
  {
    text: "Ask, learn, and grow with AI.",
    icon: <EmojiObjectsIcon color="warning" sx={{ fontSize: 32, mr: 1 }} />,
  },
];

export default function SplashCircle({ onFinish, showSkip, onSkip }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [hide, setHide] = useState(false);

  // Change message every second
  useEffect(() => {
    if (hide) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIdx((idx) => (idx + 1) % splashMessages.length);
        setFade(true);
      }, 300);
    }, 1000);
    return () => clearInterval(interval);
  }, [hide]);

  // Hide after 4 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHide(true);
      setTimeout(onFinish, 600); // fade out
    }, 4000);
    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <>
      <Fade in={!hide} timeout={600}>
        <Box
          sx={{
            width: { xs: 340, sm: 420 },
            height: { xs: 340, sm: 420 },
            borderRadius: "50%",
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 8px 32px 0 #b2dfdb55, 0 1.5px 8px 0 #80cbc455",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 10,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "spin 5s linear infinite",
            "@keyframes spin": {
              "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
            },
          }}
        >
          <Fade in={fade} timeout={300} key={msgIdx}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: 3,
                textAlign: "center",
              }}
            >
              <Box>{splashMessages[msgIdx].icon}</Box>
              <Typography variant="h6" fontWeight={600} mt={2}>
                {splashMessages[msgIdx].text}
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Fade>
      {/* Skip button fixed at the bottom of the screen */}
      {showSkip && !hide && (
        <Box
          sx={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
        >
          <IconButton
            size="large"
            sx={{
              color: "grey.700",
              opacity: 0.85,
              fontSize: 18,
              background: "rgba(255,255,255,0.7)",
              px: 3,
              borderRadius: 3,
              boxShadow: 2,
              "&:hover": { background: "rgba(255,255,255,0.95)" },
            }}
            onClick={() => {
              setHide(true);
              setTimeout(onSkip, 600);
            }}
          >
            Skip
          </IconButton>
        </Box>
      )}
    </>
  );
}