"use client";

import React from "react";
import {
  Drawer, Box, Typography, IconButton, Button, Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, addToCart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}>
      <Box sx={{ width: 380, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, py: 2, borderBottom: "1px solid #f0f0f0" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#111" }}>
            Your Cart ({totalItems})
          </Typography>
          <IconButton onClick={() => setIsCartOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: "auto", px: 3, py: 2 }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="body1" sx={{ color: "#999" }}>
                Your cart is empty
              </Typography>
              <Button
                onClick={() => setIsCartOpen(false)}
                sx={{ mt: 2, color: "#e65100", fontWeight: 700, textTransform: "none" }}
              >
                Continue Shopping
              </Button>
            </Box>
          ) : (
            items.map((item) => (
              <Box key={item.id} sx={{ display: "flex", gap: 2, mb: 2, pb: 2, borderBottom: "1px solid #f5f5f5" }}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 70, height: 70, borderRadius: 2, objectFit: "cover", bgcolor: "#f8f8f8" }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: "13px", color: "#333" }}>
                    {item.name} ({item.unit})
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#e65100", mt: 0.3 }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(item.id)}
                      sx={{ width: 26, height: 26, border: "1px solid #e0e0e0" }}
                    >
                      <RemoveIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, unit: item.unit })}
                      sx={{ width: 26, height: 26, border: "1px solid #e0e0e0" }}
                    >
                      <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => { for (let i = 0; i < item.quantity; i++) removeFromCart(item.id); }}
                      sx={{ ml: "auto", color: "#999", width: 26, height: 26 }}
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Footer */}
        {items.length > 0 && (
          <Box sx={{ px: 3, py: 3, borderTop: "1px solid #f0f0f0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#e65100" }}>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#e65100", "&:hover": { bgcolor: "#bf360c" }, borderRadius: 2, py: 1.5, fontWeight: 700, textTransform: "none", fontSize: "14px" }}
            >
              Checkout
            </Button>
            <Button
              fullWidth
              onClick={clearCart}
              sx={{ mt: 1, color: "#999", fontWeight: 600, textTransform: "none", fontSize: "13px" }}
            >
              Clear Cart
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
