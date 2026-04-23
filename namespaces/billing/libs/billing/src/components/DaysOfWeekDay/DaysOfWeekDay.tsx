import { Grid, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import * as S from './styles'

const displayName = 'DaysOfWeekDay'

interface Props {
  day: string
  index: number
  isWeekend: boolean
  isLastDayOfWeek: boolean
}

const GridItem = Grid.Item

export const DaysOfWeekDay: FC<Props> = memo(
  ({ day, isWeekend, isLastDayOfWeek }) => {
    return (
      <GridItem
        css={S.gridItem({ isWeekend, isLastDayOfWeek })}
        data-testid={displayName}
        key={day}
      >
        <Typography align='center' weight='semibold'>
          {day}
        </Typography>
      </GridItem>
    )
  }
)

DaysOfWeekDay.defaultProps = {}

DaysOfWeekDay.displayName = displayName

export default DaysOfWeekDay
