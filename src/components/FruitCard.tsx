"use client";

import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useCart } from "@/context/CartContext";

interface FruitCardProps {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  rating?: number;
}

export default function FruitCard({ id, name, price, unit, image, rating = 5 }: FruitCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id, name, price, image, unit });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #f0f0f0",
        boxShadow: "none",
        bgcolor: "#fff",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          transform: "translateY(-2px)",
        },
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <Box sx={{ p: 2, pb: 0 }}>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={name}
          sx={{
            borderRadius: 2,
            bgcolor: "#f8f8f8",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ px: 2, pt: 1.5, pb: "8px !important", flexGrow: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "#333", fontSize: "13px", mb: 0.5 }}
        >
          {name} ({unit})
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{ color: "#ffb300", "& .MuiRating-iconFilled": { color: "#ffb300" } }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "#e65100", fontSize: "1.1rem" }}
        >
          ${price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Add to Cart Button */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAdd}
          sx={{
            bgcolor: added ? "#ef6c00" : "#e65100",
            "&:hover": { bgcolor: "#bf360c" },
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "1px",
            py: 1,
            textTransform: "none",
            transition: "background-color 0.3s",
          }}
        >
          {added ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CheckIcon sx={{ fontSize: 14 }} /> ADDED
            </Box>
          ) : (
            "ADD TO CART"
          )}
        </Button>
      </Box>
    </Card>
  );
}
