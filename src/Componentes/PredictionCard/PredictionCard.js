import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import { postWithResponseManage } from "../../services/PencaUCUservices.js";
import { PencaUCUContext } from '../../context/context.js';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import copaAmericaLogo from '../../assets/copaAmerica.png';
import { styled } from '@mui/system';
import MatchCard from '../MatchCard.js';

export default function PredictionCard({ match }) {

    const { state } = useContext(PencaUCUContext);
    //const { partidoData } = state;

    const [prediccionE1, setPrediccionE1] = useState(0);
    const [prediccionE2, setPrediccionE2] = useState(0);

    const handleIncrement = (which) => {
        if (which === 'teamOne' && prediccionE1 < 99) setPrediccionE1(prev => prev + 1);
        else if (which === 'teamTwo' && prediccionE2 < 99) setPrediccionE2(prev => prev + 1);
    };

    const handleDecrement = (which) => {
        if (which === 'teamOne' && prediccionE1 > 0) setPrediccionE1(prev => prev - 1);
        else if (which === 'teamTwo' && prediccionE2 > 0) setPrediccionE2(prev => prev - 1);
    };

    const handleInputChange = (event, which) => {
        const value = Math.max(0, Math.min(99, Number(event.target.value)));
        if (which === 'teamOne') setPrediccionE1(value);
        else setPrediccionE2(value);
    };


    const handleSave = () => {
        const predictionData = {
            prediccion_equipo1: prediccionE1,
            prediccion_equipo2: prediccionE2,
            ganador: { id_equipo: prediccionE1 > prediccionE2 ? 1 : 2 },
            partido: { id_partido: 2 },
            id_usuario: 1
        };

        /* postWithResponseManage('/prediccion/create', predictionData)
            .then((response) => {
                dispatch(accionPostPrediccionData(response));
            }); */
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="" alt="" style={{ width: 60, height: 60, marginRight: 2 }} />
                <Typography variant="h6" color="text.primary">Jeje</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => handleDecrement('teamOne')}>
                    <RemoveIcon />
                </Button>
                <TextField
                    type="number"
                    value={prediccionE1}
                    onChange={(e) => handleInputChange(e, 'teamOne')}
                    inputProps={{ min: 0, max: 99, style: { textAlign: 'center' } }}
                />
                <Button onClick={() => handleIncrement('teamOne')}>
                    <AddIcon />
                </Button>
            </Box>
            <img src={copaAmericaLogo} alt="Copa America" style={{ width: 80, height: 80 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => handleDecrement('teamTwo')}>
                    <RemoveIcon />
                </Button>
                <TextField
                    type="number"
                    value={prediccionE2}
                    onChange={(e) => handleInputChange(e, 'teamTwo')}
                    inputProps={{ min: 0, max: 99, style: { textAlign: 'center' } }}
                />
                <Button onClick={() => handleIncrement('teamTwo')}>
                    <AddIcon />
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" color="text.primary">Jeje</Typography>
                <img src="" alt="" style={{ width: 60, height: 60, marginLeft: 2 }} />
            </Box>
            <Button onClick={handleSave} variant="contained" color="primary">
                Guardar
            </Button>
        </Card>

    );
}

