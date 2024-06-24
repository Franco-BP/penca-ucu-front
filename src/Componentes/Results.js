import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PencaUCUContext, accionGetPartidoData } from '../context/context';
import { getWithResponseManage } from '../services/PencaUCUservices';
import formatDate from '../utils/formatDate';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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

const columns = [
  { field: 'fechaYHora', headerName: 'Fecha y Hora', flex: 1, headerAlign: 'center', align: 'center'},
  {
    field: 'partido',
    headerName: 'Partido',
    headerAlign: 'center',
    align: 'center',
    flex: 6,
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span>{params.row.team1.nombre}</span>
          <img src={require(`../assets/Banderas/${params.row.team1.imgBandera}`)} alt={params.row.team1.nombre} style={{ width: 45, height: 45 }} />
          <span>{params.row.team1.resultado}</span>
          <span>vs</span>
          <span>{params.row.team2.resultado}</span>
          <img src={require(`../assets/Banderas/${params.row.team2.imgBandera}`)} alt={params.row.team2.nombre} style={{ width: 45, height: 45 }} />
          <span>{params.row.team2.nombre}</span>
        </div>
      );
    },
  },
];

export default function Results() {
  const { data, dispatch } = useContext(PencaUCUContext);
  const [rows, setRows] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      dispatch(accionGetPartidoData(partidoData));
    };

    fetchData();
  }, [dispatch]);

  const adjustedColumns = isMobile
    ? [
        { field: 'fechaYHora', headerName: 'Fecha y Hora', flex: 1, headerAlign: 'center', align: 'center' },
        {
          field: 'partido',
          headerName: 'Partido',
          headerAlign: 'center',
          align: 'center',
          flex: 2,
          renderCell: (params) => (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <span>{params.row.team1.nombre}</span>
              <img src={require(`../assets/Banderas/${params.row.team1.imgBandera}`)} alt={params.row.team1.nombre} style={{ width: 30, height: 30 }} />
              <span>{params.row.team1.resultado}</span>
              <span>vs</span>
              <span>{params.row.team2.resultado}</span>
              <img src={require(`../assets/Banderas/${params.row.team2.imgBandera}`)} alt={params.row.team2.nombre} style={{ width: 30, height: 30 }} />
              <span>{params.row.team2.nombre}</span>
            </div>
          ),
        },
      ]
    : columns;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={adjustedColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </ThemeProvider>
  );
}
