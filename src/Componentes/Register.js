import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { postWithResponseManage, getWithResponseManage } from '../services/PencaUCUservices';
import { accionGetCarreraData, PencaUCUContext, accionAddUsuario } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { NativeSelect, InputLabel } from '@mui/material';

export default function FormPropsTextFields() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { dispatch } = useContext(PencaUCUContext);
    const [carreraData, setCarreraData] = useState([]);
    const [torneosData, setTorneosData] = useState([]);
    const [equiposData, setEquiposData] = useState([]);

    useEffect(() => {
      getWithResponseManage('/carrera/getAll')
          .then((response) => {
            if(response[0]){
                setCarreraData(response);
                if(response[0].idCarrera){
                    setIdCarrera(1);
                }
              }
          })

      getWithResponseManage('/torneo/getAll')
          .then((response) => {
            if(response[0]){
              setTorneosData(response);
              if(response[0].idTorneo){
                setIdTorneo(1);
              }
            }
          })

      getWithResponseManage('/equipo/getAll')
          .then((response) => {
            if(response[0]){
              setEquiposData(response);
              if(response[0].idEquipo){
                setIdCampeon(1);
                setIdSubcampeon(1);
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
  const [idTorneo, setIdTorneo] = useState(null);
  const [idCampeon, setIdCampeon] = useState(null);
  const [idSubcampeon, setIdSubcampeon] = useState(null);


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
  const handleIdTorneoChange = (event) => {
      setIdTorneo(event.target.value);
  };
  const handleIdCampeonChange = (event) => {
      setIdCampeon(event.target.value);
  };
  const handleIdSubcampeonChange = (event) => {
      setIdSubcampeon(event.target.value);
  };
    

  const handleSubmit = (event) => {
    event.preventDefault();
    const carrera = {idCarrera};
    const registerDetails = { email, contrasenia, nombre, apellido, carrera};
    if (!email) {
      alert("Correo invalido.\nFormato necesario: 'ejemplo@ejemplo.ucu.edu.uy'.");
      return;
    };
    if (!contrasenia || !nombre || !apellido || !idCarrera || !idTorneo || !idCampeon || !idSubcampeon) {
      alert('Por favor complete todos los campos');
      return;
    }
    if (idCampeon === idSubcampeon) {
      alert('El campeon y el subcampeon no pueden ser el mismo equipo.');
      return;
    }
    postWithResponseManage('/usuario/create', registerDetails)
        .then((response) => {
          if (response.idUsuario) {
            dispatch(accionAddUsuario(response))
            const torneoUsuarioDetails = { usuario: {idUsuario: response.idUsuario}, torneo: {idTorneo: idTorneo}, campeon: {idEquipo: idCampeon}, subcampeon: {idEquipo: idSubcampeon}, puntos: 0}
            postWithResponseManage('/torneoUsuario/create', torneoUsuarioDetails)
            .then((response) => {
              if (response.usuario.idUsuario) {
                navigate('/home');
              } else {
                alert('Cuenta creada, pero ocurrio un error en el registro del torneo.');
              }
            })
          } else {
            alert('Error al crear la cuenta.');
          };
        });
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
          sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
          alignContent='center'
        >
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
          <InputLabel variant="standard" htmlFor="carrera-native">
              Carrera
          </InputLabel>
          <NativeSelect
              inputProps={{
              name: 'Carrera',
              id: 'carrera-native',
              }}
              onChange={handleIdCarreraChange}
              defaultValue={1}
              sx={{marginBottom: '1rem'}}
          >
              {carreraData?.map((carrera) => {
                  return (
                      <option key={carrera.nombre} value={carrera.idCarrera}>{carrera.nombre}</option>
                  )
              })}
          </NativeSelect>
          <InputLabel variant="standard" htmlFor="torneo-native">
              Torneo
          </InputLabel>
          <NativeSelect
              inputProps={{
              name: 'Torneo',
              id: 'torneo-native',
              }}
              onChange={handleIdTorneoChange}
              defaultValue={0}
          >
              {torneosData?.map((torneo) => {
                  return (
                      <option key={torneo.nombre} value={torneo.idTorneo}>{torneo.nombre}</option>
                  )
              })}
          </NativeSelect>
          {idTorneo && (
            <>
            <InputLabel variant="standard" htmlFor="campeon-native">
            Campeon
            </InputLabel>
            <NativeSelect
                inputProps={{
                name: 'Torneo',
                id: 'campeon-native',
                }}
                onChange={handleIdCampeonChange}
                defaultValue={1}
            >
                {equiposData?.map((equipo) => {
                    return (
                      <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.nombre}</option>
                    )
                })}
            </NativeSelect>
            <InputLabel variant="standard" htmlFor="subcampeon-native">
            Subcampeon
            </InputLabel>
            <NativeSelect
                inputProps={{
                name: 'Torneo',
                id: 'subcampeon-native',
                }}
                onChange={handleIdSubcampeonChange}
                defaultValue={1}
            >
                {equiposData?.map((equipo) => {
                    return (
                      <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.nombre}</option>
                    )
                })}
            </NativeSelect>
            </>
          )}
      </Grid>
      <Grid
        style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}
      >
        <Button type="submit" sx={{backgroundColor:"#1C285E"}} variant="contained">Register</Button>
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
       >
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
          <InputLabel variant="standard" htmlFor="carrera-native">
              Carrera
          </InputLabel>
          <NativeSelect
              inputProps={{
              name: 'Carrera',
              id: 'carrera-native',
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
          <InputLabel variant="standard" htmlFor="torneo-native">
                Torneo
          </InputLabel>
          <NativeSelect
              inputProps={{
              name: 'Torneo',
              id: 'torneo-native',
              }}
              onChange={handleIdTorneoChange}
              defaultValue={1}
          >
              {torneosData?.map((torneo) => {
                  return (
                      <option key={torneo.idTorneo} value={torneo.idTorneo}>{torneo.nombre}</option>
                  )
              })}
          </NativeSelect>
          {idTorneo && (
            <>
            <InputLabel variant="standard" htmlFor="campeon-native">
            Campeon
            </InputLabel>
            <NativeSelect
                inputProps={{
                name: 'Torneo',
                id: 'campeon-native',
                }}
                onChange={handleIdCampeonChange}
                defaultValue={1}
            >
                {equiposData?.map((equipo) => {
                    return (
                      <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.nombre}</option>
                    )
                })}
            </NativeSelect>
            <InputLabel variant="standard" htmlFor="subcampeon-native">
            Subcampeon
            </InputLabel>
            <NativeSelect
                inputProps={{
                name: 'Torneo',
                id: 'subcampeon-native',
                }}
                onChange={handleIdSubcampeonChange}
                defaultValue={1}
            >
                {equiposData?.map((equipo) => {
                    return (
                      <option key={equipo.idEquipo} value={equipo.idEquipo}>{equipo.nombre}</option>
                    )
                })}
            </NativeSelect>
            </>
          )}
        </Grid>
        <Grid
          style={{display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '2rem'}}
          >
          <Button type="submit" sx={{backgroundColor:"#1C285E"}} variant="contained">Register</Button>
        </Grid>
      </Grid>
      </Box>
    )}
    </div>
  );

};