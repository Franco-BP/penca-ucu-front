
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getWithResponseManage } from "../services/PencaUCUservices.js";

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
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
    { field: 'prediccion', headerName: 'Predicción', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'puntos', headerName: 'Puntos', type: 'number', width: 90, headerAlign: 'center', align: 'center' },
    { field: 'fecha', headerName: 'Fecha', width: 180, headerAlign: 'center', align: 'center' }
];

const UserPredictions = ({ userId }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
       // if (!userId) {
        
       //console.error('userId is undefined');
         //   return;
        //}

        const fetchData = async () => {
            try {
                console.log('Fetching data for user ID:', userId);
                const predictionDataResponse = await getWithResponseManage(`/prediccion/getAll/`);

                
                if (Array.isArray(predictionDataResponse)) {
                    const formattedData = predictionDataResponse.map(pred => ({
                        id: pred.idPrediccion,
                        prediccion: pred.descripcion,
                        puntos: pred.puntos,
                        fecha: new Date(pred.fecha).toLocaleDateString()
                    }));

                    setRows(formattedData);
                    console.log('Formatted data:', formattedData);
                } else {
                    console.error('Prediction data is not an array:', predictionDataResponse);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 370, width: '50.5rem' }}>
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

export default UserPredictions;
