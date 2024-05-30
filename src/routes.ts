export type IRoute = {
  name: string,
  key: string,
  breadcrumb?: boolean,
  children?: IRoute[]
}

export const routes: IRoute[] = [
  {
    name: '日程',
    key: 'schedule',
    breadcrumb: true,
    children: [
      {
        name: '创建日程',
        key: 'schedule/new-schedule',
        breadcrumb: true
      },
      {
        name: '创建日程',
        key: 'schedule/new-schedules',
        breadcrumb: true
      }
    ]
  },
  {
    name: '日历',
    key: 'calendar',
    breadcrumb: true
  },
  {
    name: '统计',
    key: 'statics',
    breadcrumb: true
  }
]