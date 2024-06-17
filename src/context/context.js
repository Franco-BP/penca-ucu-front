import React, { createContext, useReducer } from 'react';

export const PencaUCUContext = createContext();

export const accionGetTorneoData = (data) => {
  return {
    type: 'GET_TORNEO_DATA',
    payload: data,
  };
};

export const accionPostPrediccionData = (data) => {
  return {
    type: 'POST_PREDICCION_DATA',
    payload: data,
  };
};

export const accionGetPartidoData = (data) => {
  return {
    type: 'GET_PARTIDO_DATA',
    payload: data,
  };
}

const initialState = {
  partidoData: {},
  predictions: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TORNEO_DATA':
      return action.payload;
    case 'GET_PARTIDO_DATA':
      return { ...state, partidoData: action.payload };
    case 'POST_PREDICCION_DATA':
      return { ...state, predictions: action.payload };
    default:
      return state;
  }
};

export const ProviderPencaUCUContext = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <PencaUCUContext.Provider value={{ data, dispatch }}>
      {children}
    </PencaUCUContext.Provider>
  );
};





