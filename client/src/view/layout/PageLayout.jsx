import { Box } from "@mui/material";

function PageLayout({ children }) {
  return (
    <Box sx={{ padding: 3 }}>
      {children}
    </Box>
  );
}

export default PageLayout;
