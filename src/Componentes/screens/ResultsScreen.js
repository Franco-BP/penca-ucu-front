import React from 'react'
import Layout from '../Layout'
import { Box, Grid, Typography } from '@mui/material'
import Results from '../Results'

const ResultsScreen = () => {
    return (
        <Layout>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom: '0.5rem', marginTop: '1.5rem', marginLeft: '5rem', color: '#1C285E', fontFamily: 'revert', }}>
                    <b>Resultados</b>
                </Typography>
            </Grid>
            <Box sx={{ display: 'flex', flex: 1, marginTop: '1.5rem', justifyContent: 'center' }}>
                <Results />
            </Box>
        </Layout>
    )
}

export default ResultsScreen