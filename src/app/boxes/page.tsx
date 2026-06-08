"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Box, Typography, Container, Button, Card, CardMedia, CardContent, Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { fruitBoxes } from "@/data/products";
import { useCart } from "@/context/CartContext";

const badgeColors: Record<string, string> = { BESTSELLER: "#2e7d32", POPULAR: "#ff7043", NEW: "#42a5f5" };

export default function BoxesPage() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAdd = (box: typeof fruitBoxes[number]) => {
    addToCart({ id: box.id, name: box.name, price: box.price, image: box.image, unit: "Box" });
    setAddedId(box.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <Box sx={{ bgcolor: "#f5f7f5", py: 6, px: 4, textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#111", letterSpacing: "2px", fontSize: { xs: "1.5rem", md: "2rem" } }}>
          CURATED FRUIT BOXES
        </Typography>
        <Typography variant="body1" sx={{ color: "#888", mt: 1, maxWidth: 500, mx: "auto", fontSize: "15px" }}>
          Pre-packed boxes of seasonal favorites, delivered weekly. Save more with every box.
        </Typography>
      </Box>

      {/* How It Works */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 800, color: "#111", mb: 4, letterSpacing: "1px" }}>
          HOW IT WORKS
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 2, md: 6 }, flexWrap: "wrap", mb: 2 }}>
          {[
            { step: "1", title: "Choose a Box", desc: "Pick the box that suits your taste" },
            { step: "2", title: "We Pack Fresh", desc: "Handpicked on delivery day" },
            { step: "3", title: "Enjoy Weekly", desc: "Delivered to your doorstep" },
          ].map((item) => (
            <Box key={item.step} sx={{ textAlign: "center", flex: { xs: "1 1 140px", md: "0 0 180px" } }}>
              <Box
                sx={{
                  width: 50, height: 50, borderRadius: "50%", bgcolor: "#2e7d32", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800,
                  fontSize: "20px", mx: "auto", mb: 1.5,
                }}
              >
                {item.step}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#333" }}>{item.title}</Typography>
              <Typography variant="caption" sx={{ color: "#999", fontSize: "12px" }}>{item.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Boxes Grid */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 4 }}>
          {fruitBoxes.map((box) => (
            <Card key={box.id} sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid #f0f0f0", boxShadow: "none", "&:hover": { boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }, transition: "all 0.3s" }}>
              <Box sx={{ position: "relative" }}>
                <CardMedia component="img" height="200" image={box.image} alt={box.name} sx={{ objectFit: "cover" }} />
                {box.badge && (
                  <Chip
                    label={box.badge}
                    size="small"
                    sx={{
                      position: "absolute", top: 12, left: 12,
                      bgcolor: badgeColors[box.badge] || "#2e7d32",
                      color: "#fff", fontWeight: 800, fontSize: "10px", letterSpacing: "1px",
                    }}
                  />
                )}
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#111", mb: 0.5 }}>{box.name}</Typography>
                <Typography variant="body2" sx={{ color: "#777", mb: 2, fontSize: "13px" }}>{box.description}</Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#999", fontSize: "10px", letterSpacing: "1px", display: "block", mb: 1 }}>
                    INCLUDES
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {box.items.map((item) => (
                      <Chip key={item} label={item} size="small" variant="outlined"
                        sx={{ fontSize: "11px", borderColor: "#e0e0e0", color: "#555" }} />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: "#2e7d32", fontSize: "1.3rem" }}>
                      ${box.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#bbb", textDecoration: "line-through" }}>
                      ${box.originalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => handleAdd(box)}
                    sx={{
                      bgcolor: addedId === box.id ? "#43a047" : "#2e7d32",
                      "&:hover": { bgcolor: "#1b5e20" },
                      borderRadius: 2, fontWeight: 700, fontSize: "12px", letterSpacing: "0.5px",
                      px: 3, py: 1, textTransform: "none", transition: "all 0.3s",
                    }}
                  >
                    {addedId === box.id ? (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <CheckIcon sx={{ fontSize: 14 }} /> ADDED
                      </Box>
                    ) : "ADD TO CART"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <Footer />
      <CartDrawer />
    </div>
  );
}
