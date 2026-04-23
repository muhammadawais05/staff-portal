import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { TaskCardLayout } from '@staff-portal/tasks'
import { LeadProbabilityBucket } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import CompanyTaskCardStatus from '../CompanyTaskCardStatus'

export interface Props {
  company: TaskCardCompanyFragment
}

const CompanyTaskCardAppliedSummary = ({ company }: Props) => {
  const {
    daysInFunnel,
    interestedIn,
    leadPotential,
    scoreExplanation,
    investigations,
    cumulativeStatus
  } = company

  return (
    <TaskCardLayout.Summary>
      <CompanyTaskCardStatus
        investigations={investigations}
        cumulativeStatus={cumulativeStatus}
      />

      <TaskCardLayout.SummaryItem
        label='Interested in'
        value={
          <Container flex as='span'>
            <TypographyOverflow as='span' weight='semibold' color='inherit'>
              {interestedIn ?? NO_VALUE}
            </TypographyOverflow>
          </Container>
        }
      />

      <TaskCardLayout.SummaryItem
        label='Lead bucket'
        value={
          <Container flex as='span'>
            <TypographyOverflow
              as='span'
              weight='semibold'
              color='inherit'
              disableTooltip
            >
              <LeadProbabilityBucket
                bucket={leadPotential?.leadProbabilityBucket}
                scoreExplanation={scoreExplanation}
              />
            </TypographyOverflow>
          </Container>
        }
      />

      <TaskCardLayout.SummaryItem
        label='Days in funnel'
        value={
          <Container flex as='span'>
            <TypographyOverflow as='span' weight='semibold' color='inherit'>
              {daysInFunnel ?? NO_VALUE}
            </TypographyOverflow>
          </Container>
        }
      />
    </TaskCardLayout.Summary>
  )
}

export default CompanyTaskCardAppliedSummary
