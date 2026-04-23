import React, { useMemo } from 'react'
import { Section, Menu, Container } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { JobStatus } from '@staff-portal/graphql/staff'
import { isOperationEnabled, Operation } from '@staff-portal/operations'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { MoreButton } from '@staff-portal/ui'
import { useSelectableItems } from '@staff-portal/utils'

import JobApplicantsTable from '../JobApplicantsTable'
import JobApplicantsLoader from '../JobApplicantsLoader'
import RejectJobApplicantsModal from '../RejectJobApplicantsModal'
import {
  useGetJobApplications,
  JobApplicationItemFragment
} from './data/get-job-applications'
import { useGetJobApplicantsOperations } from './data/get-job-applicants-operations'
import { useSendJobApplicantsEmailModal } from '../SendJobApplicantsEmailModal/services/use-send-job-applicants-email-modal/use-send-job-applicants-email-modal'

export interface Props {
  jobId: string
}

const JobApplicantsSection = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetJobApplications(jobId)
  const { data: operations } = useGetJobApplicantsOperations()

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  const jobApplications = useMemo(() => data?.applications?.nodes || [], [data])
  const jobApplicationIds = useMemo(
    () => jobApplications.map(({ id }) => id),
    [jobApplications]
  )

  const {
    selectedIds,
    selectItem,
    deselectItem,
    selectAllItems,
    deselectAllItems
  } = useSelectableItems(jobApplicationIds)

  const { showModal: showSendJobApplicantsEmailModal } =
    useSendJobApplicantsEmailModal({ jobApplicationIds: selectedIds, jobId })

  const selectedJobApplications = useMemo(
    () =>
      selectedIds.map(
        id =>
          jobApplications.find(
            ({ id: jobApplicationId }) => jobApplicationId === id
          ) as JobApplicationItemFragment
      ),
    [jobApplications, selectedIds]
  )
  const { showModal: showRejectApplicantsModal } = useModal(
    RejectJobApplicantsModal,
    {
      jobId,
      jobApplications: selectedJobApplications
    }
  )

  const hasEnabledOperation = useMemo(() => {
    const list = [
      operations?.rejectJobApplicants,
      operations?.emailJobApplicants
    ]

    return list.some(item => isOperationEnabled(item))
  }, [operations])

  const displaySection =
    data &&
    !!data.applications?.nodes?.length &&
    data.status === JobStatus.PENDING_ENGINEER

  const showLoader = loading && !data

  const disableBulkActions = selectedIds.length === 0

  if (!loading && !displaySection) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        data-testid='job-applicants-section'
        variant='withHeaderBar'
        title='Job Applicants'
        actions={
          !showLoader &&
          hasEnabledOperation && (
            <MoreButton hidden={false}>
              <Operation
                operation={operations?.rejectJobApplicants}
                render={disabled =>
                  !disabled && (
                    <Menu.Item
                      disabled={disableBulkActions || disabled}
                      onClick={() => showRejectApplicantsModal()}
                    >
                      Reject Applications
                    </Menu.Item>
                  )
                }
              />
              <Operation
                operation={operations?.emailJobApplicants}
                render={disabled =>
                  !disabled && (
                    <Menu.Item
                      disabled={disableBulkActions || disabled}
                      onClick={() => showSendJobApplicantsEmailModal()}
                    >
                      Email Applicants
                    </Menu.Item>
                  )
                }
              />
            </MoreButton>
          )
        }
      >
        {showLoader ? (
          <JobApplicantsLoader rows={5} />
        ) : (
          <JobApplicantsTable
            jobApplications={jobApplications}
            selectedIds={selectedIds}
            onItemSelect={selectItem}
            onItemDeselect={deselectItem}
            onAllItemsSelect={selectAllItems}
            onAllItemsDeselect={deselectAllItems}
            jobId={jobId}
          />
        )}
      </Section>
    </Container>
  )
}

export default JobApplicantsSection
