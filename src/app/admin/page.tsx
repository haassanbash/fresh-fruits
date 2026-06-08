"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Box, Typography, Container, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Select,
  MenuItem, FormControl, InputLabel, Snackbar, Alert, Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  rating: number;
  category: string;
  type: string;
  origin: string;
}

const emptyForm: Omit<Product, "id"> = {
  name: "", price: 0, unit: "bottle", image: "", rating: 5,
  category: "", type: "", origin: "",
};

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false, message: "", severity: "success",
  });

  const getToken = () => localStorage.getItem("adminToken") || "";

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      showSnackbar("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setSnackbar({ open: true, message: "Failed to load products", severity: "error" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const openAddDialog = () => {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      rating: product.rating,
      category: product.category,
      type: product.type,
      origin: product.origin,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.name || form.price <= 0) {
      showSnackbar("Name and price are required", "error");
      return;
    }

    try {
      if (editId) {
        const res = await fetch(`/api/products/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        showSnackbar("Product updated successfully", "success");
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        showSnackbar("Product created successfully", "success");
      }
      setDialogOpen(false);
      fetchProducts();
    } catch {
      showSnackbar("Failed to save product", "error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      showSnackbar("Product deleted", "success");
      setDeleteConfirm(null);
      fetchProducts();
    } catch {
      showSnackbar("Failed to delete product", "error");
    }
  };

  const updateField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Typography variant="body1" sx={{ color: "#999" }}>Loading...</Typography>
      </Box>
      <Footer />
    </div>
  );

  if (!isAuthenticated) return null;

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Header */}
      <Box sx={{ bgcolor: "#f5f7f5", py: 5, px: 4, textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#111", letterSpacing: "2px", fontSize: { xs: "1.5rem", md: "2rem" } }}>
          PRODUCT MANAGEMENT
        </Typography>
        <Typography variant="body2" sx={{ color: "#888", mt: 1, fontSize: "14px" }}>
          Add, edit, and delete products from your catalog
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Add button + count */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="body2" sx={{ color: "#999" }}>
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddDialog}
            sx={{ bgcolor: "#e65100", "&:hover": { bgcolor: "#bf360c" }, fontWeight: 700, textTransform: "none" }}
          >
            Add Product
          </Button>
        </Box>

        {/* Products Table */}
        <TableContainer component={Paper} sx={{ border: "1px solid #f0f0f0", borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#fafafa" }}>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>IMAGE</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>NAME</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>CATEGORY</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>PRICE</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>TYPE</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>ORIGIN</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: "12px", letterSpacing: "1px" }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, color: "#999" }}>
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, color: "#999" }}>
                    No products yet. Add your first product!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} sx={{ "&:hover": { bgcolor: "#fafafa" } }}>
                    <TableCell>
                      <Box
                        component="img"
                        src={product.image || "/images/hero.jpg"}
                        alt={product.name}
                        sx={{ width: 50, height: 50, borderRadius: 1.5, objectFit: "cover", bgcolor: "#f5f5f5" }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: "13px" }}>{product.name}</TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" sx={{ fontSize: "11px", bgcolor: "#fff3e0", color: "#e65100" }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#e65100", fontSize: "13px" }}>
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "13px", color: "#555" }}>{product.type}</TableCell>
                    <TableCell sx={{ fontSize: "13px", color: "#555" }}>{product.origin}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => openEditDialog(product)} sx={{ color: "#1565c0", mr: 0.5 }}>
                        <EditIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setDeleteConfirm(product.id)}
                        sx={{ color: "#c62828" }}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#111" }}>
          {editId ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: "8px !important" }}>
          <TextField
            label="Product Name" required fullWidth value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" } }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Price" required type="number" fullWidth value={form.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" } }}
            />
            <TextField
              label="Unit" fullWidth value={form.unit}
              onChange={(e) => updateField("unit", e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" } }}
            />
          </Box>
          <TextField
            label="Image Path" fullWidth value={form.image}
            onChange={(e) => updateField("image", e.target.value)}
            placeholder="/images/my-juice.jpg"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" } }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category} label="Category"
                onChange={(e) => updateField("category", e.target.value)}
                sx={{ borderRadius: 2, fontSize: "14px" }}
              >
                {["Berry Blends", "Tropical", "Green Juices", "Citrus", "Limon", "Stone Fruit", "Special Drinks", "Seasonal"].map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={form.type} label="Type"
                onChange={(e) => updateField("type", e.target.value)}
                sx={{ borderRadius: 2, fontSize: "14px" }}
              >
                {["Cold-Pressed", "Blended", "Hand-Squeezed"].map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Origin" fullWidth value={form.origin}
              onChange={(e) => updateField("origin", e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" } }}
            />
            <TextField
              label="Rating" type="number" fullWidth value={form.rating}
              onChange={(e) => updateField("rating", Number(e.target.value))}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "14px" } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: "#999", textTransform: "none" }}>Cancel</Button>
          <Button
            variant="contained" onClick={handleSubmit}
            sx={{ bgcolor: "#e65100", "&:hover": { bgcolor: "#bf360c" }, fontWeight: 700, textTransform: "none" }}
          >
            {editId ? "Update Product" : "Create Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Delete Product?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#666" }}>
            This action cannot be undone. The product will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ color: "#999", textTransform: "none" }}>Cancel</Button>
          <Button
            variant="contained" color="error"
            onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)}
            sx={{ fontWeight: 700, textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
