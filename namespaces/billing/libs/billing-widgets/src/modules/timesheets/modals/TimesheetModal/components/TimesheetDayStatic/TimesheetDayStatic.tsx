import { Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import * as S from './styles'
import Duration from '../Duration'

const displayName = 'TimesheetDayStatic'

interface Props {
  hours: string
  minutes: string
}

const TimesheetDayStatic: FC<Props> = memo(({ hours, minutes }) => {
  return (
    <Typography css={S.dayStatic} data-testid='TimesheetDayStatic' size='small'>
      <Duration hours={hours} minutes={minutes} />
    </Typography>
  )
})

TimesheetDayStatic.displayName = displayName

export default TimesheetDayStatic
