import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PencaUCUContext, accionGetPartidoData } from '../context/context';
import { getWithResponseManage } from '../services/PencaUCUservices';
import formatDate from '../utils/formatDate';

const columns = [
    { field: 'fechaYHora', headerName: 'Fecha y Hora', width: 130 },
    {
        field: 'partido',
        headerName: 'Partido',
        headerAlign: 'center',
        align: 'center',
        width: 300,
        renderCell: (params) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>{params.row.team1.nombre}</span>
                <img src={require(`../assets/banderas/${params.row.team1.imgBandera}`)} alt={params.row.team1.nombre} style={{ width: 30, height: 30 }} />
                <span>{params.row.team1.resultado}</span>
                <span>vs</span>
                <span>{params.row.team2.resultado}</span>
                <img src={require(`../assets/banderas/${params.row.team2.imgBandera}`)} alt={params.row.team2.nombre} style={{ width: 30, height: 30 }} />
                <span>{params.row.team2.nombre}</span>
            </div>
        )
    }
];

export default function Results() {
    const { data, dispatch } = useContext(PencaUCUContext);
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
                    fechaYHora: formatDate(partido.fecha),
                    team1: {
                        nombre: partido.equipos[0].equipo.nombre,
                        imgBandera: partido.equipos[0].equipo.imgBandera,
                        resultado: partido.equipos[0].resultado
                    },
                    team2: {
                        nombre: partido.equipos[1].equipo.nombre,
                        imgBandera: partido.equipos[1].equipo.imgBandera,
                        resultado: partido.equipos[1].resultado
                    }
                };
            }).filter(partido => partido !== null);

            setRows(partidoData);
            dispatch(accionGetPartidoData(partidoData));
        };

        fetchData();
    }, [dispatch]);

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
