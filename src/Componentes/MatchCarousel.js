import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import MatchCard from './MatchCard';
import { Box } from '@mui/material';
import { useContext } from 'react';
import { PencaUCUContext, accionGetPartidoData, accionGetFuturePartidoData } from '../context/context';
import { getWithResponseManage } from '../services/PencaUCUservices';

const MatchCarousel = () => {
  const { data, dispatch } = useContext(PencaUCUContext);
  const [groupedMatches, setGroupedMatches] = useState([]);

  useEffect(() => {
    getWithResponseManage('/partido/getAll')
      .then((response) => {
        dispatch(accionGetPartidoData(response));
        console.log(response);
      })
      .catch(error => console.log(error));
  }, [dispatch]);

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
  }, [data.partidoData]); // This useEffect depends on data.partidoData being updated

  return (
    <Box sx={{ width: '100%' }}>
      <Carousel>
        {groupedMatches.map((group, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {group.map((partido) => (
              <MatchCard key={partido.idPartido} partido={partido} />
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MatchCarousel;
