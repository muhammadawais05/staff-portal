import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateJobEstimatedEndDateInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { UpdateJobEstimatedEndDateDocument } from '../data/update-job-estimated-end-date'
import { ResetJobEstimatedEndDateDocument } from '../data/reset-job-estimated-end-date'

const ERROR_MESSAGE = 'Unable to update estimated end date.'

export const useUpdateEstimatedEndDate = (jobId: string) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateJobEstimatedEndDate, { loading: updateLoading }] = useMutation(
    UpdateJobEstimatedEndDateDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const [resetJobEstimatedEndDate, { loading: resetLoading }] = useMutation(
    ResetJobEstimatedEndDateDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleChange = async (
    key: 'estimatedEndDate',
    values: Partial<UpdateJobEstimatedEndDateInput>
  ) => {
    if (!values.estimatedEndDate) {
      const { data } = await resetJobEstimatedEndDate({
        variables: {
          input: {
            jobId
          }
        }
      })

      return handleMutationResult({
        mutationResult: data?.resetJobEstimatedEndDate,
        onSuccessAction: () => {
          emitMessage(JOB_UPDATED, { jobId })
        }
      })
    }

    const { data } = await updateJobEstimatedEndDate({
      variables: {
        input: {
          jobId,
          estimatedEndDate: values.estimatedEndDate
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateJobEstimatedEndDate,
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  return { handleChange, loading: updateLoading || resetLoading }
}
