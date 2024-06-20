import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postWithResponseManage } from '../services/PencaUCUservices';
import { accionAddUser, PencaUCUContext } from '../context/context';
import { useNavigate } from 'react-router-dom';

export default function FormPropsTextFields() {

    const { data, dispatch } = useContext(PencaUCUContext);
    const usuario = data.usuarioData;

    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleContraseniaChange = (event) => {
    setContrasenia(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginDetails = { email, contrasenia };
    postWithResponseManage('/usuario/login', loginDetails)
        .then((response) => {
            dispatch(accionAddUser(response))
            if (response.idUsuario) {
                navigate('/home');
            }
        })
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'grid',
        placeItems: 'center',
        height: '100%',
        marginTop: '3rem'
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        required
        label="Contrasenia"
        type="password"
        value={contrasenia}
        onChange={handleContraseniaChange}
      />
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );

};