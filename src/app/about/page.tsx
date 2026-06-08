"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box, Typography, Container } from "@mui/material";

const values = [
  { icon: "🍋", title: "100% Natural", desc: "Every juice is made from all-natural, pesticide-free produce with zero artificial additives." },
  { icon: "🧊", title: "Cold-Pressed", desc: "Our hydraulic presses extract maximum nutrients and flavor — no heat, no compromise." },
  { icon: "🤝", title: "Fair Trade", desc: "We pay our partner farmers fair prices and invest in sustainable agriculture." },
  { icon: "♻️", title: "Eco Packaging", desc: "All bottles and packaging are fully recyclable — zero waste, zero guilt." },
];

const stats = [
  { number: "500+", label: "Partner Farms" },
  { number: "12K+", label: "Happy Customers" },
  { number: "98%", label: "All Natural" },
  { number: "24hr", label: "Pressed to Door" },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Banner */}
      <Box sx={{ position: "relative", height: { xs: 280, md: 380 }, overflow: "hidden" }}>
        <Box component="img" src="/images/hero.jpg" alt="About us" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 100%)" }} />
        <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", px: { xs: 4, md: 10 } }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: "#fff", fontSize: { xs: "1.8rem", md: "2.8rem" }, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
            OUR STORY
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mt: 1, maxWidth: 500, fontSize: "15px" }}>
            From a small juice bar to your kitchen table — here&apos;s how we got here.
          </Typography>
        </Box>
      </Box>

      {/* Mission */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="overline" sx={{ color: "#e65100", fontWeight: 700, letterSpacing: "3px", fontSize: "12px" }}>OUR MISSION</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111", mt: 1, mb: 3, fontSize: { xs: "1.3rem", md: "1.8rem" } }}>
          Making fresh, natural juices accessible to everyone.
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.8, maxWidth: 700, mx: "auto", fontSize: "15px" }}>
          Juicy Fresh started in 2020 with a simple idea: what if getting farm-fresh juice was as easy as ordering a pizza? We partner directly with over 500 farms across 12 countries, cutting out middlemen to bring you the freshest cold-pressed juices and smoothies at honest prices. Every bottle we deliver supports sustainable farming and helps families drink better.
        </Typography>
      </Container>

      {/* Stats */}
      <Box sx={{ bgcolor: "#e65100", py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 4 }}>
            {stats.map((s) => (
              <Box key={s.label} sx={{ textAlign: "center", minWidth: 120 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, color: "#fff", fontSize: { xs: "1.5rem", md: "2.2rem" } }}>
                  {s.number}
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "1.5px", fontSize: "11px", fontWeight: 600 }}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Values */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 800, color: "#111", mb: 5, letterSpacing: "1px" }}>
          WHAT WE STAND FOR
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 4 }}>
          {values.map((v) => (
            <Box key={v.title} sx={{ textAlign: "center", p: 3 }}>
              <Box sx={{ fontSize: "2.5rem", mb: 2 }}>{v.icon}</Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#333", mb: 1 }}>{v.title}</Typography>
              <Typography variant="body2" sx={{ color: "#777", fontSize: "13px", lineHeight: 1.6 }}>{v.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Footer />
    </div>
  );
}
