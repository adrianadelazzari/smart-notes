import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Notes from "./components/Notes/Notes";
import { Box } from "@mui/material";

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <Container sx={{ flexGrow: 1, mt: 4 }}>
            {" "}
            <Routes>
              <Route path="/" element={<Notes />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}
