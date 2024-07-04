import React, { useState, useContext, useEffect } from 'react';
import { Card, Typography, Button, Box, TextField, CardMedia } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { PencaUCUContext } from '../../context/Context';
import { getWithResponseManage, postWithResponseManage, putWithResponseManage } from "../../services/PencaUCUservices";
import CopaAmerica from '../../assets/copaAmerica.png';

const PredictionCard = () => {
    const { data } = useContext(PencaUCUContext);

    const [selectedPartido, setSelectedPartido] = useState();
    const [team1, setTeam1] = useState();
    const [team2, setTeam2] = useState();
    const [team1Flag, setTeam1Flag] = useState();
    const [team2Flag, setTeam2Flag] = useState();

    const [existingPrediction, setExistingPrediction] = useState({});

    const [prediccionE1, setPrediccionE1] = useState(0);
    const [prediccionE2, setPrediccionE2] = useState(0);
    const usuarioData = data.usuarioData;

    const handleIncrement = (which) => {
        if (which === 'teamOne') setPrediccionE1(prediccionE1 < 99 ? prediccionE1 + 1 : prediccionE1);
        else setPrediccionE2(prediccionE2 < 99 ? prediccionE2 + 1 : prediccionE2);
    };
    
    const handleDecrement = (which) => {
        if (which === 'teamOne') setPrediccionE1(prediccionE1 > 0 ? prediccionE1 - 1 : prediccionE1);
        else setPrediccionE2(prediccionE2 > 0 ? prediccionE2 - 1 : prediccionE2);
    };

    const handleInputChange = (event, which) => {
        const value = Math.max(0, Math.min(99, Number(event.target.value)));
        if (which === 'teamOne') setPrediccionE1(value);
        else setPrediccionE2(value);
    };

    const handleSave = async () => {
        const predictionData = {
            idPrediccion: existingPrediction?.idPrediccion ? existingPrediction.idPrediccion : null,
            prediccionEquipo1: prediccionE1,
            prediccionEquipo2: prediccionE2,
            partido: { idPartido: selectedPartido.idPartido },
            idUsuario: usuarioData.idUsuario, // cambiar por usuario logueado
            puntos: 0
        };

        if(predictionData.idPrediccion) {
            await putWithResponseManage('/prediccion/update', predictionData);
        } else {
            await postWithResponseManage('/prediccion/create', predictionData);
        };
        alert('Predicción ingresada correctamente');
    };

    useEffect(() => {
        setSelectedPartido(data.selectedPartido); // funcion del contexto que trae el partido seleccionado en el carusel
    }, [data.selectedPartido]);

    useEffect(() => {
        setTeam1(selectedPartido?.equipos[0].tipoEquipo === 1 ? selectedPartido?.equipos[0].equipo : selectedPartido?.equipos[1].equipo);
        setTeam2(selectedPartido?.equipos[0].tipoEquipo === 2 ? selectedPartido?.equipos[0].equipo : selectedPartido?.equipos[1].equipo);
    }, [selectedPartido]);
    
    useEffect(() => {
        if (team1 && team2) {
            setTeam1Flag(require(`../../assets/banderas/${team1?.imgBandera}`));
            setTeam2Flag(require(`../../assets/banderas/${team2?.imgBandera}`));
        };
    }, [team1, team2]);
    
    useEffect(() => {
        if (data.usuarioData?.idUsuario) {
            getWithResponseManage(`/prediccion/getAllByUsuario/${data.usuarioData.idUsuario}`)
                .then((response) => {
                    if (response[0]) {
                        let filteredPrediction = response.filter(element => element.partido?.idPartido === selectedPartido?.idPartido);
                        setExistingPrediction(filteredPrediction[0]);
                        if (filteredPrediction[0]) {
                            setPrediccionE1(filteredPrediction[0].prediccionEquipo1);
                            setPrediccionE2(filteredPrediction[0].prediccionEquipo2);
                        } else {
                            setPrediccionE1(0);
                            setPrediccionE2(0);
                        }
                    }
                });
        };
    }, [data.usuarioData, selectedPartido]);

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: 2 ,width:'37rem',  border: '2px solid ', backgroundColor:'#F8F8F8', borderColor: '#1C285E', borderRadius:'1rem'}}>
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
                        src={team1Flag ? team1Flag : ""}
                        alt={team1?.nombre}
                    />
                    <Typography sx={{ marginY: '0.5rem'}}>{team1?.nombre}</Typography>
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
                        src={team2Flag ? team2Flag : ""}
                        alt={team2?.nombre}
                    />
                    <Typography sx={{ marginY: '0.5rem' }}>{team2?.nombre}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginY: 2 }}>
                <Button onClick={() => handleDecrement('teamOne')}><RemoveIcon /></Button>
                <TextField
                    type="number"
                    value={prediccionE1 ? prediccionE1 : 0}
                    onChange={(e) => handleInputChange(e, 'teamOne')}
                    inputProps={{ min: 0, max: 99, style: { textAlign: 'center' } }}
                />
                <Button onClick={() => handleIncrement('teamOne')}><AddIcon /></Button>
                <Typography sx={{ mx: 2 }}>vs</Typography>
                <Button onClick={() => handleDecrement('teamTwo')}><RemoveIcon /></Button>
                <TextField
                    type="number"
                    value={prediccionE2 ? prediccionE2 : 0}
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
