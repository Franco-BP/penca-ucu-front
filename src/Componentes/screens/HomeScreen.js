import React from 'react'
import Layout from '../Layout'
import { Box, Grid, Typography, SnackbarContent } from '@mui/material'
import UserRanking from '../UserRanking'
import MatchCarousel from '../MatchCarousel'
import { styled } from '@mui/system';
import Award from '../Award.js'

const CustomSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  background: 'linear-gradient(to right, #1C285E, #6A83D2)',
  borderRadius: '15px',
  color: 'white',
  
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  border: '1px solid #ccc'
}));

const HomeScreen = () => {
  return (
    <Layout>

      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom: '0.5rem', marginLeft: '2.4rem', color: '#1C285E', fontFamily: 'revert', }}>
          <b>Ranking</b>
        </Typography>
      </Grid>

      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid sx={{ flex: 1, marginTop: '0.5rem', marginBottom: '2rem', marginLeft: '2.4rem' }}>
          <UserRanking />
        </Grid>
        <Grid>
          <CustomSnackbarContent message="Copa america 2024" />
          <Award />
        </Grid>
      </Grid>

      <Box sx={{ flex: 1, marginTop: '1rem' }}>
        <MatchCarousel />
      </Box>

    </Layout>
  )
}

export default HomeScreen