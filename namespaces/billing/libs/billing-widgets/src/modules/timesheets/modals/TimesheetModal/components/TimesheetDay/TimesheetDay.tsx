import { Grid, Typography } from '@toptal/picasso'
import React, { FC, ReactNode, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Maybe, Scalars } from '@staff-portal/graphql/staff'
import { parse } from '@staff-portal/billing/src/_lib/dateTime'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import * as S from './styles'

interface Props {
  children: ReactNode
  date: Scalars['Date']
  note?: Maybe<string>
  isBreak?: boolean
  isWeekend?: boolean
}

const displayName = 'TimesheetDay'

const GridItem = Grid.Item

const TimesheetDay: FC<Props> = memo(
  ({ date, note, isBreak, isWeekend, children }) => {
    const parsedDate = parse(date)
    const { t: translate } = useTranslation('timesheet')

    return (
      <GridItem
        css={S.gridItem({ isBreak, isWeekend })}
        data-testid={displayName}
        small={12}
      >
        <Grid spacing={0}>
          <GridItem css={S.colDate}>
            <Typography
              data-testid='day_date'
              size='small'
              weight='semibold'
              inline
              color='dark-grey'
            >
              {parsedDate.toLocaleString({ day: 'numeric', month: 'short' })}
            </Typography>{' '}
            <Typography
              data-testid='day_date_weekday'
              size='small'
              inline
              color='dark-grey'
            >
              {parsedDate.toLocaleString({ weekday: 'short' })}
            </Typography>
          </GridItem>
          <GridItem css={S.colHours} small={3}>
            {children}
          </GridItem>
          <GridItem css={S.colWorkNote}>
            <Typography
              data-testid='day_worknote'
              size='small'
              color='black'
              weight={isBreak ? 'semibold' : 'regular'}
            >
              {isBreak ? translate('Timesheet.breakDay') : note || EMPTY_DATA}
            </Typography>
          </GridItem>
        </Grid>
      </GridItem>
    )
  }
)

TimesheetDay.displayName = displayName

export default TimesheetDay
