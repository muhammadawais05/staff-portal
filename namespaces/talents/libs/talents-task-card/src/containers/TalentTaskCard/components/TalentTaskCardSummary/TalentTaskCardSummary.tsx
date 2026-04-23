import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { TaskCardLayout } from '@staff-portal/tasks'
import { TalentEngagementsRates } from '@staff-portal/talents'

import { TaskTalentFragment } from '../../../../data/talent-fragment'
import TalentTaskCardStatus from '../TalentTaskCardStatus'
import TalentTaskCardJobs from '../TalentTaskCardJobs'

interface Props {
  talent: TaskTalentFragment
}

const TalentTaskCardSummary = ({ talent }: Props) => {
  const {
    hourlyRate,
    engagements: {
      counters: {
        acceptedInterviewsNumber,
        approvedTrialsNumber,
        interviewsNumber,
        successRate,
        trialsNumber
      }
    }
  } = talent

  return (
    <TaskCardLayout.Summary>
      <TalentTaskCardStatus talent={talent} />
      <TaskCardLayout.SummaryItem
        label='Rate'
        value={
          hourlyRate && (
            <Container flex as='span'>
              <TypographyOverflow as='span' weight='semibold' color='inherit'>
                {`${formatAmount({ amount: hourlyRate })}/h`}
              </TypographyOverflow>
            </Container>
          )
        }
      />
      <TalentTaskCardJobs talent={talent} />
      <TaskCardLayout.SummaryItem
        label='Engagement rate'
        value={
          <TalentEngagementsRates
            acceptedInterviewsNumber={acceptedInterviewsNumber}
            approvedTrialsNumber={approvedTrialsNumber}
            interviewsNumber={interviewsNumber}
            successRate={successRate}
            trialsNumber={trialsNumber}
          />
        }
      />
    </TaskCardLayout.Summary>
  )
}

export default TalentTaskCardSummary
