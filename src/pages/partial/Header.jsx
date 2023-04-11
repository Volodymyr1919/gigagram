import * as React          from "react";
import AppBar              from "@mui/material/AppBar";
import Box                 from "@mui/material/Box";
import Toolbar             from "@mui/material/Toolbar";
import IconButton          from "@mui/material/IconButton";
import Typography          from "@mui/material/Typography";
import Menu                from "@mui/material/Menu";
import MenuIcon            from "@mui/icons-material/Menu";
import Container           from "@mui/material/Container";
import Button              from "@mui/material/Button";
import MenuItem            from "@mui/material/MenuItem";
import AdbIcon             from "@mui/icons-material/Adb";
import headerStyle         from "./headermain.scss";
import logoH               from "../../assets/img/logoWhite.png";
import { NavLink }         from "react-router-dom";
import { useNavigate }     from "react-router-dom";

function HeaderMain() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar
      className="header"
      position="static"
      sx={{ backgroundColor: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <figure
            className="header__logo"
            onClick={() => navigate("/")}
          >
            <img src={logoH} alt="" />
          </figure>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"></Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 0 }} className="box">
            <Button component={NavLink} to="/signin" color="inherit" style={{background: "#F47A1D"}}>Sign In</Button>
            <Button component={NavLink} to="/signup" color="inherit" style={{background: "#F47A1D"}}>Sign Up</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderMain;
