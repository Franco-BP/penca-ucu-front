import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material'
import Colorful from '@uiw/react-color-colorful';
import FLAGS from '../../../context/LocalData';
import { postWithResponseManage, getWithResponseManage, putWithResponseManage, deleteWithoutResponseManage } from '../../../services/PencaUCUservices';

const TeamCRUD = () => {
  
  const flagsList = FLAGS;
  const [nameCreate, setNameCreate] = useState('');
  const [flagCreate, setFlagCreate] = useState(null);
  const [hexaColorCreate, setHexaColorCreate] = useState('#FFFFFF');
  
  const [teamsList, setTeamsList] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(null);
  const [hexaColorUpdate, setHexaColorUpdate] = useState('#FFFFFF');
  const [nameUpdate, setNameUpdate] = useState(null);
  const [idUpdate, setIdUpdate] = useState(0);

  const [nameDelete, setNameDelete] = useState(0);
  const [idDelete, setIdDelete] = useState(0);

  useEffect(() => {
    getWithResponseManage('/equipo/getAll')
    .then((response) => { setTeamsList(response); console.log(response)})
    .catch((error) => {console.error(error)});
  }, []);

  const handleNameUpdateSelect = (event, newValue) => {
    if (newValue){
      setNameUpdate(newValue.nombre);
      setFlagUpdate(newValue.imgBandera);
      setHexaColorUpdate(newValue.color);
      setIdUpdate(newValue.idEquipo);
    }
  };

  const handleNameDeleteSelect = (event, newValue) => {
    if (newValue){
      setNameDelete(newValue.nombre);
      setIdDelete(newValue.idEquipo);
    }
  };

  const handleCreate = () => {
    if (nameCreate && flagCreate && hexaColorCreate) {
      postWithResponseManage('/equipo/create', {
        nombre: nameCreate,
        imgBandera: flagCreate,
        color: hexaColorCreate
      })
      .then((response) => {
        if (response.idEquipo) {
          alert("Creacion exitosa.")
        } else {
          alert("Error desconocido en la creacion.")
        }
      })
    } else {
      alert("Valores faltantes para la creacion");
    }
  }

  const handleUpdate = () => {
    if (idUpdate && nameUpdate && flagUpdate && hexaColorUpdate) {
      putWithResponseManage('/equipo/update', {
        idEquipo: idUpdate,
        nombre: nameUpdate,
        imgBandera: flagUpdate,
        color: hexaColorUpdate
      })
      .then((response) => {
        if (response.idEquipo) {
          alert("Actualizacion exitosa.")
        } else {
          alert("Error desconocido en la actualizacion.")
        }
      })
    } else {
      alert("Valores faltantes para la actualizacion");
    }
  }

  const handleDelete = async () => {
    if (idDelete) {
      try {
        await deleteWithoutResponseManage('/equipo/delete', {
          idEquipo: idDelete,
        });
        alert("Eliminación exitosa.");
        setIdDelete(null);
        setNameDelete(null);
      } catch (error) {
        alert("Error desconocido al eliminar.");
      }
    } else {
      alert("Nombre faltante para la eliminación.");
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{marginBottom: '1rem'}}>
          Crear equipo
        </Typography>
        <TextField label="Nombre del equipo" variant="outlined" fullWidth value={nameCreate}
          sx={{marginBottom: '1rem'}}
          onChange={(event) => {setNameCreate(event.target.value)}} 
        />
        <Autocomplete
          disablePortal
          id="autocomplete-flags-create"
          options={flagsList}
          sx={{ width: 300, marginBottom: '1rem' }}
          renderInput={(params) => <TextField {...params} label="bandera" />}
          onChange={(event, newValue) => {
            setFlagCreate(newValue);
          }}
        /><Colorful
          color={hexaColorCreate}
          onChange={(color) => {
            setHexaColorCreate(color.hex);
          }}
        />
        <Button type="create" variant="contained" onClick={handleCreate}> Crear </Button>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { marginBottom: '1rem' }}}>
        <Typography sx={{marginBottom: '1rem'}}>
          Actualizar equipo
        </Typography>
        <Autocomplete
          disablePortal
          id="autocomplete-names-update"
          options={teamsList}
          getOptionLabel={(option) => option.nombre}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="nombre" />}
          onChange={handleNameUpdateSelect}
        />
        <Autocomplete
          disablePortal
          id="autocomplete-flags-update"
          options={flagsList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="bandera" />}
          value={flagUpdate}
          onChange={(event, newValue) => {
            setFlagUpdate(newValue);
          }}
        />
       {/* <HexColorPicker color={color} onChange={setColor} />
       <HexColorInput color={color} onChange={setColor} /> */}
       <Button type="update" variant="contained" onClick={handleUpdate}> Actualizar </Button>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { marginBottom: '1rem' }}}>
        <Typography sx={{marginBottom: '1rem'}}>
          Eliminar equipo
        </Typography>
        <Autocomplete
          disablePortal
          id="autocomplete-names-delete"
          options={teamsList}
          getOptionLabel={(option) => option.nombre}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="nombre" />}
          onChange={handleNameDeleteSelect}
        />
        <Button type="update" variant="contained" onClick={handleDelete}> Eliminar </Button>
      </Box>
    </Grid>
  )
}

export default TeamCRUD;