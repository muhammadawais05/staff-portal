import React from 'react'
import {
  Container,
  Typography,
  Tooltip,
  QuestionMark16,
  TypographyOverflow
} from '@toptal/picasso'
import { formatAsPercentage } from '@staff-portal/utils'

export interface Props {
  bestMatchScore?: number | null
  bestMatchScoreRank: number
  totalRanked: number
}

const BestMatchField = ({
  totalRanked,
  bestMatchScoreRank,
  bestMatchScore
}: Props) => {
  const getBestMatchScorePercentile = () => {
    const score = ((totalRanked - bestMatchScoreRank) / totalRanked) * 10
    const hasDiff = score % 1 > 0

    // leave only first decimal number without rounding
    return Number(hasDiff ? String(score).slice(0, 3) : score)
  }

  return (
    <Container
      as='span'
      flex
      alignItems='center'
      data-testid='best-match-field'
    >
      <TypographyOverflow as='span' weight='semibold' color='inherit'>
        {bestMatchScore
          ? `${getBestMatchScorePercentile()}/10`
          : 'No Best Match data'}
      </TypographyOverflow>
      <Tooltip
        content={
          <Typography data-testid='best-match-tooltip-content'>
            <Typography as='span' weight='semibold'>
              Best Match Score:{' '}
            </Typography>
            {formatAsPercentage(bestMatchScore || 0, 2)} (
            {bestMatchScoreRank + 1} of {totalRanked})
          </Typography>
        }
        interactive
      >
        <Container as='span' left='xsmall' data-testid='best-match-tooltip'>
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default BestMatchField
