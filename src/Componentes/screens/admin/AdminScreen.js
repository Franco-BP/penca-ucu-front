import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout'
import { Box, Grid, Typography } from '@mui/material';
import { PencaUCUContext } from '../../../context/context';
import TeamCRUD from './TeamCRUD';


const AdminScreen = () => {

  const { data, dispatch } = useContext(PencaUCUContext);
  const usuario = data.usuarioData;
  const subtitles = { textAlign: 'left', marginTop:'3rem', marginLeft:'5rem', color:'#1C285E', fontFamily: 'revert'}

  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   postWithResponseManage('/usuario/login', loginDetails)
  //     .then((response) => {
  //       dispatch(accionAddUser(response))
  //       if (response.idUsuario) {
  //         navigate('/home');
  //       }
  //     })
  // };

  useEffect(() => {
    // 
    // Commented for testing reasons
    //
    // if (usuario.esAdministrador != true) {
    //   navigate('/home')
    // }
  }, [])

  return (
    <Layout>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom:'2rem',marginTop:'3rem',marginLeft:'5rem', color:'#1C285E',fontFamily: 'revert',}}>
          Administrar datos
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{display: 'flex', flexDirection: 'column', alignContent: 'space-evenly', justifyContent: 'space-evenly'}}>
        <Box>
          <Typography variant="h5" component="h2" sx={subtitles}>
            Editar equipos
          </Typography>
          <TeamCRUD/>
        </Box>
        <Box>
          <Typography variant="h5" component="h2" sx={subtitles}>
            Editar equipos
          </Typography>
          <TeamCRUD/>
        </Box>
      </Grid>
    </Layout>
  )
}

export default AdminScreen;