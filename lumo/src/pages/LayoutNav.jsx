import {
  Info as InfoIcon,
  InfoOutlined as InfoOutlinedIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Store as StoreIcon,
  StoreOutlined as StoreOutlinedIcon,
  SupportAgent as SupportAgentIcon,
  SupportAgentOutlined as SupportAgentOutlinedIcon,
} from "@mui/icons-material";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import Logo from "../components/Logo";
import { useSession } from "../services/api";
import { supabase } from "../supabase";

export function LayoutNav() {
  const session = useSession();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const onOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const onCloseMenu = () => setMenuAnchor(null);

  return (
    <>
      <AppBar component="header">
        <Toolbar>
          <Box width="100%">
            <Stack
              component="nav"
              direction="row"
              spacing={0.5}
              display={{
                xs: "none",
                md: "flex",
              }}
            >
              <NavLink to="/about">About</NavLink>
            </Stack>

            <IconButton
              onClick={onOpenMenu}
              sx={{
                display: { md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu anchorEl={menuAnchor} open={menuAnchor !== null} onClose={onCloseMenu}>
              <MenuLinkItem
                to="/about"
                label="About"
                Icon={<StoreOutlinedIcon />}
                SelectedIcon={<StoreIcon />}
                onClick={onCloseMenu}
              />
            </Menu>
          </Box>

          {/** Center the logo horizontally in the toolbar */}
          <Link
            to="/"
            style={{
              position: "absolute",
              left: "50%",
              translate: "-50%",
            }}
          >
            <Logo scale={0.1} />
          </Link>

          {session && (
            <Stack direction="row" spacing={0.5}>
              <LogoutButton />
            </Stack>
          )}
          {session === null && <LoginButton />}
        </Toolbar>
      </AppBar>

      <Toolbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

function NavLink(props) {
  const { pathname } = useLocation();
  const { to, children } = props;
  const isSelected = to === pathname;
  return (
    <Button component={Link} to={to} variant="text" color={isSelected ? "primary" : "inherit"}>
      {children}
    </Button>
  );
}

function LoginButton() {
  return (
    <Tooltip title="Login">
      <IconButton component={Link} to="/login">
        <LoginIcon />
      </IconButton>
    </Tooltip>
  );
}

function LogoutButton() {
  const { mutate: logout, isLoading } = useMutation(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  });

  return (
    <Tooltip title="Logout">
      <IconButton onClick={() => logout()} disabled={isLoading}>
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
}

function MenuLinkItem(props) {
  const { to, label, Icon, SelectedIcon, onClick } = props;
  const { pathname } = useLocation();
  const isSelected = to === pathname;
  return (
    <MenuItem
      component={Link}
      to={to}
      selected={isSelected}
      onClick={onClick}
      sx={{ width: 200, height: 50 }}
    >
      <ListItemIcon>{isSelected ? SelectedIcon : Icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}
