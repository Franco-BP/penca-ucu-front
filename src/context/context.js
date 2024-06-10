import React, { createContext, useReducer } from 'react';

export const PencaUCUContext = createContext();

export const accionGetTorneoData = (data) => {
  return {
    type: 'GET_TORNEO_DATA',
    payload: data,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TORNEO_DATA':
      return action.payload;
    default:
      return state;
  }
};

export const ProviderPencaUCUContext = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <PencaUCUContext.Provider value={{ data, dispatch }}>
      {children}
    </PencaUCUContext.Provider>
  );
};





