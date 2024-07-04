import React, { useState, useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoPenca from '../assets/PencaUCU.png';
import ImagenAvatar from '../assets/78000335.png';
import { Button } from '@mui/material';
import { PencaUCUContext, accionUserLogout } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const CustomAppBar = styled(AppBar)({
  marginTop: '40px',
  marginBottom: '35px',
  backgroundColor: '#1C285E',
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

const CustomAvatar = styled(Avatar)({
  marginLeft: '16px',
  backgroundColor: '#FFFFFF',
});

const TopBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElHamburger, setAnchorElHamburger] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenHamburgerMenu = (event) => {
    setAnchorElHamburger(event.currentTarget);
  };

  const handleCloseHamburgerMenu = () => {
    setAnchorElHamburger(null);
  };

  const { data, dispatch } = useContext(PencaUCUContext);
  const usuario = data.usuarioData;

  const [navItems, setNavItems] = useState(['Resultados', 'Reglas de juego']);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavItemClick = (item) => {
    const path = `/${item.toLowerCase().replace(/ /g, '')}`;
    navigate(path);
  };

  useEffect(() => {
    if (usuario?.esAdministrador) {
      setNavItems([...navItems, 'Administrar']);
    } else {
      setNavItems(navItems.filter(item => item !== 'Administrar'));
    }
  }, [usuario]);

  const logout = () => {
    dispatch(accionUserLogout()); // Cambia el estado de usuario a null
    handleCloseUserMenu();
    navigate('/home');
  };

  return (
    <CustomAppBar position="static" className="CustomAppBar">
      <Toolbar>
        <LogoButton component="a" onClick={() => navigate('/')}>
          <LogoImage src={LogoPenca} alt="logo" />
        </LogoButton>
        {!isMobile && (
          <div style={{ flexGrow: 1, display: 'flex' }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: '#fff', fontFamily: 'monospace' }}
                onClick={() => handleNavItemClick(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        )}
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpenHamburgerMenu}>
            <MenuIcon />
          </IconButton>
        )}

        {usuario === undefined || usuario === null ? (
          <>
            <Button color="inherit" onClick={() => navigate('/iniciar')}>Iniciar Sesión</Button>
            <Button color="inherit" onClick={() => navigate('/registrarse')}>Registrarse</Button>
          </>
        ) : (
          <IconButton edge="end" color="inherit" onClick={handleOpenUserMenu} sx={{ marginLeft: 'auto' }}>
            <CustomAvatar alt="User Avatar" src={ImagenAvatar} />
          </IconButton>
        )}

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
          <MenuItem onClick={() => navigate("/perfil")} component="a">
            Perfil
          </MenuItem>
          <MenuItem onClick={logout}>
            Cerrar sesión
          </MenuItem>
        </Menu>
        <Menu
          id="menu-hamburger"
          anchorEl={anchorElHamburger}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElHamburger)}
          onClose={handleCloseHamburgerMenu}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item}
              onClick={() => {
                handleCloseHamburgerMenu();
                handleNavItemClick(item);
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </CustomAppBar>
  );
};

export default TopBar;
