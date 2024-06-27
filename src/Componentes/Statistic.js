import React, { useEffect, useRef, useContext, useState } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout } from 'echarts/features';
import { PencaUCUContext, accionGetStatisticData } from '../context/context';
import { getWithResponseManage } from '../services/PencaUCUservices';

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
  const { data, dispatch } = useContext(PencaUCUContext);
  const selectedPartido = data.selectedPartido;

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPartido && selectedPartido.idPartido) {
        const response = await getWithResponseManage(`/prediccion/getEstadistica/${selectedPartido.idPartido}`);
        if (response) {
          dispatch(accionGetStatisticData(response));

          const chartInstance = echarts.init(chartRef.current);

          const option = {
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
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
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
                  { value: response.empate, name: 'Empate' },
                  { value: response.equipo1, name: 'Equipo 1' },
                  { value: response.equipo2, name: 'Equipo 2' }
                ]
              }
            ]
          };

          chartInstance.setOption(option);

          return () => {
            chartInstance.dispose();
          };
        }
      }
    };

    fetchData();
  }, [dispatch, selectedPartido]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
  );
};

export default Statistic;
