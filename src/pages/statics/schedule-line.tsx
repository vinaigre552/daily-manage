import React from 'react'
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'

type EChartsOption = echarts.EChartsOption
const data:(number | string)[][]  = [
  ['2024-05-01', 20],
  ['2024-05-03', 44],
  ['2024-05-10', 10],
  ['2024-05-13', 30],
  ['2024-05-22', 60],
  ['2024-05-30', 40],
  ['2024-06-01', 22],
  ['2024-06-03', 15]
]
const dateList: (number | string)[] = data.map((item) => item[0])
const valueList: (number | string)[] = data.map((item) => item[1])

const option: EChartsOption = {
  title: {
    text: '日程统计',
    textStyle: {
      color: '#235894'
    },
    left: 'center'
  },
  tooltip: {},
  xAxis: {
    data: dateList
  },
  yAxis: {},
  series: [
    {
      type: 'line',
      data: valueList,
      lineStyle: {
        width: 3,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color:'#34A3E5'
            },
            {
              offset: 1,
              color: '#934CD5'
            }
          ]
        }
      }
    }
  ]
}

function ScheduleLine() {
  return <ReactEcharts option={option} />
}

export default ScheduleLine
