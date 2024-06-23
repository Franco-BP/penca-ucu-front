import React from 'react'
import Layout from '../Layout'
import { Box, Grid, Typography, Stack, SnackbarContent } from '@mui/material'
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
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom: '0.5rem', marginTop: '1.5rem', marginLeft: '5rem', color: '#1C285E', fontFamily: 'revert', }}>
          Ranking
        </Typography>
      </Grid>

      <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid sx={{ flex: 1, marginTop: '1', marginLeft: '2.4rem' }}>
          <UserRanking />
        </Grid>
        <Grid>
          <div sx={{ borderRadius: '15px' }}>
            <CustomSnackbarContent message="Copa america 2024" />
          </div>
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