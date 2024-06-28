import React from 'react'
import Layout from '../Layout'
import { Box, Grid, Typography } from '@mui/material'
import UserPredictions from '../UserPredictions'

const ProfileScreen = () => {
  return (
    <Layout>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom:'0.5rem',marginTop:'1.5rem',marginLeft:'5rem', color:'#1C285E',fontFamily: 'revert',}}>
          Mis predicciones
        </Typography>
      </Grid>
      <Box sx={{ flex: 1, marginTop: '1.5rem' }}>
          <UserPredictions />
      </Box>
    </Layout>
  )
}

export default ProfileScreen