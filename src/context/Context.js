import React, { createContext, useReducer } from 'react';

export const PencaUCUContext = createContext();

export const initialState = {
  torneoData: null,
  usuarioData: null,
  carreraData: null,
  partidoData: null,
  futurePartidoData: null,
  prediccionData: null,
  selectedPartido: null,
  statisticData: null
};

export const accionGetCarreraData = (carrera) => {
  return {
    type: 'GET_CARRERA_DATA',
    payload: carrera,
  };
};

export const accionAddUsuario = (usuario) => {
  return {
    type: 'ADD_USUARIO',
    payload: usuario,
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

export const accionGetPrediccionData = (prediccion) => {
  return {
    type: 'GET_PREDICCION_DATA',
    payload: prediccion,
  };
}

export const accionGetUsuarioData = (usuario) => {
  return {
    type: 'GET_USUARIO_DATA',
    payload: usuario,
  };
};

export const accionPostPrediccionData = (prediccion) => {
  return {
    type: 'POST_PREDICCION_DATA',
    payload: prediccion,
  };
};

export const accionSetSelectedPartido = (partido) => {
  return {
    type: 'SET_SELECTED_PARTIDO',
    payload: partido,
  };
};

export const accionGetStatisticData = (statistic) => {
  return {
    type: 'GET_STATISTIC_DATA',
    payload: statistic,
  };
}

export const accionUserLogout = () => {
  return {
    type: 'USER_LOGOUT',
    payload: null,
  };
}



const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TORNEO_DATA':
      return { ...state, torneoData: action.payload };
    case 'ADD_USUARIO':
      return { ...state, usuarioData: action.payload };
    case 'GET_CARRERA_DATA':
      return { ...state, carreraData: action.payload };
    case 'GET_PARTIDO_DATA':
      return { ...state, partidoData: action.payload };
    case 'GET_FUTURE_PARTIDO_DATA':
      return { ...state, futurePartidoData: action.payload };
    case 'GET_PREDICCION_DATA':
      return { ...state, prediccionData: action.payload };
    case 'GET_USUARIO_DATA':
      return { ...state, usuarioData: action.payload };
    case 'POST_PREDICCION_DATA':
      return { ...state, prediccionData: action.payload };
    case 'SET_SELECTED_PARTIDO':
      return { ...state, selectedPartido: action.payload };
    case 'USER_LOGOUT':
      return { ...state, usuarioData: null };
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




