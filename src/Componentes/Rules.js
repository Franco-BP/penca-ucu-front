import * as React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Stack, SnackbarContent } from '@mui/material';
import { styled } from '@mui/system';

const cardData = [
  {
    title: 'Puntuación de Partido',
    image: 'https://cdn-icons-png.freepik.com/512/2256/2256936.png',
    description: 'Acierto Exacto: 4 puntos por acertar perfectamente el resultado de un partido. Acierto Correcto: 2 puntos por acertar el resultado del partido (ganador o empate, sin necesidad de ser exacto).',
  },
  {
    title: 'Puntuación por campeonato',
    image: 'https://cdn-icons-png.flaticon.com/512/2256/2256904.png',
    description: 'Campeón: 10 puntos por acertar quién será el campeón de la Copa América 2024. Subcampeón: 5 puntos por acertar quién será el subcampeón de la Copa América 2024.',
  },
  {
    title: 'Premios',
    image: 'https://cdn-icons-png.freepik.com/512/4852/4852565.png',
    description: 'Primer Lugar: Camiseta autografiada por los jugadores de la selección. Segundo Lugar: Pelota similar a la oficial del torneo.',
  },
];

const CustomSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  background: 'linear-gradient(to right, #1C285E, #6A83D2)',
  borderRadius: '15px',
  color: 'white',
  
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  border: '1px solid #ccc'
}));

function Rules() {
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, height: '100%', backgroundColor: '#1C285E', borderRadius: '2rem', margin: '0 auto' }}>
              <CardMedia
                component="img"
                sx={{ height: 140, objectFit: 'contain', padding: '0rem' }}
                image={card.image}
                title={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#fff' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ color: '#fff' }}>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ maxWidth: 700, margin: '2rem auto', borderRadius: '15px', marginRight:'0rem' }}>
        <CustomSnackbarContent message="¡Demuestra tu habilidad en los pronósticos y disfruta al máximo del juego! ¡Buena suerte!" />
      </Stack>
    </>
  );
}

export default Rules;
