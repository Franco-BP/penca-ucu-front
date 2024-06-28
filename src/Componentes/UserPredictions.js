import { useContext, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getWithResponseManage } from "../services/PencaUCUservices.js";
import { PencaUCUContext } from '../context/Context.js';
import { Box, CardMedia, Grid, Typography } from '@mui/material';
import FLAGS from '../context/LocalData.js';
import CopaAmerica from '../assets/copaAmerica.png';

const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                },
                columnHeader: {
                    backgroundColor: '#1C285E',
                    color: 'white'
                },
                row: {
                    backgroundColor: '#f7f7f7',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                },
                cell: {
                    borderBottom: '1px solid #ccc',
                },
            },
        },
    },
});

const flagsMap = new Map(
    FLAGS.map(flag => [flag, require(`../assets/banderas/${flag}`)])
);

const columns = [
    {
        field: 'resultado', headerName: 'Resultado', width: 200, headerAlign: 'center', align: 'center',
        renderCell: (params) => {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: '100%' }}>
                    <CardMedia
                        sx={{ width: '2rem', height: '2rem' }}
                        component="img"
                        src={flagsMap.get(params.row.partido.equipos[0].equipo.imgBandera)}
                        alt={params.row.partido.equipos[0].equipo.nombre}
                    />
                    <Typography>{
                        params.row.partido.equipos[0].resultado ? params.row.partido.equipos[0].resultado : "X"
                    }</Typography>
                    <Typography> - </Typography>
                    <Typography>{
                        params.row.partido.equipos[1].resultado ? params.row.partido.equipos[1].resultado : "X"
                    }</Typography>
                    <CardMedia
                        sx={{ width: '2rem', height: '2rem' }}
                        component="img"
                        src={flagsMap.get(params.row.partido.equipos[1].equipo.imgBandera)}
                        alt={params.row.partido.equipos[1].equipo.nombre}
                    />
                </Box>
            )
        }
    },
    {
        field: 'prediccion', headerName: 'Mi Prediccion', width: 200, headerAlign: 'center', align: 'center',
        renderCell: (params) => {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: '100%' }}>
                    <CardMedia
                        sx={{ width: '2rem', height: '2rem' }}
                        component="img"
                        src={flagsMap.get(params.row.partido.equipos[0].equipo.imgBandera)}
                        alt={params.row.partido.equipos[0].equipo.nombre}
                    />
                    <Typography>{
                        params.row.prediccion.prediccionEquipo1 ? params.row.prediccion.prediccionEquipo1 : "X"
                    }</Typography>
                    <Typography> - </Typography>
                    <Typography>{
                        params.row.prediccion.prediccionEquipo2 ? params.row.prediccion.prediccionEquipo2 : "X"
                    }</Typography>
                    <CardMedia
                        sx={{ width: '2rem', height: '2rem' }}
                        component="img"
                        src={flagsMap.get(params.row.partido.equipos[1].equipo.imgBandera)}
                        alt={params.row.partido.equipos[1].equipo.nombre}
                    />
                </Box>
            )
        }
    },
    { field: 'puntos', headerName: 'PTS', width: 200, headerAlign: 'center', align: 'center' },
    { field: '', headerName: '', width: 400, headerAlign: 'center', align: 'center' }
];

const UserPredictions = () => {
    const { data } = useContext(PencaUCUContext);

    const [rows, setRows] = useState([]);

    const userId = data.usuarioData?.idUsuario;

    useEffect(() => {
        if (!userId) {
            console.error('userId is undefined');
            return;
        }

        const fetchData = async () => {
            try {
                getWithResponseManage(`/prediccion/getAllByUsuario/${userId}`)
                    .then((response) => {
                        if (response[0]) {
                            const formattedData = response.map(pred => ({
                                id: pred.idPrediccion,
                                prediccion: pred,
                                partido: pred.partido,
                                puntos: pred.puntos
                            }));
                            setRows(formattedData);
                        }
                    });



            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Grid item xs={12} sm={6} md={6} sx={{ height: 370 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        components={{ Toolbar: GridToolbar }}
                        getRowId={(row) => row.id}
                        sx={{
                            marginX: '3rem',
                            boxShadow: 2,
                            border: 'none',
                            '& .MuiDataGrid-toolbarContainer': {
                                borderBottom: '1px solid #ccc',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                >
                    <CardMedia
                        sx={{ width: '12rem', height: '12rem' }}
                        component='img'
                        src='https://cdn-icons-png.flaticon.com/512/4794/4794936.png'
                        alt="Avatar"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>
                        <Typography><b>Usuario:</b> {data.usuarioData.email}</Typography>
                        <Typography><b>Nombre:</b> {data.usuarioData.nombre}</Typography>
                        <Typography><b>Apellido:</b> {data.usuarioData.apellido}</Typography>
                        <Typography><b>Carrera:</b> {data.usuarioData.carrera.nombre}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center' }}
                >
                    <CardMedia
                        sx={{ width: '20rem', height: '20rem' }}
                        component="img"
                        src={CopaAmerica}
                        alt='imagen de la copa'
                    />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default UserPredictions;
