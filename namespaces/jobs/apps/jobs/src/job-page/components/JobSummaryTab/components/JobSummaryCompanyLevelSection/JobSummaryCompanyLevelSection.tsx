import React, { useMemo } from 'react'
import { Section, Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import { useGetCompanyLevelData } from './data/get-company-level-data'
import { PrimaryContactField } from './components'
import { getPocRole } from './utils'
import SummaryField from '../SummaryField'
import { COMPANY_LEVEL_TITLE } from '../../../JobDetailsSection/config'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

interface Props {
  jobId: string
}

const JobSummaryCompanyLevelSection = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetCompanyLevelData(jobId)
  const { client, fieldCheck } = data || {}

  const pocRole = useMemo(
    () => getPocRole(client?.representatives?.nodes),
    [client]
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (loading && !client) {
    return (
      <SectionWithDetailedListSkeleton
        title={COMPANY_LEVEL_TITLE}
        labelColumnWidth={LABEL_COLUMN_WIDTH}
        columns={1}
        items={3}
      />
    )
  }

  if (!client) {
    return null
  }

  return (
    <Container top='medium'>
      <Section variant='withHeaderBar' title={COMPANY_LEVEL_TITLE}>
        <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
          <DL.Row>
            <DL.Item label='Company' value={client.legalName} />
            {pocRole && <DL.Item label='POC role' value={pocRole} />}
          </DL.Row>

          <DL.Row>
            <DL.Item label='Primary contact'>
              <PrimaryContactField contact={client.contact} />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Client Time Zone'>
              <SummaryField filled={fieldCheck?.companyTimeZone}>
                {client.timeZone?.name}
              </SummaryField>
            </DL.Item>
          </DL.Row>
        </DL>
      </Section>
    </Container>
  )
}

export default JobSummaryCompanyLevelSection
