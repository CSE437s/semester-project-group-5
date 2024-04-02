import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

import {
  AppBar,
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
  const [calcMenuAnchor, setCalcMenuAnchor] = useState(null); // New state for Calculators dropdown
  const location = useLocation();
  // Check if there are child routes under the current location
  const hasChildRoutes = location.pathname !== "/";

  const onOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const onCloseMenu = () => setMenuAnchor(null);

  const onOpenCalcMenu = (event) => {
    setCalcMenuAnchor(event.currentTarget);
  };
  const onCloseCalcMenu = () => setCalcMenuAnchor(null);

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
              {/* UPDATE NAVBAR HERE */}
              <NavLink to="/home/about">About</NavLink>
              <NavLink to="/home/quiz">Phenotype Test</NavLink>
              <NavLink to="/home/phenotype">Results</NavLink>
              <Button color="inherit" onClick={onOpenCalcMenu} endIcon={<ArrowDropDownIcon />}>
                Calculators
              </Button>
              {/* Calculators Dropdown Menu */}
              <Menu
                anchorEl={calcMenuAnchor}
                open={Boolean(calcMenuAnchor)}
                onClose={onCloseCalcMenu}
              >
                <MenuItem onClick={onCloseCalcMenu} component={Link} to="/home/nowvslater">
                  Savings Calculator
                </MenuItem>
                <MenuItem onClick={onCloseCalcMenu} component={Link} to="/home/rentvsbuy">
                  Rent vs Buy
                </MenuItem>
                {/* Add more links as needed */}
              </Menu>
              {/* End of Calculators Dropdown */}{" "}
            </Stack>
            <IconButton
              onClick={onOpenMenu}
              sx={{
                display: { md: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* ALSO UPDATE NAVBAR HERE */}
            <Menu anchorEl={menuAnchor} open={menuAnchor !== null} onClose={onCloseMenu}>
              <MenuLinkItem to="/home/about" label="About" onClick={onCloseMenu} />
              <MenuLinkItem to="/home/quiz" label="Phenotype Test" onClick={onCloseMenu} />
              <MenuLinkItem to="/home/phenotype" label="Your Results" onClick={onCloseMenu} />
            </Menu>
          </Box>

          {/** Center the logo horizontally in the toolbar */}
          <Link
            to="/home/about"
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
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("error mf", error);
    }
  }

  return (
    <Tooltip title="Logout">
      <IconButton onClick={logout}>
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

export default LayoutNav;
