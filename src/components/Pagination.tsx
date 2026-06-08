"use client";

import React from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

export default function Pagination() {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "50%",
          width: 36,
          height: 36,
          color: "#666",
          "&:hover": { bgcolor: "#f5f5f5" },
        }}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>
      <IconButton
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "50%",
          width: 36,
          height: 36,
          color: "#666",
          "&:hover": { bgcolor: "#f5f5f5" },
        }}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Box>
  );
}
