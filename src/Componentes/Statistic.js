import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout } from 'echarts/features';
import { getWithResponseManage } from '../services/PencaUCUservices';

// Registrar los componentes de ECharts
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

const createOptions = ({stats, team1, team2}) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Partido Stats',
        type: 'pie',
        radius: ['1%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'left'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: stats.empate, name: 'Empate', itemStyle: { color: '#808080' } }, // Gris
          { value: stats.equipo1, name: team1.nombre, itemStyle: { color: team1.color } }, // Celeste
          { value: stats.equipo2, name: team2.nombre, itemStyle: { color: team2.color } } // Amarillo
        ]
      }
    ]
  };
};

const Statistic = ( {match} ) => {
  const chartRef = useRef(null);
  const team1 = match?.equipos[0].tipoEquipo === 1 ? match?.equipos[0].equipo : match?.equipos[1].equipo;
  const team2 = match?.equipos[0].tipoEquipo === 2 ? match?.equipos[0].equipo : match?.equipos[1].equipo;

  useEffect(() => {
      if (match) {
        getWithResponseManage(`/prediccion/getEstadistica/${match.idPartido}`)
        .then((response) => {
          // Check that there is existing predictions. If not, backend returns 0, 0, 0 for %.
          if (response.empate + response.equipo1 + response.equipo2 < 90) {
            response = {empate: 34, equipo1: 33, equipo2: 33};
          }
          const chartInstance = echarts.init(chartRef.current);

          const option = createOptions({stats: response, team1: team1, team2: team2});

          chartInstance.setOption(option);

          return () => {
            chartInstance.dispose();
          };
        });
      };
    }, [match, team1, team2]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '300px', margin: 0, padding: 0}}></div>
  );
};

export default Statistic;
