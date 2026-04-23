import React from 'react'
import {
  ArrowLongRight16,
  Info16,
  Container,
  Tooltip,
  Typography
} from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'

import { RateChangeRequestFragment } from '../../data/rate-change-request-fragment'
import { RateFieldTooltip } from '../../components'
import * as S from './styles'

type RateChangeRequestValueProps = Pick<
  RateChangeRequestFragment,
  'currentRate' | 'desiredRate' | 'outcomeRate' | 'talent'
> & {
  rateRecommendationUnauthorized?: boolean
}

const formatRate = (rate?: string | null) =>
  rate ? `${formatAmount({ amount: rate })}/hr` : '?'

const RateChangeRequestValue = ({
  currentRate,
  desiredRate,
  outcomeRate,
  talent,
  rateRecommendationUnauthorized
}: RateChangeRequestValueProps) => {
  const isOutcomeRateEmpty = outcomeRate === undefined || outcomeRate === null
  const isOutcomeRatePresentAndDifferentThanDesired =
    !isOutcomeRateEmpty && outcomeRate !== desiredRate
  const showDesiredRate =
    isOutcomeRateEmpty || isOutcomeRatePresentAndDifferentThanDesired

  return (
    <Container flex alignItems='center' css={S.container}>
      <Typography as='span' weight='semibold' data-testid='current-rate'>
        {formatRate(currentRate)}
      </Typography>

      <Container as='span' left='xsmall' flex>
        <ArrowLongRight16 />
      </Container>

      {showDesiredRate && (
        <Container as='span' left='xsmall' flex>
          <Typography
            data-testid={
              isOutcomeRatePresentAndDifferentThanDesired
                ? 'desired-rate-rejected'
                : 'desired-rate'
            }
            weight='semibold'
            css={
              isOutcomeRatePresentAndDifferentThanDesired
                ? S.rejectedRate
                : undefined
            }
          >
            {formatRate(desiredRate)}
          </Typography>
        </Container>
      )}

      {outcomeRate && (
        <Container as='span' left='xsmall' flex>
          <Typography weight='semibold' data-testid='outcome-rate'>
            {formatRate(outcomeRate)}
          </Typography>
        </Container>
      )}

      {!rateRecommendationUnauthorized && (
        <Tooltip
          content={
            talent?.rateRecommendation ? (
              <RateFieldTooltip
                talentType={talent.type}
                rateRecommendation={talent.rateRecommendation}
              />
            ) : (
              "Can't calculate average rate for this region."
            )
          }
        >
          <Container as='span' left='xsmall' flex>
            <Info16 data-testid='info-icon' />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default RateChangeRequestValue
