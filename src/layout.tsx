import React from 'react'
import { Layout, Menu, theme } from 'antd'
import { routes, IRoute } from './routes'
const { Header, Sider, Content } = Layout
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LazyImportComponent } from './utils/lazyload'
// import Calendar from './pages/calendar'
interface menuItem {
  key: string
  label: string
}
interface menu extends menuItem {
  children?: menuItem[]
}

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
  routes.forEach((route) => {
    res.push(travel(route))
  })
  return res
}

// 根据route配置得到正确的routes配置
function getRoutes(routes: IRoute[]) {
  const res = []
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        route.element = (
          <LazyImportComponent lazyChildren={React.lazy(() => import(`./pages/${route.key}`))} />
        )
        res.push(route)
      }
      if (route.children) {
        travel(route.children)
      }
    })
  }
  travel(routes)
  return res
}
function PageLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const dealedRoutes = getRoutes(routes)
  const navigate = useNavigate()
  const menu = getMenu(routes)
  function onClickMenuItem(e) {
    navigate(`${e.key}`)
  }
  return (
    <Layout>
      <Sider style={{ height: '100vh' }}>
        <Menu theme="dark" mode="inline" items={menu} onClick={onClickMenuItem}></Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>这是标题栏</Header>
        <Content
          style={{
            margin: '24px 16px',
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
      </Layout>
    </Layout>
  )
}

export default PageLayout
