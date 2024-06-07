import React from "react"
import { piePatternDst } from "./pie-src"
import Pie from "./pie"

const piePatternImg = new Image()
piePatternImg.src = piePatternDst

const data = [
  { value: 100, name: '一月' },
  { value: 76, name: '二月' },
  { value: 10, name: '三月' },
  { value: 48, name: '四月' },
  { value: 19, name: '五月' },
  { value: 58, name: '六月' },
  { value: 76, name: '七月' },
  { value: 20, name: '八月' },
  { value: 48, name: '九月' },
  { value: 15, name: '十月' },
  { value: 10, name: '十一月' },
  { value: 13, name: '十二月' }
]


function MonthPie() {
  return <Pie title='每月日程' data={data} image={piePatternImg}/>
}

export default MonthPie