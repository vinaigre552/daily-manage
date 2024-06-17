import fetchData from "../http";

// 获取日程列表
const schedule_apis = {
  getScheduleList : (data) => fetchData('/schedule', data, 'POST'),
  setSchedule: (data) => fetchData('/schedule/info', data, 'POST')
}

export default schedule_apis