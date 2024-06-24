import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react'

const MatchCRUD = () => {

  const [matchesList, setMatchesList] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [tourneysList, setTourneysList] = useState([]);
  const [stadiumList, setStadiumList] = useState([]);

  const [dateCreate, setDateCreate] = useState();
  const [stadiumCreate, setStadiumCreate] = useState();
  const [tourneyCreate, setTourneyCreate] = useState();
  const [team1Create, setTeam1Create] = useState();
  const [team2Create, setTeam2Create] = useState();

  useEffect(() => {
    getWithResponseManage('/partido/getAll')
    .then((response) => { setMatchesList(response) })
    .catch((error) => {console.error(error)});
    
    getWithResponseManage('/equipo/getAll')
    .then((response) => { setTeamsList(response) })
    .catch((error) => {console.error(error)});

    getWithResponseManage('/torneo/getAll')
    .then((response) => { setTourneysList(response) })
    .catch((error) => {console.error(error)});

    getWithResponseManage('/estadio/getAll')
    .then((response) => { setStadiumList(response) })
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
      setIdDelete(newValue.idEquipo);
    };
  };

  const handleCreate = () => {
    if (dateCreate && stadiumCreate && tourneyCreate && team1Create && team2Create) {
      postWithResponseManage('/partido/create', {
        fecha: nameCreate,
        estadio: flagCreate,
        idTorneo: tourneyCreate.idTorneo,
        
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
      } catch (error) {
        alert("Error desconocido al eliminar.");
      }
    } else {
      alert("Nombre faltante para la eliminación.");
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { marginBottom: '1rem' }}}>
        <Typography sx={{marginBottom: '1rem'}}>
          Crear Partido
        </Typography>
        <DatePicker label="fecha*"/>
        <Autocomplete
          disablePortal
          id="stadium-create"
          options={stadiumList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="estadio*" />}
          onChange={(event, newValue) => {
            setStadiumCreate(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="tourney-create"
          options={tourneysList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="torneo*" />}
          onChange={(event, newValue) => {
            setTourneyCreate(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="team1-create"
          options={teamsList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="equipo 1*" />}
          onChange={(event, newValue) => {
            setTeam1Create(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="team2-create"
          options={teamsList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="equipo 2*" />}
          onChange={(event, newValue) => {
            setTeam2Create(newValue);
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
          renderInput={(params) => <TextField {...params} label="nombre del equipo*" />}
          onChange={handleNameUpdateSelect}
        />
        <Autocomplete
          disablePortal
          id="autocomplete-flags-update"
          options={flagsList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="bandera*" />}
          value={flagUpdate}
          onChange={(event, newValue) => {
            setFlagUpdate(newValue);
          }}
        />
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
          renderInput={(params) => <TextField {...params} label="nombre*" />}
          onChange={handleNameDeleteSelect}
        />
        <Button type="update" variant="contained" onClick={handleDelete}> Eliminar </Button>
      </Box>
    </Grid>
  )
}

export default MatchCRUD