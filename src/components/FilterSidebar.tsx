"use client";

import React from "react";
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Select, MenuItem, Slider, Chip } from "@mui/material";

export interface Filters {
  category: string;
  type: string;
  origin: string;
  priceRange: number[];
}

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const categoryOptions = ["All", "Berry Blends", "Tropical", "Green Juices", "Citrus"];
const typeOptions = ["All", "Cold-Pressed", "Blended", "Hand-Squeezed"];
const originOptions = ["All", "Brazil", "Trence", "Germany", "Organic"];

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

  return (
    <Box sx={{ width: "100%", maxWidth: 220, pr: 3, borderRight: "1px solid #f0f0f0" }}>
      {/* Category Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111", mb: 1.5, fontSize: "14px", letterSpacing: "0.5px" }}>
          Category
        </Typography>
        <RadioGroup value={filters.category} onChange={(e) => update({ category: e.target.value })}>
          {categoryOptions.map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={<Radio size="small" sx={{ color: "#ccc", "&.Mui-checked": { color: "#e65100" }, p: 0.8 }} />}
              label={<Typography variant="body2" sx={{ color: "#555", fontSize: "13px" }}>{opt}</Typography>}
              sx={{ mb: 0.3, ml: 0 }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Type Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111", mb: 1.5, fontSize: "14px", letterSpacing: "0.5px" }}>
          Type
        </Typography>
        <RadioGroup value={filters.type} onChange={(e) => update({ type: e.target.value })}>
          {typeOptions.map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={<Radio size="small" sx={{ color: "#ccc", "&.Mui-checked": { color: "#e65100" }, p: 0.8 }} />}
              label={<Typography variant="body2" sx={{ color: "#555", fontSize: "13px" }}>{opt}</Typography>}
              sx={{ mb: 0.3, ml: 0 }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Origin Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111", mb: 1.5, fontSize: "14px", letterSpacing: "0.5px" }}>
          Origin
        </Typography>
        <Select
          value={filters.origin}
          onChange={(e) => update({ origin: e.target.value })}
          size="small"
          fullWidth
          sx={{
            fontSize: "13px",
            color: "#555",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
          }}
        >
          {originOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </Box>

      {/* Price Range Slider */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111", mb: 2, fontSize: "14px", letterSpacing: "0.5px" }}>
          Price
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={(_, val) => update({ priceRange: val as number[] })}
          valueLabelDisplay="auto"
          min={0}
          max={30}
          step={0.5}
          valueLabelFormat={(v) => `$${v}`}
          sx={{
            color: "#e65100",
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              bgcolor: "#e65100",
              "&:hover": { boxShadow: "0 0 0 8px rgba(230,81,0,0.15)" },
            },
            "& .MuiSlider-track": { height: 4 },
            "& .MuiSlider-rail": { height: 4, color: "#e0e0e0" },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="caption" sx={{ color: "#999", fontSize: "11px" }}>
            ${filters.priceRange[0].toFixed(0)}
          </Typography>
          <Typography variant="caption" sx={{ color: "#999", fontSize: "11px" }}>
            ${filters.priceRange[1].toFixed(0)}
          </Typography>
        </Box>
      </Box>

      {/* Active Filters */}
      {(filters.category !== "All" || filters.type !== "All" || filters.origin !== "All") && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "#999", fontSize: "10px", letterSpacing: "1px", mb: 1, display: "block" }}>
            ACTIVE FILTERS
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {filters.category !== "All" && (
              <Chip label={filters.category} size="small" onDelete={() => update({ category: "All" })} sx={{ fontSize: "11px", bgcolor: "#fff3e0", color: "#e65100" }} />
            )}
            {filters.type !== "All" && (
              <Chip label={filters.type} size="small" onDelete={() => update({ type: "All" })} sx={{ fontSize: "11px", bgcolor: "#fff3e0", color: "#e65100" }} />
            )}
            {filters.origin !== "All" && (
              <Chip label={filters.origin} size="small" onDelete={() => update({ origin: "All" })} sx={{ fontSize: "11px", bgcolor: "#fff3e0", color: "#e65100" }} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
