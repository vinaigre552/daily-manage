import { createSlice, PayloadAction, createAsyncThunk, nanoid } from "@reduxjs/toolkit"


interface scheduleStatus {
  key: string
  status: string
}
interface scheduleType extends scheduleStatus {
  schedule: string
  timeLeft: string
  remark: string
  time: never
}

// interface preschedule  extends scheduleStatus{
//   id: string
// }

const scheduleData = [
  {
    key: '1',
    schedule: '开会',
    timeLeft: '30分钟',
    remark: '小会',
    status: '进行中',
    time: ''
  },
  {
    key: '2',
    schedule: '上课',
    timeLeft: '1小时30分钟',
    remark: '准时',
    status: '进行中',
    time: ''
  }
]

// 在调用时，dispatch().unwrap()可以try catch捕获错误
// 两个参数，第一个时payload，第二个是dispatch和getState, getState 可以得到全部的state
export const fetchData = createAsyncThunk('schedule/getData', (_, {dispatch, getState}) => {
  setTimeout(() => { dispatch(deleteSchedule('0')); getState()}, 1000)
  return {
    key: '2',
    schedule: '上课',
    timeLeft: '1小时30分钟',
    remark: '准时',
    status: '进行中'
  }
})

export const schedule = createSlice({
  name: 'schedule',
  initialState: {
    scheduleData: scheduleData
  },
  reducers: {
    addSchedule: {
      reducer: (state, action:PayloadAction<scheduleType>) => {
        state.scheduleData.push(action.payload)
      },
      prepare: (scheduleItem) => {
        return {
          payload: {
            key: nanoid(),
            ...scheduleItem
          }
        }
      }
    },
    deleteSchedule(state, action:PayloadAction<string>) {
      const index = state.scheduleData.findIndex(schedule => schedule.key === action.payload)
      index !== -1 && state.scheduleData.splice(index, 1)
    },
    // handleSchedule: {
    //   reducer: (state, action: PayloadAction<preschedule>) => {
    //     const { id, key, status } = action.payload
    //     console.log(id)
    //     const schedule = state.scheduleData.find(schedule => schedule.key === key)
    //     schedule && (schedule.status = status)
    //   }, 
    //   // 使用prepare的时候，需要在reducer中明确指定payload类型,否则会报错
    //   prepare: (key, status) => { 
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         key,
    //         status
    //       }
    //     }
    //   }
    // },
    handleScheduleStatus(state, action: PayloadAction<scheduleStatus>) {
      const { key, status } = action.payload
      const schedule = state.scheduleData.find(schedule => schedule.key === key)
      schedule && (schedule.status = status)
    }
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchData.pending, (state, action) => {
  //     console.log(state.scheduleData, action)
  //   }).addCase(fetchData.fulfilled, (state, action) => {
  //     console.log(action.payload)
  //   })
  // }
})

export const { addSchedule, deleteSchedule, handleScheduleStatus} = schedule.actions
export default schedule.reducer