import React from 'react'
import { Tooltip, Container, Typography, QuestionMark16 } from '@toptal/picasso'

import { TalentTrialRateFragment } from '../../data/talent-trial-rate-fragment'

export type Props = {
  counters?: TalentTrialRateFragment['engagements']['counters']
}

const TrialRateField = ({ counters }: Props) => {
  if (!counters || counters.successfulTrialsNumber === 0) {
    return <>N/A</>
  }

  const { trialSuccessRate, successfulTrialsNumber, rejectedTrialsNumber } =
    counters

  return (
    <Container as='span' flex alignItems='center'>
      {`${trialSuccessRate}% (${successfulTrialsNumber} / ${rejectedTrialsNumber})`}
      <Tooltip
        content={
          <Typography>
            <Typography as='span' weight='semibold'>
              Success rate
            </Typography>
            : {`${trialSuccessRate}%`}
            <br />
            <Typography as='span' weight='semibold'>
              Approved trial periods
            </Typography>
            : {successfulTrialsNumber}
            <br />
            <Typography as='span' weight='semibold'>
              Rejected trial periods
            </Typography>
            : {rejectedTrialsNumber}
          </Typography>
        }
        interactive
      >
        <Container
          as='span'
          left='xsmall'
          flex
          alignItems='center'
          data-testid='trial-rate-tooltip-icon'
        >
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default TrialRateField
