"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar, Toolbar, Typography, Box, IconButton, Badge, InputBase, ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "BOXES", href: "/boxes" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "#" },
  { label: "CONTACT", href: "/contact" },
];

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #f0f0f0",
        px: { xs: 2, md: 6 },
        py: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", display: "flex", minHeight: "70px !important" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", flexGrow: { xs: 1, md: 0 } }}>
          <span style={{ fontSize: "28px", lineHeight: 1 }}>🌿</span>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#1b5e20",
              letterSpacing: "0.5px",
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            The Daily Harvest
          </Typography>
        </Box>

        {/* Center Nav Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                href={link.href}
                key={link.label}
                style={{
                  color: isActive ? "#2e7d32" : "#555",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid #2e7d32" : "none",
                  paddingBottom: "2px",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </Box>

        {/* Action Icons */}
        <Box sx={{ display: "flex", gap: 0.5, color: "#333", alignItems: "center" }}>
          {/* Search */}
          <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
            <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
              {searchOpen && (
                <Box
                  component="form"
                  onSubmit={handleSearchSubmit}
                  sx={{
                    position: "absolute",
                    right: 36,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    px: 1.5,
                    py: 0.5,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <InputBase
                    autoFocus
                    placeholder="Search fruits..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ fontSize: "13px", minWidth: 180, "& input": { py: 0.5 } }}
                  />
                  {searchQuery && (
                    <IconButton
                      size="small"
                      onClick={() => { setSearchQuery(""); onSearch?.(""); }}
                      sx={{ p: 0.25 }}
                    >
                      <Box component="span" sx={{ fontSize: "14px", color: "#999" }}>✕</Box>
                    </IconButton>
                  )}
                </Box>
              )}
              <IconButton sx={{ color: "#555" }} onClick={() => setSearchOpen(!searchOpen)}>
                <SearchIcon sx={{ fontSize: 22 }} />
              </IconButton>
            </Box>
          </ClickAwayListener>

          <IconButton sx={{ color: "#555" }}>
            <PersonOutlined sx={{ fontSize: 22 }} />
          </IconButton>
          <IconButton sx={{ color: "#555" }} onClick={() => setIsCartOpen(true)}>
            <Badge
              badgeContent={totalItems}
              color="success"
              sx={{ "& .MuiBadge-badge": { fontSize: "10px", height: "18px", minWidth: "18px" } }}
            >
              <ShoppingCartOutlined sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
