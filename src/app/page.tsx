"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FruitCard from "@/components/FruitCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Pagination from "@/components/Pagination";
import SeasonsBest from "@/components/SeasonsBest";
import { Box, Typography, Container, Chip } from "@mui/material";
import type { Filters } from "@/components/FilterSidebar";
import { allProducts } from "@/data/products";

const defaultFilters: Filters = {
  category: "All",
  type: "All",
  origin: "All",
  priceRange: [0, 30],
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Search filter
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Category filter
      if (filters.category !== "All" && p.category !== filters.category) {
        return false;
      }
      // Type filter
      if (filters.type !== "All" && p.type !== filters.type) {
        return false;
      }
      // Origin filter
      if (filters.origin !== "All" && p.origin !== filters.origin) {
        return false;
      }
      // Price range filter
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
        return false;
      }
      return true;
    });
  }, [searchQuery, filters]);

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.type !== "All" ||
    filters.origin !== "All" ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 30 ||
    searchQuery !== "";

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar onSearch={setSearchQuery} />
      <Hero />
      <Categories />
      <SeasonsBest />

      {/* Shop Fresh Fruits Section with Sidebar */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Section Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              letterSpacing: "2px",
              color: "#111",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            SHOP FRESH FRUITS
          </Typography>
          <Pagination />
        </Box>

        {/* Active filter tags + results count */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, flexWrap: "wrap" }}>
          <Typography variant="body2" sx={{ color: "#999", fontSize: "13px" }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </Typography>
          {hasActiveFilters && (
            <Chip
              label="Clear All"
              size="small"
              onClick={() => { setFilters(defaultFilters); setSearchQuery(""); }}
              sx={{ fontSize: "11px", bgcolor: "#ffebee", color: "#c62828", cursor: "pointer" }}
            />
          )}
          {searchQuery && (
            <Chip
              label={`Search: "${searchQuery}"`}
              size="small"
              onDelete={() => setSearchQuery("")}
              sx={{ fontSize: "11px", bgcolor: "#e8f5e9", color: "#2e7d32" }}
            />
          )}
        </Box>

        {/* Sidebar + Products Layout */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Left Sidebar Filters - hidden on mobile */}
          <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 220 }}>
            <FilterSidebar filters={filters} onChange={setFilters} />
          </Box>

          {/* Product Grid */}
          <Box sx={{ flex: 1 }}>
            {filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" sx={{ color: "#999", fontWeight: 600, mb: 1 }}>
                  No fruits found
                </Typography>
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  Try adjusting your search or filters
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 3,
                }}
              >
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
