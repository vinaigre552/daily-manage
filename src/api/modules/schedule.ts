import fetchData from "../http";

// 日程
const schedule_apis = {
  // 获取日程列表
  getScheduleList : (data:{pageNum: number, pageSize:number}) => fetchData('/schedule', data, 'POST'),
  // 添加新日程
  setSchedule: (data) => fetchData('/schedule/info', data, 'POST'),
  // 根据id获取日程
  getOneSchedule: (id) => fetchData( `/schedule/info/${id}`, {}, 'POST'),
  // 更新日程
  updateSchedule: (data) => fetchData('/schedule/info/update', data, 'POST')
}

export default schedule_apis