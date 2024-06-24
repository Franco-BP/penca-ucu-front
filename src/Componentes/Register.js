import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { postWithResponseManage, getWithResponseManage } from '../services/PencaUCUservices';
import { accionGetCarreraData, PencaUCUContext, accionAddUser } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { NativeSelect, InputLabel } from '@mui/material';

export default function FormPropsTextFields() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { data, dispatch } = useContext(PencaUCUContext);
    const carreraData = data.carreraData;

    useEffect(() => {
        
        getWithResponseManage('/carrera/getAll')
            .then((response) => {
                dispatch(accionGetCarreraData(response));
                if(response[0] != undefined){
                  if(response[0].idCarrera){
                      setIdCarrera(1);
                  }
                }
            })
    }, []);

    const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [contrasenia, setContrasenia] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);
  const [idCarrera, setIdCarrera] = useState(null);


  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    // Regular expression for validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailValue) && emailValue.includes('ucu.edu.uy')) {
      setEmail(emailValue);
    } else {
      setEmail(null);
    }
  };
  const handleContraseniaChange = (event) => {
    setContrasenia(event.target.value);
  };  
  const handleNombreChange = (event) => {
      setNombre(event.target.value);
  };
  const handleApellidoChange = (event) => {
      setApellido(event.target.value);
  };
  const handleIdCarreraChange = (event) => {
      setIdCarrera(event.target.value);
  };
    

  const handleSubmit = (event) => {
    event.preventDefault();
    const carrera = {idCarrera};
    const registerDetails = { email, contrasenia, nombre, apellido, carrera};
    postWithResponseManage('/usuario/create', registerDetails)
        .then((response) => {
            console.log(registerDetails)
            dispatch(accionAddUser(response))
            if (response.idUsuario) {
                console.log(response)
                navigate('/home');
            }
        })
  };

  return (
<div>

    {!isMobile && (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'grid',
          height: '100%'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
      <Grid 
      container
      columnSpacing={4}
      >
       <Grid xs={2}></Grid>
       <Grid
       direction="column"
       alignItems="center"
       xs={4}>
          <TextField
              required
              label="Email"
              type="email"
              onChange={handleEmailChange}
          />
          <TextField
              required
              label="Contrasenia"
              type="password"
              onChange={handleContraseniaChange}
          />
      </Grid>
      <Grid
      direction="column"
      alignItems="center"
      xs={4}>
            <TextField
                required
                label="Nombre"
                type="text"
                onChange={handleNombreChange}
            />
            <TextField
                required
                label="Apellido"
                type="text"
                onChange={handleApellidoChange}
            />
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Carrera
            </InputLabel>
            <NativeSelect
                inputProps={{
                name: 'Carrera',
                id: 'uncontrolled-native',
                }}
                onChange={handleIdCarreraChange}
                defaultValue={1}
            >
                {carreraData?.map((carrera) => {
                    return (
                        <option key={carrera.idCarrera} value={carrera.idCarrera}>{carrera.nombre}</option>
                    )
                })}
            </NativeSelect>
       </Grid>
       <Grid xs={2}></Grid>
      </Grid>
      <Grid
        style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}
      >
        <Button type="submit" color='#1C285E' variant="contained">Register</Button>
      </Grid>

      </Box>
    )}
    {isMobile && (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'grid',
          height: '100%'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >

      <Grid 
      container
      direction="column"
      alignItems="center"
      columnSpacing={4}
      >

       <Grid 
       container
       direction="column"
       alignItems="center"
       xs={8}>
          <TextField
              required
              label="Email"
              type="email"
              onChange={handleEmailChange}
          />
          <TextField
              required
              label="Contrasenia"
              type="password"
              onChange={handleContraseniaChange}
          />
          <TextField
              required
              label="Nombre"
              type="text"
              onChange={handleNombreChange}
          />
          <TextField
              required
              label="Apellido"
              type="text"
              onChange={handleApellidoChange}
          />
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Carrera
          </InputLabel>
          <NativeSelect
              inputProps={{
              name: 'Carrera',
              id: 'uncontrolled-native',
              }}
              onChange={handleIdCarreraChange}
              defaultValue={1}
          >
              {carreraData?.map((carrera) => {
                  return (
                      <option key={carrera.idCarrera} value={carrera.idCarrera}>{carrera.nombre}</option>
                  )
              })}
          </NativeSelect>
        </Grid>
        <Grid
          style={{display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '2rem'}}
          >
          <Button type="submit" color='#1C285E' variant="contained">Register</Button>
        </Grid>
      </Grid>
      </Box>
    )}
    </div>
  );

};