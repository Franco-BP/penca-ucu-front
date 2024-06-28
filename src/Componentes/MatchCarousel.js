import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import MatchCard from './MatchCard';
import { Box, Grid } from '@mui/material';
import { PencaUCUContext, accionGetPartidoData, accionSetSelectedPartido } from '../context/Context';
import { getWithResponseManage } from '../services/PencaUCUservices';

const MatchCarousel = () => {
  const { data, dispatch } = useContext(PencaUCUContext);
  const [groupedMatches, setGroupedMatches] = useState([]);

  useEffect(() => {
    getWithResponseManage('/partido/getAll')
      .then((response) => {
        dispatch(accionGetPartidoData(response));
      })
      .catch(error => console.log(error));
  }, [dispatch]);

  const handleSelectPartido = (partido) => {
    dispatch(accionSetSelectedPartido(partido));
  };


  useEffect(() => {
    if (data.partidoData) {
      const groupMatches = (matches, groupSize) => {
        const matchGroups = [];
        for (let i = 0; i < matches.length; i += groupSize) {
          matchGroups.push(matches.slice(i, i + groupSize));
        }
        return matchGroups;
      };

      setGroupedMatches(groupMatches(data.partidoData, 3));
    }
  }, [data.partidoData]);

  return (
    <Box sx={{ width: '100%' }}>
      <Carousel navButtonsAlwaysVisible indicators={false}>
        {groupedMatches.map((group, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {group.map((partido) => (
              <div onClick={() => handleSelectPartido(partido)} key={partido.idPartido}>
                <MatchCard partido={partido} />
              </div>
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MatchCarousel;