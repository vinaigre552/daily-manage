import React from 'react'
import * as echarts from 'echarts'
import 'echarts/lib/chart/pie'
import ReactEcharts from 'echarts-for-react'

interface dataItem {
  value: number
  name: string
}

interface propsType {
  title: string,
  data: dataItem[],
  image: HTMLImageElement
}

type EChartsOption = echarts.EChartsOption

function getOption (title:string, data:dataItem[], image:HTMLImageElement):EChartsOption{
  const option: EChartsOption = {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#235894'
      }
    },
    tooltip: {
      formatter: '{b}: {c} ({d}%)'
    },
    series: [
      {
        name: 'pie',
        type: 'pie',
        top: 20,
        selectedMode: 'single',
        selectedOffset: 30,
        clockwise: true,
        label: {
          fontSize: 18,
          color: '#235894'
        },
        labelLine: {
          lineStyle: {
            color: '#235894'
          }
        },
        data: data,
        itemStyle: {
          opacity: 0.7,
          color: {
            image: image,
            repeat: 'repeat'
          },
          borderWidth: 3,
          borderColor: '#235894'
        }
      }
    ]
  }

  return option
}


function Pie(props:propsType) {
  const {title, data, image} = props
  return <ReactEcharts option={getOption(title, data, image)} />
}

export default Pie
