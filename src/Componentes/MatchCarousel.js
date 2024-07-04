import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-material-ui-carousel';
import MatchCard from './MatchCard';
import { Box } from '@mui/material';
import { PencaUCUContext, accionSetSelectedPartido } from '../context/Context';
import { getWithResponseManage } from '../services/PencaUCUservices';

const MatchCarousel = () => {
  const { dispatch } = useContext(PencaUCUContext);
  const [groupedMatches, setGroupedMatches] = useState([]);

  useEffect(() => {
    getWithResponseManage('/partido/getAll')
      .then((response) => {
        const now = new Date();
        now.setHours(now.getHours() - 1);

        const futureMatches = response.filter(partido => new Date(partido.fecha) > now);
        const groupMatches = (matches, groupSize) => {
          const matchGroups = [];
          for (let i = 0; i < matches.length; i += groupSize) {
            matchGroups.push(matches.slice(i, i + groupSize));
          }
          return matchGroups;
        };
        setGroupedMatches(groupMatches(futureMatches, 3));
      })
      .catch(error => console.log(error));
  }, []);

  const handleSelectPartido = (partido) => {
    dispatch(accionSetSelectedPartido(partido));
  };

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
