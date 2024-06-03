import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { routes, IRoute } from './routes'
const { Header, Sider, Content, Footer } = Layout
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { LazyImportComponent } from './utils/lazyload'
import UserDisplay from './components/user-display'
import HeaderLine from './components/header-line'
import styles from './layout.module.less'
import { ReconciliationOutlined, CalendarOutlined, FundOutlined } from '@ant-design/icons'
import './layout.css'

interface menuItem {
  key: string
  label: string
}
interface menu extends menuItem {
  children?: menuItem[]
  icon?: unknown
}

const icons = [
  { icon: <ReconciliationOutlined /> },
  { icon: <CalendarOutlined /> },
  { icon: <FundOutlined /> }
]

// 根据route得到menuItem
function getMenu(routes: IRoute[]) {
  const res = []
  function travel(route) {
    const menuItem: menu = {
      key: route.key,
      label: route.name
    }
    if (route.key && !route.children) {
      return menuItem
    }
    if (route.children) {
      menuItem.children = []
      route.children.forEach((r) => {
        menuItem.children?.push(travel(r))
      })
      return menuItem
    }
  }
  routes.forEach((route, index) => {
    const menuitem = travel(route)
    menuitem.icon = icons[index].icon
    res.push(menuitem)
  })
  return res
}

// 根据route配置得到正确的routes配置
function getRoutes(routes: IRoute[]) {
  const res = []
  function travel(_routes) {
    _routes.forEach((route) => {
      route.element = (
        <LazyImportComponent lazyChildren={React.lazy(() => import(`./pages/${route.key}`))} />
      )
      res.push(route)
      if (route.children) {
        travel(route.children)
      }
    })
  }
  travel(routes)
  return res
}

// 根据route得到breadcrumb数组
function getBreadcrumbItems(routes: IRoute[], path: string) {
  const res = []

  function travel(_routes) {
    _routes.forEach((route) => {
      route.title = route.name
      route.href = `/${route.key}`

      if (route.children) {
        travel(route.children)
      }

      if (path && route.href.endsWith(path)) {
        res.push(route)
        const pathArr = path.split('/')
        const currentPath = pathArr[pathArr.length - 1].length + 1
        path = path.substring(0, path.length - currentPath)
      }
    })
  }
  travel(routes)
  res.reverse()
  return res
}

function PageLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const navigate = useNavigate()
  const location = useLocation()

  const dealedRoutes = getRoutes(routes)
  const menu = getMenu(routes)
  const breadcrumbItems = getBreadcrumbItems(routes, location.pathname)

  function onClickMenuItem(e) {
    navigate(`${e.key}`)
  }

  return (
    <Layout>
      <Sider
        className={styles['layout']}
        width="20%"
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <div style={collapsed ? { padding: '10px' } : { padding: '20px' }}>
          <UserDisplay />
        </div>
        <Menu
          theme="dark"
          className={styles['menu']}
          mode="inline"
          items={menu}
          onClick={onClickMenuItem}
        ></Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, height: '60px' }}>
          <HeaderLine breadItems={breadcrumbItems} collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          style={{
            margin: '20px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <Routes>
            {dealedRoutes.map((route) => {
              return <Route key={route.key} path={`/${route.key}`} element={route.element}></Route>
            })}
            <Route
              path="404"
              element={
                <LazyImportComponent
                  lazyChildren={React.lazy(() => import('./pages/exception/404'))}
                />
              }
            />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Daily Management ©{new Date().getFullYear()} Created by LSW
        </Footer>
      </Layout>
    </Layout>
  )
}

export default PageLayout
