import React from 'react';
import Layout from '../Layout';
import { Box, Grid, Typography } from '@mui/material';
import MatchCarousel from '../MatchCarousel';
import PredictionCard from '../PredictionCard/PredictionCard';
import Statistic from '../Statistic';

const PredictionScreen = () => {
  return (
    <Layout>
      <Grid item xs={12} sm={12} md={12}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            textAlign: 'left', 
            marginBottom: '0.5rem', 
            marginTop: '1.5rem', 
            marginLeft: '5rem', 
            color: '#1C285E', 
            fontFamily: 'revert' 
          }}
        >
          Ingresa tu prediccion
        </Typography>
      </Grid>

      <Grid 
        container 
        direction="row" 
        justifyContent="flex-start" 
        alignItems="center" 
        sx={{ marginLeft: '2.4rem',marginTop:'-4rem' }}
      >
        <Grid item xs={12} sm={6} md={6} sx={{ padding: '1rem' }}>
          <PredictionCard />
        </Grid>
        <Grid item xs={12} sm={6} md={6} sx={{ padding: '1rem',marginTop:'5rem' }}>
          <Statistic />
        </Grid>
      </Grid>

      <Box sx={{ flex: 1, marginTop: '0rem' }}>
        <MatchCarousel />
      </Box>
    </Layout>
  );
};

export default PredictionScreen;
