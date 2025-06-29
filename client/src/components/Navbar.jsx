import { useUser } from "../store/UserContext";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box, Avatar, Tooltip } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Navbar() {
  const { user, logout } = useUser();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(255,255,255,0.92)",
        boxShadow: "0 4px 24px 0 #e0e0e033",
        mb: 2,
        backdropFilter: "blur(8px)",
      }}
      elevation={6}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              letterSpacing: 2,
              color: "#4e342e",
              textShadow: "0 1px 8px #fffde755",
            }}
          >
            AI Learning Platform
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/categories"
                startIcon={<MenuBookIcon />}
                sx={{
                  fontWeight: location.pathname === "/categories" ? 700 : 500,
                  color: location.pathname === "/categories" ? "#6d4c41" : "#6d4c41",
                  bgcolor: location.pathname === "/categories" ? "#fffde7" : "transparent",
                  borderRadius: 3,
                  px: 2,
                  transition: "0.2s",
                  "&:hover": { bgcolor: "#fffde7", color: "#6d4c41" },
                }}
              >
                Learning
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/history"
                startIcon={<HistoryEduIcon />}
                sx={{
                  fontWeight: location.pathname === "/history" ? 700 : 500,
                  color: location.pathname === "/history" ? "#6d4c41" : "#6d4c41",
                  bgcolor: location.pathname === "/history" ? "#fffde7" : "transparent",
                  borderRadius: 3,
                  px: 2,
                  transition: "0.2s",
                  "&:hover": { bgcolor: "#fffde7", color: "#6d4c41" },
                }}
              >
                History
              </Button>
              {user.role === "admin" && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  startIcon={<AdminPanelSettingsIcon />}
                  sx={{
                    fontWeight: location.pathname === "/admin" ? 700 : 500,
                    color: location.pathname === "/admin" ? "#6d4c41" : "#6d4c41",
                    bgcolor: location.pathname === "/admin" ? "#fffde7" : "transparent",
                    borderRadius: 3,
                    px: 2,
                    transition: "0.2s",
                    "&:hover": { bgcolor: "#fffde7", color: "#6d4c41" },
                  }}
                >
                  Admin
                </Button>
              )}
              <Tooltip title="Logout">
                <Button
                  color="inherit"
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    fontWeight: 700,
                    color: "#fff",
                    borderRadius: 3,
                    px: 2,
                    ml: 1,
                    bgcolor: "#bdbdbd",
                    "&:hover": { bgcolor: "#9e9e9e" },
                  }}
                >
                  Logout
                </Button>
              </Tooltip>
              <Avatar sx={{ bgcolor: "#fffde7", color: "#6d4c41", ml: 2, fontWeight: 700 }}>
                {user.name?.[0]?.toUpperCase() || "U"}
              </Avatar>
            </>
          ) : (
            <Typography
              sx={{
                fontWeight: 700,
                color: "#bdbdbd",
                px: 2,
                fontSize: 18,
                letterSpacing: 1,
              }}
            >
              Please log in
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}