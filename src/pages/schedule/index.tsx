import React from 'react'
import { Button, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  CheckOutlined,
  PauseOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  PauseCircleFilled
} from '@ant-design/icons'
import styles from './style/index.module.less'
import { deleteSchedule, handleScheduleStatus } from '../../store/schedule'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const size = 'small' // 按钮大小
enum StatusTag { // 状态tag颜色
  '已完成' = 'green',
  '进行中' = 'blue',
  '暂停' = 'purple',
  '过期未完成' = 'gray'
}

interface DataType {
  key: string
  schedule: string
  timeLeft: string
  remark: string
  status: string
}

function Schedule() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '日程',
      dataIndex: 'schedule',
      key: 'schedule'
    },
    {
      title: '剩余时间',
      dataIndex: 'timeLeft',
      key: 'timeLeft'
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
            onClick={() => dispatch(handleScheduleStatus({ key: record.key, status: '已完成' }))}
          />
          <Button
            shape="circle"
            className={styles['btn']}
            size={size}
            icon={record.status !== '暂停' ? <PauseOutlined /> : <PauseCircleFilled />}
            onClick={() => dispatch(handleScheduleStatus({ key: record.key, status: '暂停' }))}
          />
          <Button
            shape="circle"
            className={styles['btn']}
            size={size}
            icon={<EditOutlined />}
            onClick={() => navigate(`/schedule/add-schedule?key=${record.key}`)}
          />
          <Button
            shape="circle"
            className={styles['btn']}
            size={size}
            icon={<DeleteOutlined />}
            onClick={() => dispatch(deleteSchedule(record.key))}
          />
        </>
      )
    }
  ]
  return (
    <div>
      <Button type="primary" size="middle" className={styles['add-btn']}>
        <Link to={'/schedule/add-schedule'}>新建日程📅</Link>
      </Button>
      <Table
        columns={columns}
        dataSource={useAppSelector((state) => state.schedule.scheduleData)}
      ></Table>
    </div>
  )
}

export default Schedule
