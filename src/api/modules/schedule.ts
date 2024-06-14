import fetchData from "../http";

// 获取日程列表
const schedule_apis = {
  getScheduleList : () => fetchData('/schedule', {pageNum:1, pageSize: 2}, 'POST')
}

export default schedule_apis