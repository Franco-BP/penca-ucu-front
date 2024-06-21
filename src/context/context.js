import React, { createContext, useReducer } from 'react';

export const PencaUCUContext = createContext();

export const initialState = {
  torneoData: null,
  userData: null,
  carreraData: null,
  partidoData: null,
  futurePartidoData: null,
};

export const accionGetCarreraData = (carrera) => {
  return {
    type: 'GET_CARRERA_DATA',
    payload: carrera,
  };
};

export const accionAddUser = (user) => {
  return {
    type: 'ADD_USER',
    payload: user,
  };
};


export const accionGetTorneoData = (torneo) => {
  return {
    type: 'GET_TORNEO_DATA',
    payload: torneo,
  };
};

export const accionGetPartidoData = (partido) => {
  return {
    type: 'GET_PARTIDO_DATA',
    payload: partido,
  };
};

export const accionGetFuturePartidoData = (partido) => {
  return {
    type: 'GET_FUTURE_PARTIDO_DATA',
    payload: partido,
  };
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TORNEO_DATA':
      return { ...state, torneoData: action.payload };
    case 'ADD_USER':
      return { ...state, userData: action.payload };
    case 'GET_CARRERA_DATA':
      return { ...state, carreraData: action.payload };
    case 'GET_PARTIDO_DATA':
      return { ...state, partidoData: action.payload };
    case 'GET_FUTURE_PARTIDO_DATA':
      return { ...state, partidoData: action.payload };
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




