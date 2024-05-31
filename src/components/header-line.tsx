import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from "antd";

function getBreadcrumb(routes) {
  return routes.map(
    route => route.breadcrumbName = route.name
  )
}

function HeaderLine(props) {
  const {collapsed, setCollapsed} = props
  const bread = getBreadcrumb(props.routes)
  return (
    <div>
      <Button 
        type='text'
        icon={collapsed? <MenuFoldOutlined/> : <MenuUnfoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <Breadcrumb items={bread}/>
    </div>
  )
}

export default HeaderLine