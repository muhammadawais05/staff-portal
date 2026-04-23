/* eslint-disable complexity */
import React from 'react'
import { Section, TypographyOverflow, Container } from '@toptal/picasso'
import { JobCommitment } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import {
  ESTIMATED_LENGTH_MAPPING,
  getCategoryFieldValue,
  buildHoursOverlapValue,
  CommitmentFormatter
} from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import { GetJobLevelDataDocument } from './data/get-job-level.staff.gql.types'
import SummaryField from '../SummaryField'
import MaximumHourlyRateField from '../../../MaximumHourlyRateField'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

interface Props {
  jobId: string
}

const JobSummaryJobLevelSection = ({ jobId }: Props) => {
  const { data, loading } = useGetNode(GetJobLevelDataDocument)({ jobId })

  if (loading && !data) {
    return (
      <SectionWithDetailedListSkeleton
        title='Job Level'
        columns={2}
        labelColumnWidth={10}
        items={10}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container top='medium'>
      <Section variant='withHeaderBar' title='Job Level'>
        <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
          <DL.Row>
            <DL.Item label='Talent type'>
              <SummaryField filled={data.fieldCheck?.jobType}>
                {titleize(data.jobType)}
              </SummaryField>
            </DL.Item>
            <DL.Item label='Title'>
              <SummaryField filled={data.fieldCheck?.title}>
                <TypographyOverflow size='medium'>
                  {data.title}
                </TypographyOverflow>
              </SummaryField>
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Categories'>
              <SummaryField noMark>
                {!!data.categories?.nodes.length &&
                  getCategoryFieldValue(data.categories.nodes)}
              </SummaryField>
            </DL.Item>
            <DL.Item label='Number of Talent'>
              <SummaryField filled={data.fieldCheck?.talentCount}>
                {data.talentCount}
              </SummaryField>
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Maximum Hourly Rate'>
              <SummaryField filled={data.fieldCheck?.maxHourlyRate}>
                <MaximumHourlyRateField
                  budgetDetails={data.budgetDetails}
                  maxHourlyRate={data.maxHourlyRate}
                  uncertainOfBudgetReason={data.uncertainOfBudgetReason}
                  uncertainOfBudgetReasonComment={
                    data.uncertainOfBudgetReasonComment
                  }
                />
              </SummaryField>
            </DL.Item>
            <DL.Item label='Desired Commitment'>
              {data.commitment && (
                <SummaryField filled={data.fieldCheck?.commitment}>
                  <CommitmentFormatter
                    commitment={data.commitment.toUpperCase() as JobCommitment}
                  />
                </SummaryField>
              )}
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Estimated Length'>
              <SummaryField filled={data.fieldCheck?.estimatedLength}>
                {data.estimatedLength &&
                  ESTIMATED_LENGTH_MAPPING[data.estimatedLength]}
              </SummaryField>
            </DL.Item>
            <DL.Item label='Desired Start Date'>
              <SummaryField filled={data.fieldCheck?.startDate}>
                {data.startDate && parseAndFormatDate(data.startDate)}
              </SummaryField>
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Time Zone Preference'>
              <SummaryField filled={data.fieldCheck?.hasPreferredHours}>
                {data.hasPreferredHours ? 'Yes' : 'No'}
              </SummaryField>
            </DL.Item>
            {data.hasPreferredHours && (
              <DL.Item label='Hours Overlap'>
                <SummaryField filled={data.fieldCheck?.hoursOverlap}>
                  {data.hoursOverlapEnum &&
                    buildHoursOverlapValue(data.hoursOverlapEnum)}
                </SummaryField>
              </DL.Item>
            )}
          </DL.Row>
        </DL>
      </Section>
    </Container>
  )
}

export default JobSummaryJobLevelSection
