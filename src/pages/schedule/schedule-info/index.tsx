import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, DatePicker, ConfigProvider } from 'antd'
import type { GetProps } from 'antd'
import styles from '../style/index.module.less'
import { useNavigate, useSearchParams } from 'react-router-dom'
import locale from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import { addSchedule, updateSchedule } from '../../../store/schedule'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

interface schedule {
  schedule: string
  timeLeft: string
  remark: string
  status: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  time: any
}

// 日期时间选择组件的中文以及不可选设置
dayjs.locale('zh-cn')
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
const { RangePicker } = DatePicker

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current <= dayjs().subtract(1, 'day').endOf('day')
}

function NewSchedule() {
  const [addOrUpdate, setAddOrUpdate] = useState('新建')
  const scheduleTable = useAppSelector(state => state.schedule.scheduleData)
 
  const formRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [params] = useSearchParams()
  const key = params.getAll('key')[0]

  useEffect(() => {
    if (key) {
      const foundSchedule = scheduleTable.find(s => s.key === params.getAll('key')[0])
      formRef.current.setFieldsValue({schedule: foundSchedule.schedule, remark: foundSchedule.remark, time: foundSchedule.time})
      setAddOrUpdate('编辑')
    } else {
      setAddOrUpdate('新建')
    }
  }, [key])

  function backToLastPage() {
    navigate(-1)
  }
  function handleSchedule(values) {
    const scheduleItem: schedule  = {
      schedule: values.schedule,
      timeLeft: '',
      remark: values.remark,
      status: '进行中',
      time: values.time
    }

    // 剩余时间的计算和显示
    const minutes = dayjs(values.time[1]).diff(dayjs(new Date()), 'minute')
    if ( 0 < minutes && minutes < 60) {
      scheduleItem.timeLeft = `${minutes}分钟`
    } else if (minutes < 1440 && minutes >= 60) {
      const hours = dayjs(values.time[1]).diff(dayjs(new Date()), 'hour')
      scheduleItem.timeLeft = `${hours}小时`
    } else if (minutes >= 1440){
      const days = dayjs(values.time[1]).diff(dayjs(new Date()), 'day')
      scheduleItem.timeLeft = `${days}天`
    } else {
      scheduleItem.status = '过期未完成'
    }

    if (key) {
      dispatch(updateSchedule({...scheduleItem, key}))
    } else {
      dispatch(addSchedule(scheduleItem))
    }

    navigate('/schedule')
  }
  return (
    <div className={styles['schedule-info']}>
      <span className={styles['schedule-form-title']}>{addOrUpdate}日程</span>
      <Form layout="vertical" onFinish={handleSchedule} ref={formRef}>
        <Form.Item
          label="日程："
          name="schedule"
          rules={[{ required: true, message: '请输入日程' }]}
        >
          <Input />
        </Form.Item>
        <ConfigProvider locale={locale}>
          <Form.Item label="时间：" name="time" rules={[{ required: true, message: '请选择时间' }]}>
            <RangePicker
              style={{ width: '100%' }}
              disabledDate={disabledDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('12:00:00', 'HH:mm:ss')]
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
        </ConfigProvider>
        <Form.Item label="备注：" name="remark" rules={[{ required: true, message: '请输入备注' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button style={{ marginRight: '5px' }} htmlType="submit">
            {addOrUpdate === '新建' ? '创建' : '更新'}日程
          </Button>
          <Button style={{ marginLeft: '5px' }} onClick={backToLastPage}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default NewSchedule
