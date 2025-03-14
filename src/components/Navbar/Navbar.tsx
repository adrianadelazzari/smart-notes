import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useThemeProvider } from "../../theme/ThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar = () => {
  const { theme, toggleDarkMode } = useThemeProvider();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Smart Notes</Typography>
        <Tooltip
          title={
            theme.palette.mode === "dark"
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
        >
          <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 2 }}>
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
