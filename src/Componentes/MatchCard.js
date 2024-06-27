import React from 'react';
import { Card, CardActionArea, CardMedia, Box, Typography, Button } from '@mui/material';
import FormatDate from '../utils/FormatDate';
import { useNavigate } from 'react-router-dom';


const MatchCard = ({ partido }) => {
  const navigate = useNavigate();
  if (!partido || !partido.equipos || partido.equipos.length < 2) return null; // si no hay partidos no los muestra

  

  const handleIngresarClick = () => {

    navigate(`/prediccion`); // Navega a la página de predicción con el ID del partido
  };

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
          <Typography sx={{ marginY: '0.5rem'}}>{team1.nombre}</Typography>
        </Box>
        <Button variant="contained" sx={{ backgroundColor: '#1C285E', color: 'white', borderRadius: '1rem'}}>Ingresar</Button>
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
