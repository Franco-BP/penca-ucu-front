import * as React from 'react';
import { getWithResponseManage } from "../services/PencaUCUservices.js";
import { useContext, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PencaUCUContext, accionGetPrediccionData } from '../context/context';

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

const columns = [
    { field: 'pos', headerName: 'POS', width: 70, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Name', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'lastname', headerName: 'LastName', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'pts', headerName: 'PTS', type: 'number', width: 90, headerAlign: 'center', align: 'center' },
];

const UserRanking = () => {
    const { dispatch } = useContext(PencaUCUContext);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => { //funcion asincrona para traer los datos de la api
            try {
                const userDataResponse = await getWithResponseManage('/usuario/getAll');
                const predictionDataResponse = await getWithResponseManage('/prediccion/getAll');

                const userData = userDataResponse;
                const predictionData = predictionDataResponse;

                const rankingData = userData.map(user => ({
                    id: user.idUsuario,
                    name: user.nombre,
                    lastname: user.apellido,
                    pts: predictionData.filter(pred => pred.idUsuario === user.idUsuario).reduce((acc, pred) => acc + pred.puntos, 0) || 0 //sumar los puntos de todas las predicciones
                }));

                rankingData.sort((a, b) => b.pts - a.pts).forEach((user, index) => user.pos = index + 1); //ordenar por puntos y asignarle la pos
                setRows(rankingData.sort((a, b) => b.pts - a.pts));

                dispatch(accionGetPrediccionData(rankingData));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }

        };
        fetchData();
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 370, width: '32.5rem' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    components={{ Toolbar: GridToolbar }}
                    getRowId={(row) => row.id}
                    sx={{
                        boxShadow: 2,
                        border: 'none',
                        '& .MuiDataGrid-toolbarContainer': {
                            borderBottom: '1px solid #ccc',
                        },
                    }}
                />
            </div>
        </ThemeProvider>
    );
};

export default UserRanking;
