import React, { memo } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode, BATCH_KEY } from '@staff-portal/data-layer-service'
import { Link } from '@staff-portal/navigation'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { SubSection, DetailedList as DL } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import {
  JOB_UPDATED,
  JobFulfillmentStatus,
  JobStatus,
  showJobFulfillmentStatus
} from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import {
  COMPANY_INFORMATION_TITLE,
  JOB_GENERAL_DETAILS_BATCH_KEY
} from '../../config'
import { GetJobCompanyDataDocument } from './data/get-job-company-data.staff.gql.types'
import {
  CompanyField,
  EmailsAndFlagsField,
  RecruiterField,
  StaffField
} from './components'
import CompanyInformationSkeleton from './CompanyInformationSkeleton'
import SalesOwnerField from './components/SalesOwnerField/SalesOwnerField'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

interface Props {
  jobId: string
}

// eslint-disable-next-line complexity
const CompanyInformation = ({ jobId }: Props) => {
  const {
    loading,
    data: job,
    refetch
  } = useGetNode(GetJobCompanyDataDocument)(
    { jobId },
    { context: { [BATCH_KEY]: JOB_GENERAL_DETAILS_BATCH_KEY } }
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (!job && loading) {
    return <CompanyInformationSkeleton />
  }

  if (!job) {
    return null
  }

  const {
    client,
    postedAt,
    status,
    talentCount,
    claimer,
    claimerHandoff,
    operations
  } = job

  return (
    <SubSection title={COMPANY_INFORMATION_TITLE}>
      <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
        <DL.Row>
          <DL.Item label='Company'>
            <CompanyField webResource={client.webResource} />
          </DL.Item>
          <DL.Item label='Recruiter'>
            <RecruiterField
              jobId={jobId}
              claimer={claimer}
              claimerReplacement={claimerHandoff?.replacement}
              operation={operations?.updateJobClaimer}
            />
          </DL.Item>
        </DL.Row>

        {(client.emailMessagesUrl || client.jobsUrl) && (
          <DL.Row>
            {client.emailMessagesUrl && (
              <DL.Item label='Emails and Flags'>
                <EmailsAndFlagsField
                  emailMessagesUrl={client.emailMessagesUrl}
                />
              </DL.Item>
            )}
            {client.jobsUrl && (
              <DL.Item label='Jobs'>
                <Link
                  href={client.jobsUrl}
                  data-testid='company-information-jobs-url'
                >
                  View All Jobs
                </Link>
              </DL.Item>
            )}
          </DL.Row>
        )}

        <DL.Row>
          <DL.Item
            label='Job Posted'
            value={postedAt && getDateDistanceFromNow(postedAt)}
          />
          {showJobFulfillmentStatus(talentCount, status) ? (
            <DL.Item label='Fulfillment Status'>
              <JobFulfillmentStatus job={job} />
            </DL.Item>
          ) : (
            <DL.Item label='Status'>
              <JobStatus job={job} />
            </DL.Item>
          )}
        </DL.Row>

        {client.enterprise ? (
          <DL.Row>
            <DL.Item label='Client Partner'>
              {client.clientPartner && (
                <StaffField
                  url={client.clientPartner.webResource.url}
                  fullName={client.clientPartner.webResource.text}
                  testId='client-partner-field'
                />
              )}
            </DL.Item>
            <DL.Item label='Sales Claimer'>
              {client.claimer && (
                <StaffField
                  url={client.claimer.webResource.url}
                  fullName={client.claimer.webResource.text}
                  testId='sales-claimer-field'
                />
              )}
            </DL.Item>
          </DL.Row>
        ) : (
          <DL.Row>
            {client.relationshipManager ? (
              <DL.Item label='Relationship Manager'>
                <StaffField
                  url={client.relationshipManager.webResource.url}
                  fullName={client.relationshipManager.webResource.text}
                  testId='relationship-manager-field'
                />
              </DL.Item>
            ) : client.accountManager ? (
              <DL.Item label='Account Manager'>
                <StaffField
                  url={client.accountManager.webResource.url}
                  fullName={client.accountManager.webResource.text}
                  testId='account-manager-field'
                />
              </DL.Item>
            ) : (
              client.claimer && (
                <DL.Item label='Sales Claimer'>
                  <StaffField
                    url={client.claimer.webResource.url}
                    fullName={client.claimer.webResource.text}
                    testId='sales-claimer-field'
                  />
                </DL.Item>
              )
            )}

            <DL.Item label='Sales Owner'>
              <SalesOwnerField jobId={jobId} />
            </DL.Item>
          </DL.Row>
        )}
      </DL>
    </SubSection>
  )
}

export default memo(CompanyInformation)
