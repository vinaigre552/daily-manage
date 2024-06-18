import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, DatePicker, ConfigProvider } from 'antd'
import type { GetProps } from 'antd'
import styles from '../style/index.module.less'
import { useNavigate, useSearchParams } from 'react-router-dom'
import locale from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import apis from '../../../api'
import isRequestSuccess from '../../../api/response'
import { message } from 'antd'
import { IScheduleInfo, IScheduleForm } from '../types'

// 日期时间选择组件的中文以及不可选设置
dayjs.locale('zh-cn')
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>
const { RangePicker } = DatePicker

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current <= dayjs().subtract(1, 'day').endOf('day')
}

function NewSchedule() {
  const [addOrUpdate, setAddOrUpdate] = useState('新建')

  const formRef = useRef(null)
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const key = params.get('key')

  async function getScheduleInfoById(id:number) {
    const res = await apis.schedule_apis.getOneSchedule(id)
    if (isRequestSuccess(res)) {
      const scheduleInfo = res.data
      formRef.current.setFieldsValue({
        name: scheduleInfo.name,
        remark: scheduleInfo.remark,
        time: [dayjs(scheduleInfo.start_time), dayjs(scheduleInfo.end_time)] // 需要用dayjs转换格式，字符串类型会报错
      })
    }
  }
  useEffect(() => {
    if (key) {
      getScheduleInfoById(parseInt(key))

      setAddOrUpdate('编辑')
    } else {
      setAddOrUpdate('新建')
    }
  }, [key])

  function backToLastPage() {
    navigate(-1)
  }
  async function handleSchedule(values:IScheduleForm) {
    // 剩余时间的计算和显示
    const minutes = dayjs(values.time[1]).diff(dayjs(new Date()), 'minute')

    const scheduleItem: IScheduleInfo = {
      name: values.name,
      start_time: values.time[0],
      end_time: values.time[1],
      remark: values.remark,
      status: minutes > 0 ? '进行中' : '过期未完成'
    }

    if (key) { // 更新 
      scheduleItem.id = key
      const res = await apis.schedule_apis.updateSchedule(scheduleItem)
      if (isRequestSuccess(res)) {
        message.success('更新成功')
        navigate('/schedule')
      }
    } else { // 新增
      const res = await apis.schedule_apis.setSchedule(scheduleItem)
  
      if (isRequestSuccess(res)) {
        message.success('添加成功')
        navigate('/schedule')
      }
    }
  }
  return (
    <div className={styles['schedule-info']}>
      <span className={styles['schedule-form-title']}>{addOrUpdate}日程</span>
      <Form layout="vertical" onFinish={handleSchedule} ref={formRef}>
        <Form.Item
          label="日程："
          name="name"
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
