import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getWithResponseManage } from '../services/PencaUCUservices';
import FormatDate from '../utils/FormatDate';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                },
                columnHeader: {
                    backgroundColor: '#1C285E',
                    color: 'white',
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

const partidoBoxStyle = { display:'flex', flexDirection:'row', alignContent:'center', alignItems:'center' };

const columns = [
    { field: 'fechaYHora', headerName: 'Fecha y Hora', flex: 1, headerAlign: 'center', align: 'center' },
    {
        field: 'partido',
        headerName: 'Partido',
        headerAlign: 'center',
        align: 'center',
        flex: 6,
        renderCell: (params) => {
            return (
                <Box sx={{ ...partidoBoxStyle }} gap={1}>
                    <Box sx={{ ...partidoBoxStyle, justifyContent: 'flex-end', width: '49%' }} gap={2}>
                        <span>{params.row.team1.nombre}</span>
                        <img src={require(`../assets/banderas/${params.row.team1.imgBandera}`)} alt={params.row.team1.nombre} style={{ width: 30, height: 30 }} />
                        <span>{params.row.team1.resultado}</span>
                    </Box>
                    <Box sx={{ ...partidoBoxStyle, justifyContent: 'center', width: '2%' }} >
                        <span>-</span>
                    </Box>
                    <Box sx={{ ...partidoBoxStyle, justifyContent: 'flex-start', width: '49%' }} gap={2}>
                        <span>{params.row.team2.resultado}</span>
                        <img src={require(`../assets/banderas/${params.row.team2.imgBandera}`)} alt={params.row.team2.nombre} style={{ width: 30, height: 30 }} />
                        <span>{params.row.team2.nombre}</span>
                    </Box>
                </Box>
            );
        },
    },
];

export default function Results() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getWithResponseManage('/partido/getAll');

            const partidoData = response.map(partido => {
                if (!partido.equipos || partido.equipos.length < 2) {
                    return null;
                }
                return {
                    id: partido.idPartido,
                    fechaYHora: FormatDate(partido.fecha),
                    team1: {
                        nombre: partido.equipos[0].equipo.nombre,
                        imgBandera: partido.equipos[0].equipo.imgBandera,
                        resultado: partido.equipos[0].resultado,
                    },
                    team2: {
                        nombre: partido.equipos[1].equipo.nombre,
                        imgBandera: partido.equipos[1].equipo.imgBandera,
                        resultado: partido.equipos[1].resultado,
                    },
                };
            }).filter(partido => partido !== null);

            setRows(partidoData);
        };

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 500, width: '90%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>
        </ThemeProvider>
    );
}
