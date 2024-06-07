import React from 'react'
import styles from './styles/index.module.less'
import StatusPie from './status-pie'
import MonthPie from './month-pie'
import ScheduleLine from './schedule-line'

function Statics() {
  return (
    <div>
      <div className={styles.pieContainer}>
        <div className={styles.status}><StatusPie /></div>
        <div className={styles.days}> <MonthPie /></div>
      </div>
      
      <div>
        <ScheduleLine />
      </div>
    </div>
  )
}

export default Statics
