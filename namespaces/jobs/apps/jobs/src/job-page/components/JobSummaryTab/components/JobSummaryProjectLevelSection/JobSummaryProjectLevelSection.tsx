import React from 'react'
import { Container, Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import { useGetJobProject } from './data'
import { SpecCompletenessField, TypeOfProjectField } from './components'
import { JOB_PROJECT_TEAM_ENVOLVED_MAPPING } from './constants'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

interface Props {
  jobId: string
}

const JobSummaryProjectLevelSection = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetJobProject(jobId)

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (loading && !data) {
    return (
      <SectionWithDetailedListSkeleton
        title='Project Level'
        columns={1}
        labelColumnWidth={12}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container top='medium'>
      <Section variant='withHeaderBar' title='Project Level'>
        <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
          <DL.Row>
            <DL.Item label='Type of Project'>
              <TypeOfProjectField projectType={data.projectType} />
            </DL.Item>
            {data.projectSpecCompleteness && (
              <DL.Item label='Spec Completeness'>
                <SpecCompletenessField
                  projectSpecCompleteness={data.projectSpecCompleteness}
                />
              </DL.Item>
            )}
          </DL.Row>
          <DL.Row>
            <DL.Item
              label='Project team involved'
              value={
                data.projectTeamInvolved &&
                JOB_PROJECT_TEAM_ENVOLVED_MAPPING[data.projectTeamInvolved]
              }
            />
          </DL.Row>
        </DL>
      </Section>
    </Container>
  )
}

export default JobSummaryProjectLevelSection
