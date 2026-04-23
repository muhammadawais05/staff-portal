import { Container, Typography } from '@toptal/picasso'
import { DateTime } from 'luxon'
import React, { Fragment, ReactElement } from 'react'

import { formatDateShort } from '../../_lib/dateTime'
import * as S from './styles'

const displayName = 'MonthlyTotals'

interface Props<T> {
  children: (props: {
    name: keyof T
    total: number
    last: boolean
  }) => ReactElement
  totals: Partial<T>
  month: number
  year: number
  sortOrder?: (keyof T)[]
}

const MonthlyTotals = <T extends Record<string, string | undefined>>({
  children,
  totals = {},
  month,
  year,
  sortOrder = Object.keys(totals)
}: Props<T>) => {
  const dateLabel = formatDateShort(DateTime.local(year, month))
  const sortedAndFilteredTotals = sortOrder.reduce((acc, currVal) => {
    const value = Number(totals[currVal])

    if (value > 0) {
      acc.push([currVal, value])
    }

    return acc
  }, [] as [keyof T, number][])
  const totalsLength = sortedAndFilteredTotals.length

  return (
    <Container
      flex
      padded={0}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      css={S.wrapper}
      data-testid={displayName}
    >
      <Container right='small'>
        <Typography
          css={S.date}
          data-testid={`${displayName}-date`}
          color='dark-grey'
          weight='semibold'
          size='xsmall'
        >
          {dateLabel}
        </Typography>
      </Container>
      <Container data-testid='SummaryTagsWrapper'>
        {sortedAndFilteredTotals.map(([name, total], index) => (
          <Fragment key={name as string}>
            {children({ name, total, last: totalsLength === index + 1 })}
          </Fragment>
        ))}
      </Container>
    </Container>
  )
}

MonthlyTotals.displayName = displayName

export default MonthlyTotals
