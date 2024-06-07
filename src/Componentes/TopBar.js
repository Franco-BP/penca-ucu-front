import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import LogoPenca from '../assets/PencaUCU.png';

// Estilos personalizados utilizando styled
const CustomAppBar = styled(AppBar)({
  backgroundColor: '#1E3D75',
});

const Logo = styled('img')({
  marginRight: '16px',
});

const TitleContainer = styled('div')({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'space-around',
});

const MenuItem = styled(Typography)({
  color: '#FFFFFF',
  textTransform: 'uppercase',
  cursor: 'pointer',
});

const CustomAvatar = styled(Avatar)({
  marginLeft: '16px',
});

const TopBar = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Logo src= {LogoPenca} alt="logo" />
        <TitleContainer>
          <MenuItem variant="h6">
            Fixture
          </MenuItem>
          <MenuItem variant="h6">
            Ranking
          </MenuItem>
          <MenuItem variant="h6">
            Estadísticas
          </MenuItem>
          <MenuItem variant="h6">
            Reglas de juego
          </MenuItem>
        </TitleContainer>
        <IconButton edge="end" color="inherit">
          <CustomAvatar alt="User Avatar" src="user-avatar.png" />
        </IconButton>
      </Toolbar>
    </CustomAppBar>
  );
};

export default TopBar;
