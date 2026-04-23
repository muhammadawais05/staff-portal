import { ModalSuspender, ModalForm } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useCallback, useMemo } from 'react'
import { arrayMutators, FormApi } from '@toptal/picasso-forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ApproveJobForm } from '../../types'
import ApproveJobSteps from '../ApproveJobSteps'
import ApproveJobModalTitle from '../ApproveJobModalTitle'
import ScrollToTop from '../ScrollToTop'
import { useApproveJob, useGetApproveJobDetails } from '../../data'
import { getInitialFormValues, transformApproveJobInput } from './utils'

interface Props {
  jobId: string
  hideModal: () => void
  onApproveJob: () => void
}

const ApproveJobModalContent = ({ jobId, onApproveJob, hideModal }: Props) => {
  const { data: additionalDetails, loading } = useGetApproveJobDetails(jobId)
  const { showSuccess } = useNotifications()
  const [approveJob] = useApproveJob()
  const { handleMutationResult } = useHandleMutationResult()

  const initialFormValues = useMemo<ApproveJobForm | undefined>(
    () =>
      (additionalDetails?.node &&
        getInitialFormValues({
          job: additionalDetails.node,
          inTalentMatchers: !!additionalDetails.viewer.me.inTalentMatchers,
          canManageJobMaxHourlyRate:
            additionalDetails.viewer.permits.canManageJobMaxHourlyRate,
          activeJobPositionQuestionTemplates:
            additionalDetails.activeJobPositionQuestionTemplates.nodes
        })) ||
      undefined,
    [additionalDetails]
  )

  const handleSubmit = useCallback(
    async (
      approveJobFormValues: ApproveJobForm,
      form: FormApi<ApproveJobForm>
    ) => {
      const { data } = await approveJob({
        variables: {
          input: transformApproveJobInput(jobId, approveJobFormValues)
        }
      })

      return handleMutationResult({
        mutationResult: data?.approveJob,
        onSuccessAction: () => {
          const { skipSkillsChecks, skipQualityChecks } = approveJobFormValues

          /*
          Step logic:
          skipSkillsChecks && skipQualityChecks => step 1
          !skipSkillsChecks && skipQualityChecks => step 2
          !skipSkillsChecks && !skipQualityChecks => step 3
        */
          if (skipSkillsChecks) {
            form.change('skipSkillsChecks', false)

            return
          }

          if (skipQualityChecks) {
            form.change('skipQualityChecks', false)

            return
          }

          showSuccess('The Job was successfully approved.')
          onApproveJob()
          hideModal()
        }
      })
    },
    [
      approveJob,
      handleMutationResult,
      hideModal,
      jobId,
      onApproveJob,
      showSuccess
    ]
  )

  if (loading) {
    return <ModalSuspender />
  }

  if (!additionalDetails?.node) {
    return null
  }

  const {
    node: job,
    jobLongshotReasons,
    jobUncertainOfBudgetReasons,
    viewer: {
      me: { inTalentMatchers },
      permits: { canManageJobMaxHourlyRate }
    }
  } = additionalDetails

  return (
    <ModalForm<ApproveJobForm>
      initialValues={initialFormValues}
      onSubmit={handleSubmit}
      mutators={{ ...arrayMutators }}
      title={<ApproveJobModalTitle />}
    >
      <ScrollToTop />
      <ApproveJobSteps
        job={job}
        jobLongshotReasons={jobLongshotReasons}
        jobUncertainOfBudgetReasons={jobUncertainOfBudgetReasons}
        inTalentMatchers={!!inTalentMatchers}
        canManageJobMaxHourlyRate={canManageJobMaxHourlyRate}
        onClose={hideModal}
      />
    </ModalForm>
  )
}

export default ApproveJobModalContent
