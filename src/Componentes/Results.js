import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PencaUCUContext, accionGetPartidoData } from '../context/context';
import { getWithResponseManage } from '../services/PencaUCUservices';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fechaYHora', headerName: 'Fecha y Hora', width: 130 },
    { field: 'partido', headerName: 'Partido', width: 200 },
];

export default function Results() {
    const { data, dispatch } = useContext(PencaUCUContext);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await getWithResponseManage('/partido/getAll');
                if (!response || !Array.isArray(response)) {
                    setError('No data returned from the server');
                    return;
                }

                const partidoData = response.map(partido => {
                    if (!partido.equipos || partido.equipos.length < 2) {
                        return null;
                    }
                    return {
                        id: partido.idPartido,
                        fechaYHora: partido.fecha,
                        partido: `${partido.equipos[0].equipo.nombre} ${partido.equipos[0].equipo.imgBandera} vs ${partido.equipos[1].equipo.nombre} ${partido.equipos[1].equipo.imgBandera}`
                    };
                }).filter(partido => partido !== null);

                setRows(partidoData);
                dispatch(accionGetPartidoData(partidoData));
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </div>
    );
}
