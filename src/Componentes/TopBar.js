import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import LogoPenca from '../assets/PencaUCU.png';
import ImagenAvatar from '../assets/78000335.png'


const CustomAppBar = styled(AppBar)({
  marginTop: '40px',
  backgroundColor: '#1E3D75',
});

const LogoButton = styled(IconButton)({
  position: 'relative',
  top: '100px',
  marginRight: '16px',
  padding: 0,
});

const LogoImage = styled('img')({
  height: '120px',
  width: '160px',
  marginTop: '-200px',
});

const TitleContainer = styled('div')({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'space-around',
});

const CustomAvatar = styled(Avatar)({
  marginLeft: '16px',
  backgroundColor: '#FFFFFF',
});

const TopBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <CustomAppBar position="static" className="CustomAppBar">
      <Toolbar>
        <LogoButton component="a" href="/">
          <LogoImage src={LogoPenca} alt="logo" />
        </LogoButton>
        <TitleContainer>
          <MenuItem component="a" href="/fixture" sx={{ width: '150px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Fixture
          </MenuItem>
          <MenuItem component="a" href="/ranking" sx={{ width: '150px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Ranking
          </MenuItem>
          <MenuItem component="a" href="/estadisticas" sx={{ width: '150px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Estadísticas
          </MenuItem>
          <MenuItem component="a" href="/reglas" sx={{ width: '150px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            Reglas de juego
          </MenuItem>
        </TitleContainer>
        <IconButton edge="end" color="inherit" onClick={handleOpenUserMenu}>
          <CustomAvatar alt="User Avatar" src={ImagenAvatar} />
        </IconButton>
        <Menu
          id="menu-user"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu} component="a" href="/perfil">
            Perfil
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu} component="a" href="/cuenta">
            Cuenta
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu} component="a" href="/cerrarsesion">
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </CustomAppBar>
  );
};

export default TopBar;