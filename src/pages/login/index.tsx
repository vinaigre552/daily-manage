import React from 'react'
import LoginForm from './form'
import LoginDisplay from './display'
import styles from './style/login.module.less'
import { Layout } from 'antd'
const { Sider, Content } = Layout


export default function Login() {
  return (
    <div className={styles['login-page']}>
      <Layout>
        <Sider width='300px' className={styles['display']}>
          <LoginDisplay></LoginDisplay>
        </Sider>
        <Content className={styles['login-form']}>
          <LoginForm></LoginForm>
        </Content>
      </Layout>
    </div>
  )
}
