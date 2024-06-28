import React, { useContext } from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';
import FormatDate from '../utils/FormatDate';
import { useNavigate } from 'react-router-dom';
import { PencaUCUContext } from '../context/Context';


const MatchCard = ({ partido }) => {
  const { data } = useContext(PencaUCUContext);
  const navigate = useNavigate();
  if (!partido || !partido.equipos || partido.equipos.length < 2) return null; // si no hay partidos no los muestra

  const handleIngresarClick = () => {
    if (data.usuarioData === null) {
      return alert("Debe loguearse para poder ingresar a la penca");
    }
    else {
      navigate('/prediccion');
    }
  }

  const team1 = partido.equipos[0].equipo;

  const team2 = partido.equipos[1].equipo;

  const team1Flag = require(`../assets/banderas/${team1.imgBandera}`);
  const team2Flag = require(`../assets/banderas/${team2.imgBandera}`);


  return (
    <Card sx={{
      display: 'flex', flexDirection: 'column', width: '25rem', height: '10rem',
      justifyContent: 'space-between', border: '2px solid ', borderColor: '#1C285E', borderRadius: '2rem'
    }}>
      <CardActionArea onClick={handleIngresarClick} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingY: '0.5rem', borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
          <CardMedia
            sx={{ width: '5rem', height: '5rem' }}
            component="img"
            src={team1Flag}
            alt={team1.nombre}
          />
          <Typography sx={{ marginY: '0.5rem' }}>{team1.nombre}</Typography>
        </Box>
        <Box
          variant="contained"
          sx={{
            backgroundColor: '#1C285E',
            color: 'white',
            borderRadius: '1rem',
            padding: '0.5rem 1.5rem',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              backgroundColor: '#2A3A72',
              boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              backgroundColor: '#0F1B40',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(0)',
            }
          }}
        >
          Ingresar
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
          <CardMedia
            sx={{ width: '5rem', height: '5rem' }}
            component="img"
            src={team2Flag}
            alt={team2.nombre}
          />
          <Typography sx={{ marginY: '0.5rem' }}>{team2.nombre}</Typography>
        </Box>
      </CardActionArea>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Typography align='center'>{FormatDate(partido.fecha)}</Typography>
      </Box>
    </Card>
  );
};

export default MatchCard;
