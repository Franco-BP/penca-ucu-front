import React from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';
import formatDate from '../utils/formatDate';

const MatchCard = ({ partido }) => {
  if (!partido) return null; // Maneja casos donde no hay datos

  // Asigna datos de los equipos para fácil acceso
  const team1 = partido.equipos[0].equipo;
  const team2 = partido.equipos[1].equipo;

  return (
    <Card sx={{
      display: 'flex', flexDirection: 'column', width: '25rem', height: '10rem',
      justifyContent: 'space-between'
    }}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingY: '0.5rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            sx={{ width: '5rem', height: '5rem' }}
            component="img"
            src={require(`../assets/Banderas/${team1.imgBandera}`)}
            alt={team1.nombre}
          />
          <Typography sx={{ marginY: '0.5rem' }}>{team1.nombre}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            sx={{ width: '5rem', height: '5rem' }}
            component="img"
            src={require(`../assets/Banderas/${team2.imgBandera}`)}
            alt={team2.nombre}
          />
          <Typography sx={{ marginY: '0.5rem' }}>{team2.nombre}</Typography>
        </Box>
      </CardActionArea>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Typography align='center'>{formatDate(partido.fecha)}</Typography>
      </Box>
    </Card>
  );
};

export default MatchCard;
