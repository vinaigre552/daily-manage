import React from "react"
import styles from './styles/index.module.less'
import {useAppSelector}  from '../store/hooks'

function UserDisplay() {
  const username = useAppSelector(state => state.user.name)
  const titleList = [
    '开启新的一天吧！',
    '加油!',
    '今天任务完成了吗',
    '要到deadline啦～'
  ]
  return (
    <div className={styles['user-container']}>
      <img src={require('../assets/1.jpg')} className={styles['avatar']}/>
      <div className={styles['user-info']}>
        <span>{titleList[Math.floor(Math.random()*4)]}</span>
        <span className={styles['username']}>{username}</span>
      </div>
    </div>
  )
}

export default UserDisplay