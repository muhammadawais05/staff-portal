import React from 'react'
import { Container, Typography, Section } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'
import { SourcingRequestBusinessTypeField } from '@staff-portal/jobs-sourcing-requests'

import EnterpriseJobStatus from '../EnterpriseJobStatus'
import { GetJobSourcingRequestAccountInfoDocument } from './data/get-job-sourcing-request-details'

interface Props {
  jobId: string
}

export const SourcingRequestAccountInformation = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(
    GetJobSourcingRequestAccountInfoDocument
  )({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (!data && loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Account Information'
        columns={2}
        labelColumnWidth={14}
        items={3}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container top='medium'>
      <Section title='Account Information' variant='withHeaderBar'>
        <DL defaultValue={NO_VALUE} labelColumnWidth={14}>
          <DL.Row>
            <DL.Item label='Business Type'>
              <SourcingRequestBusinessTypeField
                businessType={data.client.businessType}
                isEnterprise={data.client.enterprise}
              />
            </DL.Item>
            <DL.Item
              label={`Can the client's company name be shared?`}
              multilines
              titleCaseLabels={false}
            >
              <span data-testid='sourcing-request-shared-field'>
                {data.sourcingRequest?.canShareCompanyName ? 'Yes' : 'No'}
              </span>
            </DL.Item>
          </DL.Row>

          {data.client.enterprise && (
            <DL.Row>
              <DL.Item label='Enterprise Job Status'>
                <span data-testid='sourcing-request-enterprise-job-status'>
                  {!data.sourcingRequest?.enterpriseJobStatus ? (
                    <Typography color='red'>Requires Update</Typography>
                  ) : (
                    <EnterpriseJobStatus
                      enterpriseJobStatus={
                        data.sourcingRequest?.enterpriseJobStatus
                      }
                    />
                  )}
                </span>
              </DL.Item>
            </DL.Row>
          )}
        </DL>
      </Section>
    </Container>
  )
}

export default SourcingRequestAccountInformation
