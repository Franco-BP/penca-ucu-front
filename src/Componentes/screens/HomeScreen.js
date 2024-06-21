import React from 'react'
import Layout from '../Layout'
import { Box, Grid, Typography } from '@mui/material'
import Contenido from '../Contenido'
import MatchCarousel from '../MatchCarousel'
import PredictionCard from '../PredictionCard/PredictionCard'
import UserRanking from '../UserRanking'

const HomeScreen = () => {
  return (
    <Layout>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom: '0.5rem', marginTop: '3rem', marginLeft: '5rem', color: '#1C285E', fontFamily: 'revert', }}>
          Resultados
        </Typography>
      </Grid>
      <Box sx={{ flex: 1, marginTop: '1.5rem' }}>
        <Contenido />
      </Box>
      <Box>
        <MatchCarousel />
      </Box>
      <Box>
        <PredictionCard />
      </Box>
      <Box>
        <UserRanking />
      </Box>
    </Layout>
  )
}

export default HomeScreen