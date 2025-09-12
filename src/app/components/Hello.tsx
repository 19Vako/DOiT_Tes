import { Typography, Button, Stack, Box } from "@mui/material";
import Link from "next/link";

export const Hello = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      minHeight: "70vh",
      gap: 2,
    }}
  >
    <Typography variant="h2">Ласкаво просимо!</Typography>
  
    <Stack direction="row" spacing={2} mt={4}>
      <Button variant="contained" component={Link} href="/posts">
        Переглянути пости
      </Button>
      <Button variant="outlined" component={Link} href="/create">
        Додати пост
      </Button>
    </Stack>
  </Box>
);
