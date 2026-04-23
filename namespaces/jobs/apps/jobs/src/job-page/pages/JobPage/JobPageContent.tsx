import React from 'react'
import { Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { PersistentFormProvider } from '@staff-portal/forms'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  JOB_UPDATED,
  ProbabilityToConvert,
  JobBadges,
  JobTabValue
} from '@staff-portal/jobs'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'
import { NavigationTabsProvider } from '@staff-portal/ui'

import { useGetJobPageData } from './data/get-job-page-data'
import { JobActions, JobTabsList, JobTabPanel } from '../../components'
import EditRequestButton from '../../components/EditRequestButton/EditRequestButton'

type Props = {
  jobId: string
}

const JobPageContent = ({ jobId }: Props) => {
  const { data: job, loading, refetch } = useGetJobPageData(jobId)
  const isJobLoading = loading && !job

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(
    ENGAGEMENT_UPDATED,
    ({ engagementId }) =>
      engagementId === job?.jobCurrentEngagement?.id && refetch()
  )

  const jobTitle = job?.title
  const browserTitle = job ? `${jobTitle} (Job Details)` : undefined

  return (
    <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
      <NavigationTabsProvider tabValues={JobTabValue}>
        {({ activeTabValue }) => (
          <ContentWrapper
            title={jobTitle}
            browserTitle={browserTitle}
            titleLoading={isJobLoading}
            actions={<JobActions loading={isJobLoading} job={job} />}
            titleTags={
              <JobBadges
                enterprise={job?.client?.enterprise}
                rehire={job?.rehire}
                automatedAvailabilityRequests={
                  job?.automatedAvailabilityRequests
                }
              />
            }
            additionalStatusMessages={
              <NodeStatusMessageNotifications id={jobId} />
            }
            tabs={
              <Container flex justifyContent='space-between'>
                <JobTabsList jobId={jobId} tabValues={JobTabValue} />

                <Container left='small' flex alignItems='center'>
                  <ProbabilityToConvert
                    probabilityToConvertData={job?.probabilityToConvert}
                    estimatedRevenue={job?.estimatedRevenue}
                    estimatedValue={job?.estimatedValue}
                  />

                  {activeTabValue === JobTabValue.SOURCING_REQUEST && (
                    <EditRequestButton
                      updateSourcingRequestOperation={
                        job?.sourcingRequest?.operations?.updateSourcingRequest
                      }
                      sourcingRequestId={job?.sourcingRequest?.id}
                    />
                  )}
                </Container>
              </Container>
            }
          >
            <JobTabPanel jobId={jobId} tabValues={JobTabValue} />
          </ContentWrapper>
        )}
      </NavigationTabsProvider>
    </PersistentFormProvider>
  )
}

export default JobPageContent
