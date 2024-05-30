import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
function Exception() {
  const navigate = useNavigate()
  function toHome() {
    navigate('/')
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="啊哦，好像发生了错误，快检查一下代码吧～"
      extra={
        <Button type="primary" onClick={toHome}>
          主页
        </Button>
      }
    />
  )
}
export default Exception
