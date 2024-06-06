import React from 'react'
import { Calendar, Col, Radio, Row, Select, Badge } from 'antd'
import type { CalendarProps } from 'antd'
import { createStyles } from 'antd-style'
import classNames from 'classnames'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { HolidayUtil, Lunar } from 'lunar-typescript'
import localData from 'dayjs/plugin/localeData'
dayjs.extend(localData)

const getListData = (value: Dayjs) => {
  let listData = []

  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'warning event' },
        { type: 'processing', content: 'doing' },
        { type: 'warning', content: 'warning events' },
        { type: 'processing', content: 'doings' }
      ]
      break
    case 10:
      listData = [{ type: 'success', content: 'done' }]
      break
    case 13:
      listData = [{ type: 'error', content: 'not done' }]
      break
    default:
  }
  return listData
}
const useStyle = createStyles(({ token, css, cx }) => {
  const lunar = css`
    color: ${token.colorTextTertiary};
    font-size: ${token.fontSizeSM}px;
  `
  return {
    wrapper: css`
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadiusOuter};
      padding: 5px;
    `,
    dateCell: css`
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: transparent;
        transition: background 300ms;
        border-radius: ${token.borderRadiusOuter}px;
        border: 1px solid transparent;
        box-sizing: border-box;
      }
      &:hover:before {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    today: css`
      &:before {
        border: 1px solid ${token.colorPrimary};
      }
    `,
    text: css`
      position: relative;
      z-index: 1;
    `,
    events: css`
      list-style-type: none;
      margin: 0;
      padding: 0;
    `,
    datePosition: css`
      display: flex;
      padding: 20px 3px;
      justify-content: space-around;
    `,
    lunar,
    current: css`
      color: 'blue';
      &:before {
        background: ${token.colorPrimary};
      }
      &:hover:before {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
      .${cx(lunar)} {
        color: ${token.colorTextLightSolid};
        opacity: 0.9;
      }
    `,
    calendarHeader: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    headerFont: css`
      font-size: 18px;
      font-weight: 600;
      color: ${token.colorPrimary};
      font-style: italic;
    `,
    monthCell: css`
      width: 120px;
      color: ${token.colorTextBase};
      border-radius: ${token.borderRadiusOuter}px;
      padding: 5px 0;
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    monthCellCurrent: css`
      color: ${token.colorTextLightSolid};
      background: ${token.colorPrimary};
      &:hover {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
    `,
    weekend: css`
      color: ${token.colorError};
      &.gray {
        opacity: 0.4;
      }
    `
  }
})

function ScheduleCalendar() {
  const { styles } = useStyle({ test: true })

  const [selectDate, setSelectDate] = React.useState<Dayjs>(dayjs())
  const [panelDateDate, setPanelDate] = React.useState<Dayjs>(dayjs())

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    setPanelDate(value)
  }

  const onDateChange: CalendarProps<Dayjs>['onSelect'] = (value, selectInfo) => {
    if (selectInfo.source === 'date') {
      setSelectDate(value)
    }
  }

  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (date, info) => {
    const d = Lunar.fromDate(date.toDate())
    const lunar = d.getDayInChinese()
    const solarTerm = d.getJieQi()
    const isWeekend = date.day() === 6 || date.day() === 0
    const h = HolidayUtil.getHoliday(date.get('year'), date.get('month') + 1, date.get('date'))
    const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined
    const listData = getListData(date)
    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...info.originNode.props,
        className: classNames(styles.dateCell, {
          [styles.current]: selectDate.isSame(date, 'date'),
          [styles.today]: date.isSame(dayjs(), 'date')
        }),
        children: (
          <div className={styles.text}>
            <div className={styles.datePosition}>
              <span
                className={classNames({
                  [styles.weekend]: isWeekend,
                  gray: !panelDateDate.isSame(date, 'month')
                })}
              >
                {date.get('date')}
              </span>
              {info.type === 'date' && (
                <div className={styles.lunar}>{displayHoliday || solarTerm || lunar}</div>
              )}
            </div>

            <ul className={styles.events}>
              {listData.map((item) => (
                <li key={item.content}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))}
            </ul>
          </div>
        )
      })
    }

    if (info.type === 'month') {
      const d2 = Lunar.fromDate(new Date(date.get('year'), date.get('month')))
      const month = d2.getMonthInChinese()
      return (
        <div
          className={classNames(styles.monthCell, {
            [styles.monthCellCurrent]: selectDate.isSame(date, 'month')
          })}
        >
          {date.get('month') + 1}月（{month}月）
        </div>
      )
    }
  }

  const getYearLabel = (year: number) => {
    const d = Lunar.fromDate(new Date(year + 1, 0))
    return `${d.getYearInChinese()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）`
  }

  const getMonthLabel = (month: number, value: Dayjs) => {
    const d = Lunar.fromDate(new Date(value.year(), month))
    const lunar = d.getMonthInChinese()
    return `${month + 1}月（${lunar}月）`
  }

  return (
    <div className={styles.wrapper}>
      <Calendar
        fullCellRender={cellRender}
        fullscreen={false}
        onPanelChange={onPanelChange}
        onSelect={onDateChange}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0
          const end = 12
          const monthOptions = []

          let current = value.clone()
          const localeData = value.localeData()
          const months = []
          for (let i = 0; i < 12; i++) {
            current = current.month(i)
            months.push(localeData.monthsShort(current))
          }

          for (let i = start; i < end; i++) {
            monthOptions.push({
              label: getMonthLabel(i, value),
              value: i
            })
          }

          const year = value.year()
          const month = value.month()
          const options = []
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push({
              label: getYearLabel(i),
              value: i
            })
          }
          return (
            <div className={styles.calendarHeader}>
              <span className={styles.headerFont}>日程日历</span>
              <Row justify="end" gutter={8} style={{ padding: 8 }}>
                <Col>
                  <Select
                    size="small"
                    className="my-year-select"
                    value={year}
                    options={options}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear)
                      onChange(now)
                    }}
                  />
                </Col>
                <Col>
                  <Select
                    size="small"
                    value={month}
                    options={monthOptions}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth)
                      onChange(now)
                    }}
                  />
                </Col>
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">月</Radio.Button>
                    <Radio.Button value="year">年</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </div>
          )
        }}
      />
    </div>
  )
}

export default ScheduleCalendar
