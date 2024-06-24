import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout'
import { Grid, Typography } from '@mui/material';
import { PencaUCUContext } from '../../../context/context';
import TeamCRUD from './TeamCRUD';


const AdminScreen = () => {

  const { data, dispatch } = useContext(PencaUCUContext);
  const usuario = data.usuarioData;

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
        <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom:'0.5rem',marginTop:'3rem',marginLeft:'5rem', color:'#1C285E',fontFamily: 'revert',}}>
          Administrar datos
        </Typography>
      </Grid>
      <TeamCRUD/>
    </Layout>
  )
}

export default AdminScreen;