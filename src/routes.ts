export type IRoute = {
  name: string,
  key: string,
  icon?: unknown,
  breadcrumb?: boolean,
  children?: IRoute[]
  isMenu?: boolean
}

export const routes: IRoute[] = [
  {
    name: '日程',
    key: 'schedule',
    breadcrumb: true,
    isMenu: true,
    children: [
      {
        name: '创建日程',
        key: 'schedule/schedule-info',
        breadcrumb: true,
      },
      {
        name: '修改日程',
        key: 'schedule/schedule-info',
        breadcrumb: true
      }
    ]
  },
  {
    name: '日历',
    key: 'calendar',
    breadcrumb: true,
    isMenu: true,
  },
  {
    name: '统计',
    key: 'statics',
    breadcrumb: true,
    isMenu: true
  }
]