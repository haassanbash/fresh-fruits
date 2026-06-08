"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "400px", md: "520px" },
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="/images/hero.jpg"
        alt="Fresh fruits showcase"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark Overlay for text readability */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 4, md: 10 },
          maxWidth: "650px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.1,
            mb: 2,
            fontSize: { xs: "2rem", md: "3.2rem" },
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          FRESHLY PICKED,
          <br />
          DELIVERED DAILY.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.9)",
            mb: 4,
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            maxWidth: "480px",
            textShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          Discover the season&apos;s best organic and locally sourced fruits, straight to your doorstep.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#2e7d32",
              "&:hover": { bgcolor: "#1b5e20" },
              borderRadius: 8,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "1px",
              textTransform: "none",
            }}
          >
            SHOP NOW
          </Button>
          <Button
            variant="outlined"
            onClick={() => document.getElementById("seasons-best")?.scrollIntoView({ behavior: "smooth" })}
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.7)",
              "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
              borderRadius: 8,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "1px",
              textTransform: "none",
            }}
          >
            VIEW SEASONS BEST
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
