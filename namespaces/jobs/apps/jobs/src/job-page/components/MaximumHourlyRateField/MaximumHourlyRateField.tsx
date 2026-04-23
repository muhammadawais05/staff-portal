import React, { useMemo, ReactNode } from 'react'
import { Typography, Container, Tooltip, QuestionMark16 } from '@toptal/picasso'
import { JobBudgetDetails, Maybe } from '@staff-portal/graphql/staff'
import { HourlyRateField } from '@staff-portal/facilities'
import { JobMaxHourlyRateWidgets, JobSkillSet } from '@staff-portal/jobs'

import { getUncertainOfBudgetTooltip } from './utils'
import { JobDetailsInformationFragment } from '../JobDetailsSection/components/JobDetailsInformation/data/get-job-details-information/get-job-details-information.staff.gql.types'
export interface Props {
  budgetDetails?: Maybe<JobBudgetDetails>
  maxHourlyRate?: Maybe<number>
  uncertainOfBudgetReason?: Maybe<string>
  uncertainOfBudgetReasonComment?: Maybe<string>
  job?: JobDetailsInformationFragment
}

const MaximumHourlyRateField = ({
  budgetDetails,
  maxHourlyRate,
  uncertainOfBudgetReason,
  uncertainOfBudgetReasonComment,
  job
}: Props) => {
  const wrap = (element: ReactNode) => (
    <Typography size='medium' data-testid='job-information-max-hourly-rate'>
      {element}
    </Typography>
  )

  return useMemo(() => {
    switch (budgetDetails) {
      case JobBudgetDetails.NO_RATE_LIMIT:
        return wrap('No rate limit')
      case JobBudgetDetails.UNCERTAIN_OF_BUDGET:
        return wrap(
          <Container as='span' flex alignItems='center'>
            Uncertain of budget
            <Tooltip
              content={getUncertainOfBudgetTooltip(
                uncertainOfBudgetReason,
                uncertainOfBudgetReasonComment
              )}
            >
              <Container as='span' flex left='xsmall'>
                <QuestionMark16 data-testid='job-information-max-hourly-rate-icon' />
              </Container>
            </Tooltip>
          </Container>
        )
      default:
        const hourlyRateField = wrap(
          <HourlyRateField hourlyRate={maxHourlyRate?.toString()} />
        )

        return job ? (
          <JobMaxHourlyRateWidgets
            expanded={true}
            maxHourlyRate={job.maxHourlyRate as number}
            jobCommitment={job.commitment?.toUpperCase() as string}
            verticalId={job.vertical?.id}
            skillSets={job.skillSets?.nodes as JobSkillSet[]}
          >
            {hourlyRateField}
          </JobMaxHourlyRateWidgets>
        ) : (
          hourlyRateField
        )
    }
  }, [
    budgetDetails,
    job,
    maxHourlyRate,
    uncertainOfBudgetReason,
    uncertainOfBudgetReasonComment
  ])
}

export default MaximumHourlyRateField
