"use client";

import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "../Theme/theme";
import NextLink from "./NextLink";


export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggleColorMode } = useColorMode();


  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DOiT MVP
          </Typography>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          <ListItem component={NextLink} href="/">
            <ListItemText primary="Головна" />
          </ListItem>
          <ListItem component={NextLink} href="/posts">
            <ListItemText primary="Усі пости" />
          </ListItem>
          <ListItem component={NextLink} href="/create">
            <ListItemText primary="Створити пост" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Box>
  );
};
