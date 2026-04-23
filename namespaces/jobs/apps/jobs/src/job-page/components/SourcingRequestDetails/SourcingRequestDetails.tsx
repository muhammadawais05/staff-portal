import React from 'react'
import { Section } from '@toptal/picasso'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton,
  LinkWrapper
} from '@staff-portal/ui'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { NO_VALUE } from '@staff-portal/config'
import { JOB_UPDATED } from '@staff-portal/jobs'
import {
  SourcingRequestSpecialistField,
  SourcingRequestStatusField
} from '@staff-portal/jobs-sourcing-requests'

import { GetJobSourcingRequestDetailsDocument } from './data/get-job-sourcing-request-details'
import { LABEL_COLUMN_WIDTH } from '../../config'

const renderLink = (text: string, url?: string | null) => (
  <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
    {text}
  </LinkWrapper>
)

interface Props {
  jobId: string
}

const SourcingRequestDetails = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(
    GetJobSourcingRequestDetailsDocument
  )({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (!data && loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Sourcing Request'
        columns={2}
        labelColumnWidth={LABEL_COLUMN_WIDTH}
        items={4}
      />
    )
  }

  if (!data || !data.sourcingRequest) {
    return null
  }

  const { sourcingRequest } = data

  return (
    <Section
      title='Sourcing Request'
      variant='withHeaderBar'
      data-testid='sourcing-request-details'
    >
      <DL labelColumnWidth={LABEL_COLUMN_WIDTH} defaultValue={NO_VALUE}>
        <DL.Row>
          <DL.Item label='Client Partner'>
            {sourcingRequest.clientPartner &&
              renderLink(
                sourcingRequest.clientPartner?.fullName as string,
                sourcingRequest.clientPartner?.webResource?.url
              )}
          </DL.Item>
          {sourcingRequest.salesClaimer && (
            <DL.Item label='Sales Claimer'>
              {renderLink(
                sourcingRequest.salesClaimer.fullName,
                sourcingRequest.salesClaimer.webResource?.url
              )}
            </DL.Item>
          )}
        </DL.Row>
        <DL.Row>
          <DL.Item label='Talent Specialist'>
            <SourcingRequestSpecialistField
              jobId={jobId}
              talentSpecialistId={sourcingRequest.talentSpecialist?.id}
              sourcingRequestId={sourcingRequest.id}
              talentSpecialistFullName={
                sourcingRequest.talentSpecialist?.fullName
              }
              talentSpecialistUrl={
                sourcingRequest.talentSpecialist?.webResource?.url
              }
              operation={
                sourcingRequest.operations?.updateSourcingRequestTalentSpecialist
              }
            />
          </DL.Item>
          <DL.Item label='Status'>
            <SourcingRequestStatusField
              jobId={jobId}
              sourcingRequestId={sourcingRequest.id}
              sourcingRequestStatus={sourcingRequest.status}
              operation={
                sourcingRequest.operations.updateSourcingRequestStatus
              }
            />
          </DL.Item>
        </DL.Row>
      </DL>
    </Section>
  )
}

export default SourcingRequestDetails
