import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { PencaUCUContext, accionGetEstadisticaData } from '../context/context';
import { getWithResponseManage } from '../services/PencaUCUservices';
import { useContext,useState } from 'react';

// Registrar los componentes de ECharts
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

const Statistic = () => {
  const chartRef = useRef(null);
  const {data, dispatch } = useContext(PencaUCUContext);
  const [rows, setRows] = useState([]);

  const estadistica= data.estadisticaData;
  const selectedPartido=data.selectedPartido;

  useEffect(() => {
   const statisticDataResponse = getWithResponseManage(`/prediccion/getEstadistica/${selectedPartido.idPartido}`)
    
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const estadisticData = statisticDataResponse;
    
    const statiticData = {
      empate: estadisticData.empate,
      equipo1: estadisticData.equipo1,
      equpo2: estadisticData.equipo2,

  };


    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '70%'],
          // Ajustar el ángulo de inicio y fin
          startAngle: 180,
          endAngle: 360,
          data: statiticData
            
          
        }
      ]
    };

    // Establecer la opción del gráfico
    myChart.setOption(option);

    // Limpieza del gráfico cuando el componente se desmonte
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
  );
};

export default Statistic;
