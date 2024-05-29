import React from 'react'
import styles from './style/login.module.less'
import { Carousel } from 'antd'
import firstPic from '../../assets/1.jpg'
import secondPic from '../../assets/2.jpg'
import thirdPic from '../../assets/3.jpg'
import forthPic from '../../assets/4.jpg'

export default function LoginDisplay() {
  return (
    <div className={styles['carousel-div']}>
      <Carousel arrows infinite={true} dots={false} autoplay>
        <div>
          <img src={firstPic} className={styles['carousel']}></img>
        </div>
        <div>
        <img src={secondPic} className={styles['carousel']}></img>
        </div>
        <div>
        <img src={thirdPic} className={styles['carousel']}></img>
        </div>
        <div>
        <img src={forthPic} className={styles['carousel']}></img>
        </div>
      </Carousel>
    </div>
  )
}
