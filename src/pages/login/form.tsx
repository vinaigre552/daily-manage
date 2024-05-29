import React from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input, Checkbox } from 'antd'
import styles from './style/login.module.less'

type FieldType = {
  username?: string
  password?: string
  remember?: boolean
}

const defaultUser = {
  username: 'admin',
  password: '12345',
  remember: true
}
const onLogin: FormProps<FieldType>['onFinish'] = (values) => {
  console.log(values)
}

export default function LoginForm() {
  return (
    <div className={styles['login-div']}>
      <Form name='login' initialValues={{...defaultUser}} labelCol= {{span: 20, offset: 1}} wrapperCol={{span: 20, offset: 2}} layout='vertical' onFinish={onLogin}>
        <Form.Item<FieldType> label="用户名" name="username" rules={[{required: true, message:'请输入用户名'}]}>
          <Input placeholder='请输入用户名'></Input>
        </Form.Item>
        <Form.Item<FieldType> label="密码" name="password" rules={[{required: true, message:'请输入密码'}]}>
          <Input.Password placeholder='请输入密码'/>
        </Form.Item>
        <Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{offset:10, span: 16}}>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{offset:4, span: 16}}>
          <Button type='primary' htmlType='submit'>登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
