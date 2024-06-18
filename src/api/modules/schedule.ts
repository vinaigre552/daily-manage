import fetchData from "../http";

// 日程
const schedule_apis = {
  // 获取日程列表
  getScheduleList : (data:{pageNum: number, pageSize:number}) => fetchData('/schedule', data, 'POST'),
  // 添加新日程
  setSchedule: (data) => fetchData('/schedule/info', data, 'POST'),
  // 根据id获取日程
  getOneSchedule: (id:number) => fetchData( `/schedule/info/search/${id}`, {}, 'POST'),
  // 更新日程
  updateSchedule: (data) => fetchData('/schedule/info/update', data, 'POST'),
  // 更新状态
  updateScheduleStatus: (data: {id: string, status: string}) => fetchData('/schedule/info/status', data, 'POST'),
  // 删除日程
  deleteSchedule: (id: string) => fetchData(`/schedule/info/delete/${id}`, {}, 'DELETE')
}

export default schedule_apis