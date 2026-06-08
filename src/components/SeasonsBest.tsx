"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { seasonalProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";

const seasons = [
  { label: "SUMMER", color: "#ff7043" },
  { label: "AUTUMN", color: "#ffa726" },
  { label: "WINTER", color: "#42a5f5" },
  { label: "SPRING", color: "#66bb6a" },
];

export default function SeasonsBest() {
  const [active, setActive] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % seasons.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = seasons[active];
  const product = seasonalProducts[active % seasonalProducts.length];

  return (
    <Box id="seasons-best" sx={{ bgcolor: "#f9faf9", py: 8, overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 900, letterSpacing: "2px", color: "#111", mb: 1, fontSize: { xs: "1.2rem", md: "1.5rem" } }}
        >
          SEASON&apos;S BEST
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: "#888", mb: 5, fontSize: "14px" }}>
          Handpicked selections that change with the seasons
        </Typography>

        {/* Season Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 5 }}>
          {seasons.map((s, i) => (
            <Button
              key={s.label}
              onClick={() => setActive(i)}
              variant={i === active ? "contained" : "outlined"}
              sx={{
                borderRadius: 8,
                px: 3,
                py: 0.8,
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "1.5px",
                textTransform: "none",
                minWidth: 100,
                bgcolor: i === active ? s.color : "transparent",
                color: i === active ? "#fff" : s.color,
                borderColor: s.color,
                "&:hover": { bgcolor: i === active ? s.color : `${s.color}15`, borderColor: s.color },
              }}
            >
              {s.label}
            </Button>
          ))}
        </Box>

        {/* Slider Content */}
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, md: 6 },
              flexDirection: { xs: "column", md: "row" },
              transition: "all 0.5s ease",
            }}
          >
            {/* Product Image */}
            <Box sx={{ flex: 1, position: "relative" }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  maxWidth: 420,
                  height: 320,
                  objectFit: "cover",
                  borderRadius: 4,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                  mx: "auto",
                  display: "block",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: current.color,
                  color: "#fff",
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                {current.label} PICK
              </Box>
            </Box>

            {/* Product Info */}
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="overline" sx={{ color: current.color, fontWeight: 700, letterSpacing: "2px", fontSize: "12px" }}>
                {current.label} SEASON SPECIAL
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#111", mt: 1, mb: 1, fontSize: { xs: "1.5rem", md: "2rem" } }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#666", mb: 2, fontSize: "15px" }}>
                Freshly harvested {product.name.toLowerCase()} from {product.origin}. Perfect for smoothies, desserts, or eating fresh. Limited seasonal availability.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3, justifyContent: { xs: "center", md: "flex-start" } }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#2e7d32" }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#bbb", textDecoration: "line-through" }}>
                  /{product.unit}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, unit: product.unit })}
                sx={{
                  bgcolor: current.color,
                  "&:hover": { bgcolor: `${current.color}dd` },
                  borderRadius: 8,
                  px: 5,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textTransform: "none",
                }}
              >
                ADD TO CART
              </Button>
            </Box>
          </Box>

          {/* Nav Arrows */}
          <IconButton
            onClick={() => setActive((p) => (p - 1 + seasons.length) % seasons.length)}
            sx={{
              position: "absolute",
              left: { md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "#f5f5f5" },
              width: 44,
              height: 44,
              display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16, color: "#333" }} />
          </IconButton>
          <IconButton
            onClick={() => setActive((p) => (p + 1) % seasons.length)}
            sx={{
              position: "absolute",
              right: { md: -20 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "#f5f5f5" },
              width: 44,
              height: 44,
              display: { xs: "none", md: "flex" },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16, color: "#333" }} />
          </IconButton>
        </Box>

        {/* Dots */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 4 }}>
          {seasons.map((_, i) => (
            <Box
              key={i}
              onClick={() => setActive(i)}
              sx={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === active ? current.color : "#ddd",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
