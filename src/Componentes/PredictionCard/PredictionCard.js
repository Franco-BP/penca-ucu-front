import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, TextField } from '@mui/material';
import PredictionInput from './PredictionInput.js';
import copaAmericaLogo from '../../assets/copaAmerica.png';
import argentina from '../../assets/argentina.png';
import brasil from '../../assets/brasil.png';
import { postWithResponseManage } from "../../services/PencaUCUservices.js";

export default function MatchCard() {
    const handleSave = () => {
        // Datos a enviar
        const predictionData = {
            userId: 1, // Suponiendo que tengas un ID de usuario
            matchId: 123, // ID del partido
            predictedScore: score
        };

        axios.post('https://yourapi.com/predictions', predictionData)
            .then(response => {
                console.log('Guardado exitosamente:', response.data);
                // Implementa aquí cualquier acción después de guardar con éxito
            })
            .catch(error => {
                console.error('Error al guardar la predicción:', error);
                // Implementa aquí el manejo de errores
            });
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={argentina} alt="Argentina" style={{ width: 50, height: 30, marginRight: 2 }} />
                <Typography variant="h6" color="text.primary">Argentina</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PredictionInput />
                <img src={copaAmericaLogo} alt="CopaAmerica" style={{ width: 150, height: 130, marginLeft: 2 }} />
                <PredictionInput />

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" color="text.primary">Brasil</Typography>
                <img src={brasil} alt="Brasil" style={{ width: 50, height: 30, marginLeft: 2 }} />
            </Box>
            <Button onClick={handleSave} variant="contained" color="primary">
                Guardar
            </Button>
        </Card>

    );
}

