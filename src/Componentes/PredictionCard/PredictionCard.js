import React, { useState, useContext } from 'react';
import { Card, Typography, Button, Box, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { PencaUCUContext, accionPostPrediccionData, accionSetSelectedPartido } from '../../context/context';
import { postWithResponseManage } from "../../services/PencaUCUservices";
import MatchCard from '../MatchCard';

const PredictionCard = () => {
    const { data, dispatch } = useContext(PencaUCUContext);
    const selectedPartido = data.selectedPartido; // funcion del contexto que trae el partido seleccionado en el carusel

    const [prediccionE1, setPrediccionE1] = useState(0);
    const [prediccionE2, setPrediccionE2] = useState(0);

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
            idUsuario: 1, // cambiar por usuario logueado
            puntos: 0
        };
        const response = await postWithResponseManage('/prediccion/create', predictionData);
        dispatch(accionPostPrediccionData(response));
        alert('Predicción ingresada correctamente');
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: 2 ,width:'40%',  border: '2px solid ', borderColor: '#1C285E', borderRadius:'1rem'}}>
            <MatchCard partido={selectedPartido} />
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
