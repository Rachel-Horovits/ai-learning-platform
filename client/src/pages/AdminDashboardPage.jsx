import { useEffect, useState } from "react";
import { getAllUsers, getAllPrompts, createAdmin } from "../services/api";
import { useUser } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import AdminAdvanced from "./AdminAdvancedPage";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Fade,
  Chip,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  IconButton,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CloseIcon from "@mui/icons-material/Close";
import bgImage from "../assets/background.png";

export default function AdminDashboard() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      getAllUsers().then(res => setUsers(res.data));
    }
  }, [user, navigate]);

  const handleSelectUser = async (userId) => {
    setSelectedUser(userId);
    const res = await getAllPrompts(userId);
    setPrompts(res.data);
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setAdminError("");
    setAdminSuccess("");
    if (!adminName || !adminPhone) {
      setAdminError("All fields are required.");
      return;
    }
    try {
      await createAdmin(adminName, adminPhone);
      setAdminSuccess("Admin added successfully!");
      setAdminName("");
      setAdminPhone("");
      getAllUsers().then(res => setUsers(res.data));
    } catch (err) {
      setAdminError(err.response?.data?.error || "Error adding admin");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `url(${bgImage}) center center/cover no-repeat`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: 8,
        pb: 4,
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={12}
          sx={{
            p: 5,
            borderRadius: 6,
            maxWidth: 900,
            width: "100%",
            minHeight: 500,
            background: "rgba(255,255,255,0.98)",
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
              width: 80,
              height: 80,
              mb: 2,
              boxShadow: 3,
              animation: "pulse 2s infinite alternate",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 #26c6da55" },
                "100%": { boxShadow: "0 0 32px 8px #26c6da33" },
              },
            }}
          >
            <AdminPanelSettingsIcon fontSize="large" />
          </Avatar>
          <Typography variant="h3" fontWeight={700} color="primary" mb={1}>
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Manage users, admins, and platform content
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(90deg, #e0f7fa 0%, #f1fcfb 100%)",
              boxShadow: "0 2px 8px 0 #b2dfdb33",
              width: "100%",
              mb: 3,
            }}
          >
            <form onSubmit={handleCreateAdmin} style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Typography variant="h6" color="primary" sx={{ minWidth: 120 }}>
                Add New Admin
              </Typography>
              <TextField
                placeholder="Name"
                value={adminName}
                onChange={e => setAdminName(e.target.value)}
                size="small"
                required
                sx={{ minWidth: 120 }}
                InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
              />
              <TextField
                placeholder="Phone"
                value={adminPhone}
                onChange={e => setAdminPhone(e.target.value)}
                size="small"
                required
                sx={{ minWidth: 120 }}
                InputProps={{ startAdornment: <PhoneIphoneIcon sx={{ mr: 1 }} /> }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 3,
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #26c6da 0%, #80deea 100%)",
                }}
              >
                Add Admin
              </Button>
              {adminError && <Typography color="error">{adminError}</Typography>}
              {adminSuccess && <Typography color="success.main">{adminSuccess}</Typography>}
            </form>
          </Paper>
          <Box sx={{ width: "100%", display: "flex", gap: 4 }}>
            <Paper
              elevation={2}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 4,
                background: "rgba(240,248,255,0.7)",
                minHeight: 300,
                maxHeight: 400,
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" color="primary" mb={2}>
                Users
              </Typography>
              <List>
                {users.map(u => (
                  <ListItem
                    key={u._id}
                    button
                    selected={selectedUser === u._id}
                    onClick={() => handleSelectUser(u._id)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      transition: "background 0.2s",
                      "&:hover": { background: "#e0f7fa" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: u.role === "admin" ? "#26c6da" : "#b2dfdb" }}>
                        {u.role === "admin" ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <span>
                          {u.name} <Chip label={u.role === "admin" ? "Admin" : "User"} size="small" color={u.role === "admin" ? "primary" : "default"} sx={{ ml: 1 }} />
                        </span>
                      }
                      secondary={u.phone}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Paper
              elevation={2}
              sx={{
                flex: 2,
                p: 2,
                borderRadius: 4,
                background: "rgba(240,248,255,0.7)",
                minHeight: 300,
                maxHeight: 400,
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" color="primary" mb={2}>
                Prompt History
              </Typography>
              {selectedUser ? (
                prompts.length === 0 ? (
                  <Typography color="text.secondary" sx={{ mt: 2 }}>
                    No prompt history for this user.
                  </Typography>
                ) : (
                  prompts.map((item) => (
                    <Paper
                      key={item._id}
                      elevation={1}
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 3,
                        background: "linear-gradient(90deg, #e0f7fa 0%, #f1fcfb 100%)",
                        boxShadow: "0 2px 8px 0 #b2dfdb33",
                      }}
                    >
                      <Typography variant="subtitle2" color="primary">
                        {item.category?.name} / {item.subCategory?.name}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                        <b>Question:</b> {item.prompt}
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                        <b>Answer:</b> {item.response}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(item.createdAt).toLocaleString()}
                      </Typography>
                    </Paper>
                  ))
                )
              ) : (
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                  Select a user to view prompt history
                </Typography>
              )}
            </Paper>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              mt: 4,
              borderRadius: 3,
              fontWeight: 700,
              px: 4,
              background: "linear-gradient(90deg, #e0f7fa 0%, #f1fcfb 100%)",
              boxShadow: 2,
            }}
            onClick={() => setShowAdvanced(true)}
          >
            Advanced Options
          </Button>
          <Dialog open={showAdvanced} onClose={() => setShowAdvanced(false)} maxWidth="md" fullWidth>
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
              <IconButton onClick={() => setShowAdvanced(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <AdminAdvanced onClose={() => setShowAdvanced(false)} />
          </Dialog>
        </Paper>
      </Fade>
    </Box>
  );
}