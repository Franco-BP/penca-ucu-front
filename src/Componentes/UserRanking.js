import React, { useEffect, useState, useContext } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PencaUCUContext, accionGetPrediccionData } from '../context/context';
import { getWithResponseManage } from "../services/PencaUCUservices";

const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                },
                columnHeader: {
                    backgroundColor: '#1E3D75',
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
        const fetchData = async () => {
            try {
                const userDataResponse = await getWithResponseManage('/usuario/getAll');
                const predictionDataResponse = await getWithResponseManage('/prediccion/getAll');

                console.log('User Data Response:', userDataResponse);
                console.log('Prediction Data Response:', predictionDataResponse);


                // Ensure both responses contain data before proceeding
                if (!userDataResponse || !predictionDataResponse) {
                    console.error('Data missing from responses');
                    return; // Stop execution if data is missing
                }

                const userData = userDataResponse;
                const predictionData = predictionDataResponse;

                // Map to accumulate points by user ID
                const pointsMap = predictionData.reduce((acc, pred) => {
                    acc[pred.idUsuario] = (acc[pred.idUsuario] || 0) + pred.puntos;
                    return acc;
                }, {});

                // Map userData to include points
                const rankingData = userData.map(user => ({
                    id: user.idUsuario,
                    name: user.nombre,
                    lastname: user.apellido,
                    pts: pointsMap[user.idUsuario] || 0 // Use points from map or default to 0
                }));

                setRows(rankingData.sort((a, b) => b.pts - a.pts)); // Sort by points descending
                dispatch(accionGetPrediccionData(rankingData));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }

        };
        fetchData();
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: '100%' }}>
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
                        border: 2,
                        borderColor: 'primary.light',
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
