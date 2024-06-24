import * as React from 'react';
import { getWithResponseManage } from "../services/PencaUCUservices.js";
import { useContext, useEffect } from 'react';
import { PencaUCUContext, accionGetTorneoData } from '../context/context.js';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Creación de un tema personalizado
const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                },
                columnHeader: {
                    backgroundColor: '#1E3D75',
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
    { field: 'name', headerName: 'Name', width: 180, headerAlign: 'center', align: 'left' },
    { field: 'lastname', headerName: 'LastName', width: 180, headerAlign: 'center', align: 'left' },
    { field: 'pts', headerName: 'PTS', type: 'number', width: 90, headerAlign: 'center', align: 'center' },
];

const rows = [
    { id: 1, pos: 1, name: "Enzo", lastname: "Aparicio", pts: 27 },
    { id: 2, pos: 2, name: "Franco", lastname: "Bascialla", pts: 23 },
    { id: 3, pos: 3, name: "Yazmin", lastname: "Espagnolo", pts: 21 },
    { id: 4, pos: 4, name: "Giorgio", lastname: "Santi", pts: 19 },
    { id: 5, pos: 5, name: "Nicolas", lastname: "Hernandez", pts: 17 }
];

const UserRanking = () => {

    const { data, dispatch } = useContext(PencaUCUContext);

    /*     const calcularPuntos = (prediccion) => {
        }; */

    useEffect(() => {
        getWithResponseManage('/usuario/getAll')
            .then((response) => {
                // Suponiendo que la respuesta es un arreglo de objetos con nombre y apellido
                const users = response.map(user => ({
                    nombre: user.nombre,
                    apellido: user.apellido
                }));
                dispatch(accionGetTorneoData(users));
            })
    }, []);
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
}

export default UserRanking;
