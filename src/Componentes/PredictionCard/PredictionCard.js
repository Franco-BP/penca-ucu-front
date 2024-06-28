import React, { useState, useContext } from 'react';
import { Card, Typography, Button, Box, TextField, CardMedia } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { PencaUCUContext, accionPostPrediccionData } from '../../context/Context';
import { postWithResponseManage } from "../../services/PencaUCUservices";
import CopaAmerica from '../../assets/copaAmerica.png';

const PredictionCard = () => {
    const { data, dispatch } = useContext(PencaUCUContext);
    const selectedPartido = data.selectedPartido; // funcion del contexto que trae el partido seleccionado en el carusel
    const equipo1 = selectedPartido?.equipos[0].equipo;
    const equipo2 = selectedPartido?.equipos[1].equipo;
    const equipo1Bandera = require(`../../assets/banderas/${equipo1?.imgBandera}`);
    const equipo2Bandera = require(`../../assets/banderas/${equipo2?.imgBandera}`);

    const [prediccionE1, setPrediccionE1] = useState(0);
    const [prediccionE2, setPrediccionE2] = useState(0);
    const usuarioData = data.usuarioData;

    const handleIncrement = (which) => {
        if (which === 'teamOne') setPrediccionE1(prev => prev < 99 ? prev + 1 : prev);
        else setPrediccionE2(prev => prev < 99 ? prev + 1 : prev);
    };

    const handleDecrement = (which) => {
        if (which === 'teamOne') setPrediccionE1(prev => prev > 0 ? prev - 1 : prev);
        else setPrediccionE2(prev => prev > 0 ? prev - 1 : prev);
    };

    const handleInputChange = (event, which) => {
        const value = Math.max(0, Math.min(99, Number(event.target.value)));
        if (which === 'teamOne') setPrediccionE1(value);
        else setPrediccionE2(value);
    };

    const handleSave = async () => {
        const predictionData = {
            prediccionEquipo1: prediccionE1,
            prediccionEquipo2: prediccionE2,
            partido: { idPartido: selectedPartido.idPartido },
            idUsuario: usuarioData.idUsuario, // cambiar por usuario logueado
            puntos: 0
        };
        const response = await postWithResponseManage('/prediccion/create', predictionData);
        dispatch(accionPostPrediccionData(response));
        alert('Predicción ingresada correctamente');
        setPrediccionE1(0);
        setPrediccionE2(0);
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: 2 ,width:'37rem',  border: '2px solid ', borderColor: '#1C285E', borderRadius:'1rem'}}>
            <Box
                sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    paddingY: '0.5rem',
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0 
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                    <CardMedia
                        sx={{ width: '5rem', height: '5rem' }}
                        component="img"
                        src={equipo1Bandera}
                        alt={equipo1.nombre}
                    />
                    <Typography sx={{ marginY: '0.5rem'}}>{equipo1.nombre}</Typography>
                </Box>
                <CardMedia
                    sx={{ width: '8rem', height: '8rem'}}
                    component="img"
                    src={CopaAmerica}
                    alt='imagen de la copa'
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                    <CardMedia
                        sx={{ width: '5rem', height: '5rem' }}
                        component="img"
                        src={equipo2Bandera}
                        alt={equipo2.nombre}
                    />
                    <Typography sx={{ marginY: '0.5rem' }}>{equipo2.nombre}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginY: 2 }}>
                <Button onClick={() => handleDecrement('teamOne')}><RemoveIcon /></Button>
                <TextField
                    type="number"
                    value={prediccionE1}
                    onChange={(e) => handleInputChange(e, 'teamOne')}
                    inputProps={{ min: 0, max: 99, style: { textAlign: 'center' } }}
                />
                <Button onClick={() => handleIncrement('teamOne')}><AddIcon /></Button>
                <Typography sx={{ mx: 2 }}>vs</Typography>
                <Button onClick={() => handleDecrement('teamTwo')}><RemoveIcon /></Button>
                <TextField
                    type="number"
                    value={prediccionE2}
                    onChange={(e) => handleInputChange(e, 'teamTwo')}
                    inputProps={{ min: 0, max: 99, style: { textAlign: 'center' } }}
                />
                <Button onClick={() => handleIncrement('teamTwo')}><AddIcon /></Button>
            </Box>
            <Button onClick={handleSave} variant="contained" color="primary">
                Guardar
            </Button>
        </Card>
    );
};

export default PredictionCard;
