'use client';
import React from 'react'
import Navbar from '../Navbar/Navbar';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';


function LayOutAppBar() {
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));
  return (
    <AppBar position="fixed" >
    <Navbar />
    
  </AppBar>
  )
}

export default LayOutAppBar