"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import FruitCard from "@/components/FruitCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Pagination from "@/components/Pagination";
import { Box, Typography, Container, Chip, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { Filters } from "@/components/FilterSidebar";
import { allProducts } from "@/data/products";

const defaultFilters: Filters = { category: "All", type: "All", origin: "All", priceRange: [0, 30] };

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.category !== "All" && p.category !== filters.category) return false;
      if (filters.type !== "All" && p.type !== filters.type) return false;
      if (filters.origin !== "All" && p.origin !== filters.origin) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      return true;
    });
  }, [searchQuery, filters]);

  const hasActiveFilters =
    filters.category !== "All" || filters.type !== "All" || filters.origin !== "All" ||
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== 30 || searchQuery !== "";

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar />

      {/* Page Header */}
      <Box sx={{ bgcolor: "#f5f7f5", py: 5, px: 4, textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#111", letterSpacing: "2px", fontSize: { xs: "1.5rem", md: "2rem" } }}>
          SHOP ALL FRUITS
        </Typography>
        <Typography variant="body2" sx={{ color: "#888", mt: 1, fontSize: "14px" }}>
          Browse our complete selection of fresh, organic fruits
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            maxWidth: 450, mx: "auto", mt: 3, display: "flex", alignItems: "center", gap: 1,
            bgcolor: "#fff", border: "1px solid #e0e0e0", borderRadius: 3, px: 2, py: 1,
          }}
        >
          <SearchIcon sx={{ color: "#999", fontSize: 20 }} />
          <InputBase
            placeholder="Search fruits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, fontSize: "14px" }}
          />
          {searchQuery && (
            <Chip label="✕" size="small" onClick={() => setSearchQuery("")} sx={{ fontSize: "10px", minWidth: 24, height: 20, cursor: "pointer" }} />
          )}
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Results Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, flexWrap: "wrap" }}>
          <Typography variant="body2" sx={{ color: "#999", fontSize: "13px" }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </Typography>
          {hasActiveFilters && (
            <Chip label="Clear All" size="small" onClick={() => { setFilters(defaultFilters); setSearchQuery(""); }}
              sx={{ fontSize: "11px", bgcolor: "#ffebee", color: "#c62828", cursor: "pointer" }} />
          )}
          {searchQuery && (
            <Chip label={`Search: "${searchQuery}"`} size="small" onDelete={() => setSearchQuery("")}
              sx={{ fontSize: "11px", bgcolor: "#e8f5e9", color: "#2e7d32" }} />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Pagination />
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 220 }}>
            <FilterSidebar filters={filters} onChange={setFilters} />
          </Box>
          <Box sx={{ flex: 1 }}>
            {filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" sx={{ color: "#999", fontWeight: 600, mb: 1 }}>No fruits found</Typography>
                <Typography variant="body2" sx={{ color: "#bbb" }}>Try adjusting your search or filters</Typography>
              </Box>
            ) : (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: 3 }}>
                {filteredProducts.map((product) => (
                  <FruitCard key={product.id} {...product} />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <Footer />
      <CartDrawer />
    </div>
  );
}
