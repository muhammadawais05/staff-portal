import { Container, Grid } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import * as S from './styles'
import { WeekStartsOn } from '../../@types/types'
import { getDayNamesOfWeek, getWeekends } from '../../_lib/dateTime'
import DaysOfWeekDay from '../DaysOfWeekDay'

const WEEKENDS = getWeekends({})

interface Props {
  /** weekStartsOn: the index of the first day of the week (1 - Monday ... 7 - Sunday) */
  weekStartsOn: WeekStartsOn
}

const GridItem = Grid.Item

export const DaysOfWeek: FC<Props> = memo(({ weekStartsOn }) => (
  <GridItem css={S.gridItem}>
    <Container direction='row' flex justifyContent='space-evenly'>
      {getDayNamesOfWeek({ weekStartsOn }).map((day, index) => (
        <DaysOfWeekDay
          day={day}
          index={index}
          isLastDayOfWeek={index === 6}
          isWeekend={WEEKENDS.includes(day)}
          key={day}
        />
      ))}
    </Container>
  </GridItem>
))

DaysOfWeek.displayName = 'DaysOfWeek'

export default DaysOfWeek
