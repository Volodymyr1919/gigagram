import * as React from "react";
import logo from '../../../../assets/img/logo.png'
import { NavLink } from "react-router-dom";
import headerStyle from '../scss/header.scss'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navigation() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gigagram
          </Typography>
          <Button component={NavLink} to="/signin" color="inherit">Sign In</Button>
          <Button component={NavLink} to="/signup" color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;

