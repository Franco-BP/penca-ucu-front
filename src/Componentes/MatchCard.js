import React from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material';
import formatDate from '../utils/formatDate';

const MatchCard = ({ partido }) => {
  // Primero verifica si partido y partido.equipos existen
  if (!partido || !partido.equipos || partido.equipos.length < 2) return null;

  // Asegúrate de que ambos equipos están definidos
  const team1 = partido.equipos[0].equipo;
  const team2 = partido.equipos[1].equipo;
  console.log(team1.imgBandera, team2.imgBandera);

  const team1Flag = require(`../assets/Banderas/${team1.imgBandera}`);
  const team2Flag = require(`../assets/Banderas/${team2.imgBandera}`);
  // Verifica que los equipos tienen los datos necesarios antes de renderizar
  if (!team1 || !team2) return null;

  console.log(team1Flag);
  console.log(team2Flag);

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
            src={team1Flag}
            alt={team1.nombre}
          />
          <Typography sx={{ marginY: '0.5rem' }}>{team1.nombre}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        <Typography align='center'>{formatDate(partido.fecha)}</Typography>
      </Box>
    </Card>
  );
};

export default MatchCard;
