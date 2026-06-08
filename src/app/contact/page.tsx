"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box, Typography, Container, TextField, Button, Snackbar } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const contactInfo = [
  { icon: <LocationOnIcon sx={{ fontSize: 20 }} />, title: "Visit Us", lines: ["123 Harvest Lane", "Portland, OR 97201"] },
  { icon: <PhoneIcon sx={{ fontSize: 20 }} />, title: "Call Us", lines: ["(503) 555-0142", "Mon–Fri 9AM–6PM PST"] },
  { icon: <EmailIcon sx={{ fontSize: 20 }} />, title: "Email Us", lines: ["hello@dailyharvest.com", "support@dailyharvest.com"] },
  { icon: <AccessTimeIcon sx={{ fontSize: 20 }} />, title: "Hours", lines: ["Mon–Fri: 9AM – 6PM", "Sat–Sun: 10AM – 4PM"] },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <Box sx={{ bgcolor: "#f5f7f5", py: 6, px: 4, textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#111", letterSpacing: "2px", fontSize: { xs: "1.5rem", md: "2rem" } }}>
          GET IN TOUCH
        </Typography>
        <Typography variant="body1" sx={{ color: "#888", mt: 1, maxWidth: 450, mx: "auto", fontSize: "15px" }}>
          Questions, feedback, or wholesale inquiries — we&apos;d love to hear from you.
        </Typography>
      </Box>

      {/* Contact Info Cards */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 3, mb: 6 }}>
          {contactInfo.map((info) => (
            <Box key={info.title} sx={{ textAlign: "center", p: 3, border: "1px solid #f0f0f0", borderRadius: 3 }}>
              <Box sx={{ color: "#2e7d32", mb: 1.5 }}>{info.icon}</Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#333", mb: 1 }}>{info.title}</Typography>
              {info.lines.map((line) => (
                <Typography key={line} variant="body2" sx={{ color: "#777", fontSize: "13px", lineHeight: 1.6 }}>{line}</Typography>
              ))}
            </Box>
          ))}
        </Box>

        {/* Contact Form */}
        <Container maxWidth="sm">
          <Typography variant="h6" align="center" sx={{ fontWeight: 800, color: "#111", mb: 4, letterSpacing: "1px" }}>
            SEND US A MESSAGE
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                label="Your Name" required fullWidth value={form.name} onChange={update("name")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" }, "& .MuiInputLabel-root": { fontSize: "13px" } }}
              />
              <TextField
                label="Email Address" required type="email" fullWidth value={form.email} onChange={update("email")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" }, "& .MuiInputLabel-root": { fontSize: "13px" } }}
              />
            </Box>
            <TextField
              label="Subject" required fullWidth value={form.subject} onChange={update("subject")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" }, "& .MuiInputLabel-root": { fontSize: "13px" } }}
            />
            <TextField
              label="Your Message" required multiline rows={5} fullWidth value={form.message} onChange={update("message")}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" }, "& .MuiInputLabel-root": { fontSize: "13px" } }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" },
                borderRadius: 2, py: 1.5, fontWeight: 700, fontSize: "14px",
                letterSpacing: "0.5px", textTransform: "none",
              }}
            >
              Send Message
            </Button>
          </Box>
        </Container>
      </Container>

      <Footer />

      <Snackbar
        open={submitted}
        autoHideDuration={4000}
        onClose={() => setSubmitted(false)}
        message="Message sent successfully! We'll get back to you soon."
        sx={{ "& .MuiSnackbarContent-root": { bgcolor: "#2e7d32" } }}
      />
    </div>
  );
}
