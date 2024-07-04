import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout';
import { Box, Grid, Typography } from '@mui/material';
import MatchCarousel from '../MatchCarousel';
import PredictionCard from '../PredictionCard/PredictionCard';
import Statistic from '../Statistic';
import { PencaUCUContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const PredictionScreen = () => {

  const { data } = useContext(PencaUCUContext);
  const navigate = useNavigate();

  const [displayMatch, setDisplayMatch] = useState();

  useEffect(() => {
    if (!data.usuarioData) {
      navigate('/')
    };
  }, [data.usuarioData]);

  useEffect(() => {
    setDisplayMatch(data.selectedPartido);
  }, [data.selectedPartido]);

  return (
    <Layout>
      <Grid 
        container 
        direction="row" 
        justifyContent="flex-start" 
        alignItems="flex-start" 
        sx={{ marginLeft: '2.4rem' }}
      >

        <Grid item xs={12} sm={6} md={6}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              textAlign: 'left', 
              marginBottom: '0.5rem', 
              color: '#1C285E', 
              fontFamily: 'revert' 
            }}
          >
            <b>Ingresa tu prediccion</b>
          </Typography>
          <PredictionCard />
        </Grid>

        <Grid item xs={12} sm={6} md={6} sx={{ height: '100%',display: 'flex', flexDirection: 'column', alignContent: 'flex-start', paddingX: '1rem' }}>
          <Typography
            variant="h4" 
            component="h2" 
            sx={{ 
              textAlign: 'left', 
              marginBottom: '0.5rem', 
              color: '#1C285E', 
              fontFamily: 'revert' 
            }}
          >
            <b>Los usuarios predicen...</b>
          </Typography>
          <Statistic match={displayMatch} />
        </Grid>

      </Grid>

      <Box sx={{ flex: 1, marginTop: '3rem' }}>
        <MatchCarousel />
      </Box>
    </Layout>
  );
};

export default PredictionScreen;
