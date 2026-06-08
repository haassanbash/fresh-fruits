"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Divider,
  CircularProgress,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SettingsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const getToken = () => localStorage.getItem("adminToken") || "";

  useEffect(() => {
    let cancelled = false;
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
      return;
    }
    if (!isAuthenticated) return;

    fetch("/api/auth/credentials", {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.email) {
          setCurrentEmail(data.email);
          setNewEmail(data.email);
        }
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setSnackbar({ open: true, message: "Password must be at least 6 characters", severity: "error" });
      return;
    }

    setSaving(true);
    try {
      const body: { email?: string; password?: string } = {};
      if (newEmail !== currentEmail) body.email = newEmail;
      if (newPassword) body.password = newPassword;

      const res = await fetch("/api/auth/credentials", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setCurrentEmail(newEmail);
        setNewPassword("");
        setConfirmPassword("");
        setSnackbar({ open: true, message: "Credentials updated successfully!", severity: "success" });
      } else {
        setSnackbar({ open: true, message: data.error || "Failed to update", severity: "error" });
      }
    } catch {
      setSnackbar({ open: true, message: "Failed to update credentials", severity: "error" });
    }
    setSaving(false);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Box sx={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ py: 6 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <SettingsIcon sx={{ color: "#ff6b35", fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Admin Settings
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Current Email
              </Typography>
              <TextField
                fullWidth
                value={currentEmail}
                disabled
                sx={{ mb: 3 }}
              />

              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                New Email
              </Typography>
              <TextField
                fullWidth
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                sx={{ mb: 3 }}
              />

              <Divider sx={{ mb: 3 }} />

              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                New Password (leave blank to keep current)
              </Typography>
              <TextField
                fullWidth
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={saving}
                sx={{
                  bgcolor: "#ff6b35",
                  "&:hover": { bgcolor: "#e85a2a" },
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                {saving ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
      <Footer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
