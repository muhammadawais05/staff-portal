import { useNotifications } from '@toptal/picasso/utils'
import type { UpdateJobTalentCountInput } from '@staff-portal/graphql/staff'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { UpdateJobTalentCountDocument } from '../data/update-job-talent-count.staff.gql.types'

export const useUpdateNumberOfDesiredHires = (hideModal: () => void) => {
  const emitMessage = useMessageEmitter()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateClientEnterpriseNumberOfDesiredHires, { loading }] = useMutation(
    UpdateJobTalentCountDocument,
    {
      onError: showError
    }
  )

  const handleSubmit = async ({
    talentCount,
    ...variables
  }: UpdateJobTalentCountInput) => {
    const { data } = await updateClientEnterpriseNumberOfDesiredHires({
      variables: {
        input: {
          ...variables,
          talentCount: Number(talentCount)
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateJobTalentCount,
      successNotificationMessage:
        'Number of Desired Hires was successfully updated.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId: variables.jobId })
        hideModal()
      }
    })
  }

  return { handleSubmit, loading }
}
