import { useMemo, useState } from 'react'

import { Button, ButtonGroup, Stack } from '@mui/material'
import { LineChart as MuiLineChart } from '@mui/x-charts'
import moment from 'moment'

import { TAccount } from '@/types/account.types'
import { TCompany } from '@/types/company.types'

type TRange = 'day' | 'month' | 'year'

const LineChart = ({
  data,
  param = 'createdAt',
}: {
  data: TCompany[] | TAccount[]
  param?: 'createdAt' | 'updatedAt'
}) => {
  const [range, setRange] = useState<TRange>('month')

  const chartData = useMemo(() => {
    if (!data.length) return []

    const now = moment()
    let start: moment.Moment
    let format: string
    let addUnit: moment.unitOfTime.DurationConstructor

    if (range === 'day') {
      start = now.clone().startOf('day')
      format = 'HH:00'
      addUnit = 'hour'
    } else if (range === 'year') {
      start = now.clone().startOf('year')
      format = 'YYYY-MM'
      addUnit = 'month'
    } else {
      start = now.clone().startOf('month')
      format = 'YYYY-MM-DD'
      addUnit = 'day'
    }

    const allPoints: string[] = []
    const cursor = start.clone()

    while (cursor.isSameOrBefore(now)) {
      allPoints.push(cursor.format(format))
      cursor.add(1, addUnit)
    }

    const counts: Record<string, number> = {}
    data.forEach((item) => {
      const date = moment(item[param])
      if (date.isBefore(start) || date.isAfter(now)) return

      const key = date.format(format)
      counts[key] = (counts[key] || 0) + 1
    })

    return allPoints.map((label) => ({
      label,
      count: counts[label] || 0,
    }))
  }, [data, range])

  return (
    <Stack spacing={2}>
      <ButtonGroup variant="outlined">
        <Button
          onClick={() => setRange('day')}
          variant={range === 'day' ? 'contained' : 'outlined'}
        >
          By Day
        </Button>
        <Button
          onClick={() => setRange('month')}
          variant={range === 'month' ? 'contained' : 'outlined'}
        >
          By Month
        </Button>
        <Button
          onClick={() => setRange('year')}
          variant={range === 'year' ? 'contained' : 'outlined'}
        >
          By Year
        </Button>
      </ButtonGroup>

      <MuiLineChart
        height={300}
        xAxis={[
          {
            data: chartData.map((item) => item.label),
            scaleType: 'point',
            label: `By ${range === 'day' ? 'hours' : range === 'month' ? 'Day' : 'Month'}`,
          },
        ]}
        yAxis={[{ label: param === 'createdAt' ? 'Companies created' : 'Companies updated' }]}
        series={[
          {
            data: chartData.map((item) => item.count),
            area: true,
          },
        ]}
      />
    </Stack>
  )
}

export { LineChart }
