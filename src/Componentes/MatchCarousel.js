import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import MatchCard from './MatchCard';
import { Box } from '@mui/material';
import { PencaUCUContext, accionGetFuturePartidoData, accionSetSelectedPartido } from '../context/context';
import { getWithResponseManage } from '../services/PencaUCUservices';

const MatchCarousel = () => {
  const { data, dispatch } = useContext(PencaUCUContext);
  const [groupedMatches, setGroupedMatches] = useState([]);

  useEffect(() => {
    // Setup the request payload
    const today = new Date();
    const dateString = today.toISOString(); // Format as ISO string (e.g., "2022-06-12T03:00:00.000Z")

    const requestPayload = {
      fecha: "2024-06-28 00:00:00.000000",
      idTorneo: 9
    };

    getWithResponseManage('/partido/getAll', requestPayload)
      .then((response) => {
        dispatch(accionGetFuturePartidoData(response));
        console.log('Future partido data:', response); 
      })
      .catch(error => console.log(error));
  }, [dispatch]);

  const handleSelectPartido = (partido) => {
    dispatch(accionSetSelectedPartido(partido));
  };

  useEffect(() => {
    if (data.futurePartidoData) {
      const groupMatches = (matches, groupSize) => {
        const matchGroups = [];
        for (let i = 0; i < matches.length; i += groupSize) {
          matchGroups.push(matches.slice(i, i + groupSize));
        }
        return matchGroups;
      };

      setGroupedMatches(groupMatches(data.futurePartidoData, 3));
    }
  }, [data.futurePartidoData]);

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
