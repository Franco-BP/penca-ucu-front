import * as React from 'react';
import { CardActionArea, useMediaQuery, CardMedia, Card, Box, CardContent, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import "../services/PencaUCUservices.js";
import formatDate from '../utils/formatDate.js';

const MatchCard = ({match, userPrediction}) => {

  const [ isHovered, setIsHovered ] = useState( false );
    
  const theme = useTheme();
  const mobileMatch = useMediaQuery(theme.breakpoints.down('701'));

  // const match1 = match.equipo1;
  // const match2 = match.equipo2;
  const brasil =  require(`../assets/banderas/brasil.png`);
  const argentina = require(`../assets/banderas/argentina.png`);
  const team1 = {imgBandera: '../assets/banderas/brasil.png', nombre: 'Brasil'};
  const team2 = {imgBandera: '../assets/banderas/argentina.png', nombre: 'Argentina'};
  const matchDate = "2024-06-12T03:00:00.000+00:00"
  const hasPrediction = userPrediction != null;
  
  function handleMouseOver() {
      setIsHovered( true );
  }

  function handleMouseOut() {
      setIsHovered( false );
  }

  return (
    <Card sx={{
      displat: 'flex', flexDirection: 'column', width: '25rem', height: '10rem',
      justifyContent: 'space-between'}}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingY: '0.5rem'}}
        onMouseOver={ handleMouseOver }
        onMouseOut={ handleMouseOut }
        // onClick={() => window.open(match.link, "_blank")}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            sx={{width: '5rem', height: '5rem'}}
            component="img"
            src={brasil} /* IMAGEN DEL EQUIPO */
            alt={team1.nombre}
          />
          <Typography sx={{marginY: '0.5rem'}}>
            {team1.nombre}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button sx={{}}>
            Boton
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            sx={{width: '5rem', height: '5rem'}}
            component="img"
            src={argentina} /* IMAGEN DEL EQUIPO */
            alt={team2.nombre}
          />
          <Typography sx={{marginY: '0.5rem'}}>
            {team2.nombre}
          </Typography>
        </Box>
      </CardActionArea>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Typography align='center'>
          {formatDate(matchDate)}
        </Typography>
      </Box>
      </Card>
  )
}

export default MatchCard;