import React, { useContext, useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { PencaUCUContext } from '../../../context/context';
import Colorful from '@uiw/react-color-colorful';
import FLAGS from '../../../context/LocalData';

const TeamCRUD = () => {

  const { data, dispatch } = useContext(PencaUCUContext);
  
  const teamFlags = FLAGS;
  const [flagSelected, setFlagSelected] = useState(null);
  const [hexaColorSelected, setHexaColorSelected] = useState(null);

  return (
    <div>
      <TextField id="outlined-basic" label="Nombre del equipo" variant="outlined" />
      <Autocomplete
        disablePortal
        id="autocomplete-flags"
        options={teamFlags}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="bandera" />}
        onChange={(event, newValue) => {
          setFlagSelected(newValue);
        }}
      />
      <Colorful
        color={hexaColorSelected}
        onChange={(color) => {
          setHexaColorSelected(color.hex);
        }}
      />
    </div>
  )
}

export default TeamCRUD;