import React from 'react'
import Layout from '../Layout'
import { Box, Grid, Typography, Stack, SnackbarContent } from '@mui/material'

import MatchCarousel from '../MatchCarousel'
import { styled } from '@mui/system';
import PredictionCard from '../PredictionCard/PredictionCard';
import Statistic from '../Statistic';




const PredictionScreen = () => {
  return (
    <Layout>

      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom: '0.5rem', marginTop: '1.5rem', marginLeft: '5rem', color: '#1C285E', fontFamily: 'revert', }}>
          Ingresa tu prediccion
        </Typography>
      </Grid>
      
      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid sx={{ flex: 1, marginTop: '1', marginLeft: '2.4rem' }}>
          <PredictionCard/>
        </Grid>
        <Grid>
         <Statistic/>
        </Grid>
      </Grid>
      
      <Box sx={{ flex: 1, marginTop: '1rem' }}>
        <MatchCarousel />
      </Box>
    </Layout>
  )
}

export default PredictionScreen;