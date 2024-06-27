import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState, useEffect } from 'react'
import { deleteWithoutResponseManage, getWithResponseManage, postWithResponseManage, putWithResponseManage } from '../../../services/PencaUCUservices';
import formatDate from '../../../utils/formatDate';

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

  const [matchUpdate, setMatchUpdate] = useState();
  const [team1Update, setTeam1Update] = useState();
  const [team2Update, setTeam2Update] = useState();

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

  const formatCreateBody = ({date, stadium, tourney, team1, team2}) => {
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
    setMatchUpdate(null);
    setTeam1Update(null);
    setTeam2Update(null);
  };

  const handleSelectUpdate = (newValue) => {
    setMatchUpdate(newValue);
    if (newValue.equipos.at(0).tipoEquipo === 1) {
      setTeam1Update(newValue.equipos.at(0));
      setTeam2Update(newValue.equipos.at(1));
    } else if (newValue.equipos.at(0).tipoEquipo === 2) {
      setTeam2Update(newValue.equipos.at(0));
      setTeam1Update(newValue.equipos.at(1));
    };
  };

  const handleCreate = () => {
    if (dateCreate && stadiumCreate && tourneyCreate && team1Create && team2Create) {
      postWithResponseManage('/partido/create', formatCreateBody({
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
  };

  const handleUpdate = () => {
    if (matchUpdate && team1Update && team2Update && team1Update.resultado && team2Update.resultado) {
      let matchDTO = {...matchUpdate, equipos: [team1Update, team2Update]};
      putWithResponseManage('/partido/update', matchDTO)
      .then((response) => {
        if (response.idPartido) {
          alert("Actualización exitosa del resultado.");
          checkResultado(matchDTO);
          cleanUpdate();
        } else {
          alert("Error desconocido en la actualización. Pruebe con reescribir los valores.");
        }
      })
    } else {
      alert("Valores faltantes para la actualización.");
    }
  };

  const checkResultado = (matchDTO) => {
    postWithResponseManage('/prediccion/checkResultado', matchDTO)
    .then(() => {
      alert("Actualización exitosa de las predicciones.");
    })
  }

  const handleDelete = async () => {
    if (idDelete) {
      try {
        await deleteWithoutResponseManage('/partido/delete', {
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

      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { marginBottom: '1rem' }}}>
        <Typography sx={{marginBottom: '1rem'}}>
          Insertar resultado
        </Typography>
        <Autocomplete
          disablePortal
          id="match-update"
          options={matchesList}
          getOptionLabel={(match) => {
            return `${match?.equipos.at(0)?.equipo.nombre} Vs. ${match?.equipos.at(1)?.equipo.nombre} - ${formatDate(match.fecha)}`
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="partido" />}
          onChange={(event, newValue) => {handleSelectUpdate(newValue)}}
        />
        { matchUpdate ?
          <Box sx={{display:'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
            <TextField variant="outlined" type="number" sx={{marginBottom: '1rem', width: '7rem'}}
              value={team1Update.resultado ? team1Update.resultado : "" }
              label={team1Update.equipo ? team1Update.equipo.nombre : ""}
              onChange={(event) => {setTeam1Update({...team1Update, resultado: parseInt(event.target.value)})}} 
            />
            <TextField variant="outlined" type="number" sx={{marginBottom: '1rem', width: '7rem'}}
              value={team2Update.resultado ? team2Update.resultado : ""}
              label={team2Update.equipo ? team2Update.equipo.nombre : ""}
              onChange={(event) => {setTeam2Update({...team2Update, resultado: parseInt(event.target.value)})}} 
            />
          </Box>
        : <></>
        }
       <Button type="update" variant="contained" onClick={handleUpdate}> Actualizar </Button>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { marginBottom: '1rem' }}}>
        <Typography sx={{marginBottom: '1rem'}}>
          Eliminar partido
        </Typography>
        <Autocomplete
          disablePortal
          id="match-delete"
          options={matchesList}
          getOptionLabel={(match) => {
            return `${match?.equipos.at(0)?.equipo.nombre} Vs. ${match?.equipos.at(1)?.equipo.nombre} - ${formatDate(match.fecha)}`
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="partido" />}
          onChange={(event, newValue) => {setIdDelete(newValue.idPartido)}}
        />
        <Button type="delete" variant="contained" onClick={handleDelete}> Eliminar </Button>
      </Box>
    </Grid>
  )
}

export default MatchCRUD