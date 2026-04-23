import React, { memo } from 'react'
import { Container, Section, Typography } from '@toptal/picasso'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton,
  SubSection
} from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import { TalentTopShieldFragment } from '@staff-portal/talents-top-shield'
import { TopShieldApplicationStatus } from '@staff-portal/graphql/staff'
import { formatDate } from '@staff-portal/date-time-utils'

import { getJobBreaksDaysCount, getWeeklyWorkingHours } from '../../utils'

export interface Props {
  talentTopShield: TalentTopShieldFragment | null
  loading: boolean
}

const EngagementsDetails = ({ talentTopShield, loading }: Props) => {
  const isFormer =
    talentTopShield?.topShieldApplication?.status ===
    TopShieldApplicationStatus.FORMER
  const engagements = talentTopShield?.engagements.nodes

  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Engagements Details'
        columns={2}
        items={4}
      />
    )
  }

  if (!talentTopShield || engagements?.length === 0 || isFormer) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        title='Engagements Details'
        data-testid='engagments-details-section'
      >
        {engagements?.map(engagement => (
          <SubSection key={engagement.id}>
            <Container bottom='xsmall'>
              <Typography variant='heading' size='small'>
                {engagement.job?.title}
              </Typography>
            </Container>

            <DL labelColumnWidth={12}>
              <DL.Row>
                <DL.Item label='Working Status'>
                  <Typography color='green'>Working</Typography>
                </DL.Item>
                <DL.Item
                  label='Estimated Job End Date'
                  value={
                    engagement.job?.estimatedEndDate
                      ? formatDate(new Date(engagement.job.estimatedEndDate))
                      : NO_VALUE
                  }
                />
              </DL.Row>
              <DL.Row>
                <DL.Item
                  label='Hours logged in Last 7 Days'
                  value={getWeeklyWorkingHours(talentTopShield, engagement)}
                />
                <DL.Item
                  label='Job Breaks in Day count'
                  value={getJobBreaksDaysCount(engagement)}
                />
              </DL.Row>
              <DL.Row>
                <DL.Item
                  label='Start Date'
                  value={
                    engagement.startDate
                      ? formatDate(new Date(engagement.startDate))
                      : NO_VALUE
                  }
                />
              </DL.Row>
            </DL>
          </SubSection>
        ))}
      </Section>
    </Container>
  )
}

export default memo(EngagementsDetails)
