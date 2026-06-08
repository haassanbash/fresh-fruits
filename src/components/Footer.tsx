"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ mt: 8 }}>
      {/* Subscribe Banner */}
      <Box
        sx={{
          bgcolor: "#2e7d32",
          py: 4,
          px: 4,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 800,
              letterSpacing: "2px",
              fontSize: { xs: "0.9rem", md: "1.2rem" },
            }}
          >
            SUBSCRIBE &amp; SAVE 15% ON YOUR FIRST ORDER!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.8)",
              mt: 1,
              fontSize: "13px",
            }}
          >
            Get fresh deals delivered to your inbox weekly
          </Typography>
        </Container>
      </Box>

      {/* Bottom Footer */}
      <Box
        sx={{
          bgcolor: "#1a1a1a",
          py: 4,
          px: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span style={{ fontSize: "20px" }}>🌿</span>
              <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700 }}>
                The Daily Harvest
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              {["HOME", "SHOP", "BOXES", "ABOUT", "BLOG", "CONTACT"].map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href="#"
                  variant="caption"
                  sx={{
                    color: "#999",
                    textDecoration: "none",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "#555", display: "block", mt: 3, textAlign: "center", fontSize: "11px" }}
          >
            &copy; 2025 The Daily Harvest. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
