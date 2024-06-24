import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState, useEffect } from 'react'
import { deleteWithoutResponseManage, getWithResponseManage, postWithResponseManage, putWithResponseManage } from '../../../services/PencaUCUservices';

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
  
  const [dateUpdate, setDateUpdate] = useState();
  const [stadiumUpdate, setStadiumUpdate] = useState();
  const [tourneyUpdate, setTourneyUpdate] = useState();
  const [team1Update, setTeam1Update] = useState();
  const [team2Update, setTeam2Update] = useState();
  const [team1UpdateResult, setTeam1UpdateResult] = useState();
  const [team2UpdateResult, setTeam2UpdateResult] = useState();

  const [idDelete, setIdDelete] = useState();

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

  const valuesToJSON = ({date, stadium, tourney, team1, team2}) => {
    return {
      fecha: date,
      estadio: stadium,
      idTorneo: tourney.idTorneo,
      equipos: [
        {
          tipoEquipo: 1,
          equipo: {
            idEquipo: team1.idEquipo
          }
        },
        {
          tipoEquipo: 2,
          equipo: {
            idEquipo: team2.idEquipo
          }
        },
      ]
    };
  };

  const cleanCreate = () => {
    setDateCreate(null);
    setStadiumCreate(null);
    setTourneyCreate(null);
    setTeam1Create(null);
    setTeam2Create(null);
  };

  const cleanUpdate = () => {
    setDateUpdate(null);
    setStadiumUpdate(null);
    setTourneyUpdate(null);
    setTeam1Update(null);
    setTeam2Update(null);
  };

  // const handleNameUpdateSelect = (event, newValue) => {
  //   if (newValue){
  //     setNameUpdate(newValue.nombre);
  //     setFlagUpdate(newValue.imgBandera);
  //     setHexaColorUpdate(newValue.color);
  //     setIdUpdate(newValue.idEquipo);
  //   }
  // };

  // const handleNameDeleteSelect = (event, newValue) => {
  //   if (newValue){
  //     setIdDelete(newValue.idEquipo);
  //   };
  // };

  const handleCreate = () => {
    if (dateCreate && stadiumCreate && tourneyCreate && team1Create && team2Create) {
      postWithResponseManage('/partido/create', valuesToJSON({
        date: dateCreate, stadium: stadiumCreate, tourney: tourneyCreate, team1: team1Create, team2: team2Create
    }))
      .then((response) => {
        if (response.idPartido) {
          alert("Creación exitosa.")
          cleanCreate();
        } else {
          alert("Error desconocido en la creación.")
        }
      })
    } else {
      alert("Valores faltantes para la creación.");
    }
  }

  const handleUpdate = () => {
    if (dateUpdate && stadiumUpdate && tourneyUpdate && team1Update && team2Update) {
      putWithResponseManage('/partido/update', valuesToJSON({
        date: dateUpdate, stadium: stadiumUpdate, tourney: tourneyUpdate, team1: team1Update, team2: team2Update
    }))
      .then((response) => {
        if (response.idPartido) {
          alert("Actualización exitosa.")
          cleanUpdate();
        } else {
          alert("Error desconocido en la actualización.")
        }
      })
    } else {
      alert("Valores faltantes para la actualización.");
    }
  }

  const handleDelete = async () => {
    if (idDelete) {
      try {
        await deleteWithoutResponseManage('/equipo/delete', {
          idPartido: idDelete,
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="fecha*" onChange={setDateCreate} sx={{marginBottom: '1rem'}}/>
        </LocalizationProvider>
        <Autocomplete
          disablePortal
          id="stadium-create"
          options={stadiumList}
          getOptionLabel={(stadium) => stadium.nombre}
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
          getOptionLabel={(tourney) => tourney.nombre}
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
          getOptionLabel={(team) => team.nombre}
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
          getOptionLabel={(team) => team.nombre}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="equipo 2*" />}
          onChange={(event, newValue) => {
            setTeam2Create(newValue);
          }}
        />
        <Button type="create" variant="contained" onClick={handleCreate}> Crear </Button>
      </Box>

      {/* <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { marginBottom: '1rem' }}}>
        <Typography sx={{marginBottom: '1rem'}}>
          Actualizar partido
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="fecha*" onChange={setDateUpdate} sx={{marginBottom: '1rem'}}/>
        </LocalizationProvider>
        <Autocomplete
          disablePortal
          id="stadium-update"
          options={stadiumList}
          getOptionLabel={(stadium) => stadium.nombre}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="estadio*" />}
          onChange={(event, newValue) => {
            setStadiumUpdate(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="tourney-update"
          options={tourneysList}
          getOptionLabel={(tourney) => tourney.nombre}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="torneo*" />}
          onChange={(event, newValue) => {
            setTourneyUpdate(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="team1-update"
          options={teamsList}
          getOptionLabel={(team) => team.nombre}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="equipo 1*" />}
          onChange={(event, newValue) => {
            setTeam1Update(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="team2-update"
          options={teamsList}
          getOptionLabel={(team) => team.nombre}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="equipo 2*" />}
          onChange={(event, newValue) => {
            setTeam2Update(newValue);
          }}
        />
        <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TextField variant="outlined" fullWidth type="number" sx={{marginBottom: '1rem'}}
            value={team1UpdateResult}
            label={`Resultado ${team1Update?.nombre}*`}
            onChange={(event) => {setTeam1UpdateResult(event.target.value)}} 
          />
          <TextField variant="outlined" fullWidth type="number" sx={{marginBottom: '1rem'}}
            value={team2UpdateResult}
            label={`Resultado ${team2Update?.nombre}*`}
            onChange={(event) => {setTeam2UpdateResult(event.target.value)}} 
          />
        </Box>
       <Button type="update" variant="contained" onClick={handleUpdate}> Actualizar </Button>
      </Box> */}

      {/* <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { marginBottom: '1rem' }}}>
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
      </Box> */}
    </Grid>
  )
}

export default MatchCRUD