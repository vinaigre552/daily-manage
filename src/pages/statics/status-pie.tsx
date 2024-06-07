import React from 'react'
import { piePatternSrc } from './pie-src'
import Pie from './pie'

const data = [
  { value: 100, name: '进行中' },
  { value: 76, name: '已完成' },
  { value: 10, name: '暂停' },
  { value: 48, name: '过期未完成' }
]

const piePatternImg = new Image()
piePatternImg.src = piePatternSrc



function StatusPie() {
  return <Pie title='完成请况' data={data} image={piePatternImg}/>
}

export default StatusPie
