import * as React         from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem, } from "@mui/material/";
import MenuIcon           from "@mui/icons-material/Menu";
import AdbIcon            from "@mui/icons-material/Adb";
import headerStyle        from "./headermain.scss";
import LogoutIcon         from '@mui/icons-material/Logout';
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import DeleteAcc          from "./modal/DeleteAcc";
import logoH              from "../../assets/img/logoWhite.png";
import { NavLink }        from "react-router-dom";
import { useNavigate }    from "react-router-dom";
import { observer }       from "mobx-react";
import { useStores }      from "../../stores/MainStore";
import SearchModal        from "./modal/SearchModal";
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ModalWindow from "./modal/ModalWindow";

const PrivateHeader = observer(() => {

  const { RequestsStore, ConfigStore } = useStores();

  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
    .then(() => {
      return RequestsStore.doGet(ConfigStore.url + "/me");
    })
    .then((me) => {
      if (me === "Forbidden") {
        ConfigStore.setErr("Token has been burned");
        ConfigStore.setIsShow(true);
      } else {
       ConfigStore.setMe(me);
      }
    })
  }, [])

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const logout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("token");
    navigate("/signin");
  };

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
            onClick={() => navigate("/feed")}
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
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
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

          

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <button onClick={() => ConfigStore.setIsShowSearchModal(true)} className="search__button" >
              <SearchIcon className="search__icon"/>
            </button>
            <button onClick={() => ConfigStore.setIsShowModalWindow(true)} className="plus__button" >
              <PostAddIcon className="plus__icon"/>
            </button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                      alt=""
                      src={ConfigStore.me.avatar}
                      style={{ background: "#D9D9D9" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                <MenuItem
                    component={NavLink}
                    to="/my-page"
                    onClick={handleCloseUserMenu}
                >
                    <Typography textAlign="center">Account <span style={{    marginLeft: "10px"}}><AccountCircleIcon /></span></Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout <span style={{marginLeft: "21px"}}><LogoutIcon/></span> </Typography>
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center" style={{color: "red"}}><DeleteAcc sx={{ m: 2 }} /></Typography>
                </MenuItem>
              </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ModalWindow />
      <SearchModal />
    </AppBar>
  );
})
export default PrivateHeader;