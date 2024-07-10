import { Box, Paper } from "@mui/material";

function FormLayout({ children, width }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        margin: 2,
        padding: 2,
      }}
    >
      <Paper elevation={2} square={false} sx={{ padding: 4, minWidth: 250, width: {width} }}>
        {children}
      </Paper>
    </Box>
  );
}

export default FormLayout;
