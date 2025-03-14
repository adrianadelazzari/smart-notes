import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      textAlign: "center",
      py: 2,
      mt: "auto",
      bgcolor: "background.default",
      width: "100%",
    }}
  >
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Adriana de Lazzari. All Rights Reserved.
    </Typography>
  </Box>
);

export default Footer;
