import React from 'react';
import Carousel from 'react-material-ui-carousel';
import MatchCard from './MatchCard'; 
import { Box } from '@mui/material';

const MatchCarousel = () => {
  const matchData = [
    {
      id: 1,
      team1: { flag: 'brasil.png', name: 'Brasil' },
      team2: { flag: 'argentina.png', name: 'Argentina' },
      date: '2024-06-12T03:00:00.000+00:00',
    },
    {
      id: 2,
      team1: { flag: 'alemania.png', name: 'Alemania' },
      team2: { flag: 'francia.png', name: 'Francia' },
      date: '2024-06-15T03:00:00.000+00:00',
    },
    {
      id: 3,
      team1: { flag: 'españa.png', name: 'España' },
      team2: { flag: 'portugal.png', name: 'Portugal' },
      date: '2024-06-18T03:00:00.000+00:00',
    },

  ];

  const groupMatches = (matches, groupSize) => {
    const matchGroups = [];
    for (let i = 0; i < matches.length; i += groupSize) {
      matchGroups.push(matches.slice(i, i + groupSize));
    }
    return matchGroups;
  };

  const groupedMatches = groupMatches(matchData, 3);

  return (
    <Box sx={{ width: '100%' }}>
      <Carousel>
        {groupedMatches.map((group, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {group.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default MatchCarousel;
