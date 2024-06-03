import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from "antd";
import styles from './styles/index.module.less'


function HeaderLine(props) {
  const {collapsed, setCollapsed, breadItems} = props

  return (
    <div className={styles['header-position']}>
      <Button 
        type='text'
        icon={collapsed? <MenuFoldOutlined/> : <MenuUnfoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <Breadcrumb items={breadItems}/>
    </div>
  )
}

export default HeaderLine