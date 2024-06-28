import React from 'react'
import Layout from '../Layout'
import { Box, Grid, Typography } from '@mui/material'
import Register from '../Register'

const RegisterScreen = () => {
  return (
    <Layout>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom:'0.5rem',marginTop:'1.5rem',marginLeft:'5rem', color:'#1C285E',fontFamily: 'revert',}}>
          Registrarse
        </Typography>
      </Grid>
      <Box sx={{ flex: 1, marginTop: '1.5rem' }}>
          <Register/>
      </Box>
    </Layout>
  )
}

export default RegisterScreen