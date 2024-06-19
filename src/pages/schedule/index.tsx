import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, ConfigProvider, message } from 'antd'
import type { TableProps } from 'antd'
import {
  CheckOutlined,
  PauseOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  PauseCircleFilled
} from '@ant-design/icons'
import styles from './style/index.module.less'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import apis from '../../api'
import isRequestSuccess from '../../api/response'
import moment from 'moment'
import zhCN from 'antd/es/locale/zh_CN'
import { IScheduleInfo } from './types'

const size = 'small' // 按钮大小
enum StatusTag { // 状态tag颜色
  '已完成' = 'green',
  '进行中' = 'blue',
  '暂停' = 'purple',
  '过期未完成' = 'gray'
}

function Schedule() {
  const navigate = useNavigate()
  const [scheduleList, setScheduleList] = useState([])

  const [page, setPage] = useState({ pageNum: 1, pageSize: 10 })
  const [total, setTotal] = useState(0)

  // 分页
  function changePage(currentPage:number, pageSize:number) {
    setPage({ pageNum: currentPage, pageSize: pageSize })
  }

  async function getSchedules() {
    const res = await apis.schedule_apis.getScheduleList({
      pageNum: page.pageNum,
      pageSize: page.pageSize
    })

    if (isRequestSuccess(res)) {
      setScheduleList(
        res.data.data.map((item:IScheduleInfo) => {
          item.key = item.id
          return item
        })
      )
      setTotal(res.data.total)
    }
  }

  useEffect(() => {
    getSchedules()
  }, [page])

  // 改变日程状态
  async function handleScheduleStatus (id: string, oldStatus:string, newStatus: string) {
    if(oldStatus === newStatus || oldStatus === '已完成')  return 

    const res = await apis.schedule_apis.updateScheduleStatus({id, status:newStatus})
    if (isRequestSuccess(res)) {
      getSchedules()
    }
  }

  // 删除日程
  async function deleteSchedule(id: string) {
    const res = await apis.schedule_apis.deleteSchedule(id)
    if (isRequestSuccess(res)) {
      message.success(res.msg)
      getSchedules()
    }
  }

  // 处理剩余时间
  function handleTimeLeft(time: string) {
    if (!time) return 0
    const timeLeft = parseInt(time)
    if (timeLeft < 0) {
      return 0
    } else if (timeLeft < 60) {
      return timeLeft + '分钟'
    } else if (timeLeft >=60 && timeLeft < 1440) {
      return Math.floor(timeLeft / 60) + '小时'
    } else {
      return Math.floor(timeLeft / 1440) + '天'
    }
  }

  const columns: TableProps<IScheduleInfo>['columns'] = [
    {
      title: '日程',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (_, record) => <span>{moment(record.start_time).format('YYYY-MM-DD HH:DD:MM')}</span>
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (_, record) => <span>{moment(record.end_time).format('YYYY-MM-DD HH:DD:MM')}</span>
    },
    {
      title: '剩余时间',
      dataIndex: 'time_left',
      key: 'time_left',
      render: (_, record) => <span>{handleTimeLeft(record.time_left as string)}</span>
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => <Tag color={StatusTag[record.status]}>{record.status}</Tag>
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            shape="circle"
            className={styles['btn']}
            style={record.status === '已完成' && { color: 'green' }}
            size={size}
            icon={record.status !== '已完成' ? <CheckOutlined /> : <CheckCircleFilled />}
            onClick={() => handleScheduleStatus(record.id, record.status, '已完成')}
          />
          <Button
            shape="circle"
            className={styles['btn']}
            size={size}
            icon={record.status !== '暂停' ? <PauseOutlined /> : <PauseCircleFilled />}
            onClick={() => handleScheduleStatus(record.id, record.status, '暂停')}
          />
          <Button
            shape="circle"
            className={styles['btn']}
            size={size}
            icon={<EditOutlined />}
            onClick={() => navigate(`/schedule/schedule-info?key=${record.key}`)}
          />
          <Button
            shape="circle"
            className={styles['btn']}
            size={size}
            icon={<DeleteOutlined />}
            onClick={() => deleteSchedule(record.id)}
          />
        </>
      )
    }
  ]

  return (
    <div>
      <Button type="primary" size="middle" className={styles['add-btn']}>
        <Link to={'/schedule/schedule-info'}>新建日程📅</Link>
      </Button>

      <ConfigProvider locale={zhCN}>
        <Table
          columns={columns}
          dataSource={scheduleList}
          pagination={{
            showSizeChanger: true,
            showTotal: () => `共${total}条`,
            pageSize: page.pageSize,
            current: page.pageNum,
            total: total,
            onChange: (current: number, page: number) => changePage(current, page),
            position: ['bottomCenter']
          }}
        ></Table>
      </ConfigProvider>
    </div>
  )
}

export default Schedule
