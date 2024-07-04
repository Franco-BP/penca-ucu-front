import React, { createContext, useReducer } from 'react';

export const PencaUCUContext = createContext();

// const USUARIO_HARDCODED = {
//     idUsuario: 1,
//     email: "admin@pencaucu.com",
//     contrasenia: "$2a$11$FZ9sQz9001/9fqiy98j2kOk4b29NnAUn.2NaNQNBSYf7hSP7MmPva",
//     nombre: "Administrador",
//     apellido: "PencaUCU",
//     avatarPath: "admin.png",
//     carrera: {
//         idCarrera: 4,
//         nombre: "Analista en Informática",
//         anios: "3"
//     },
//     esAdministrador: true
// };

export const initialState = {
  torneoData: null,
  usuarioData: null,
  selectedPartido: null
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

export const accionSetSelectedPartido = (partido) => {
  return {
    type: 'SET_SELECTED_PARTIDO',
    payload: partido,
  };
};

export const accionUserLogout = () => {
  return {
    type: 'USER_LOGOUT',
    payload: null,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TORNEO_DATA':
      return { ...state, torneoData: action.payload };
    case 'ADD_USUARIO':
      return { ...state, usuarioData: action.payload };
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




