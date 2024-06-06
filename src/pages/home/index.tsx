import React from 'react'
import { QRCode } from 'antd'
import styles from './styles/index.module.less'
function Home() {
  return (
    <div className={styles.container}>
      <span>欢迎来到日程管理～🎉🎉</span>
      <QRCode
        value="https://u.wechat.com/MAnfHkjv93fQ7hVoLquxqQc?s=0"
        color="rgba(4, 82, 160, 0.8)"
        icon="https://i.ibb.co/5MLBTVj/2024-06-06-14-43-31.png"
        className={styles.qrcode}
      />
    </div>
  )
}

export default Home
