"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";

const categories = [
  {
    name: "BERRIES",
    image: "/images/strawberries.jpg",
  },
  {
    name: "TROPICAL",
    image: "/images/mangoes.jpg",
  },
  {
    name: "STONE FRUITS",
    image: "/images/peaches.jpg",
  },
  {
    name: "CITRUS",
    image: "/images/oranges.jpg",
  },
];

export default function Categories() {
  return (
    <Container maxWidth="lg" sx={{ my: 6, py: 2 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 900,
          letterSpacing: "2px",
          mb: 5,
          color: "#111",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        EXPLORE CATEGORIES
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <Box
            key={cat.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              "&:hover .cat-circle": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              },
            }}
          >
            <Box
              className="cat-circle"
              sx={{
                width: { xs: 100, md: 130 },
                height: { xs: 100, md: 130 },
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
                border: "3px solid #f5f5f5",
              }}
            >
              <Box
                component="img"
                src={cat.image}
                alt={cat.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 1.5,
                fontWeight: 700,
                color: "#333",
                letterSpacing: "1.5px",
                fontSize: "11px",
              }}
            >
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
