export interface IScheduleInfo {
  id?: string
  key?: string
  time_left: number | string
  end_time: string
  name: string
  start_time: string
  remark: string
  status: string
}

export interface IScheduleForm extends  Omit<IScheduleInfo, 'start_time'|'end_time'|'id'|'key'>{
  time: string[]
}