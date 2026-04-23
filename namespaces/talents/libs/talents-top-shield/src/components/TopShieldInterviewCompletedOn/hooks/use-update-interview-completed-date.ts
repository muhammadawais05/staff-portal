import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { UpdateTopShieldApplicationInterviewCompletedDateInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationInterviewCompletedDateDocument } from '../data/update-top-shield-application-interview-completed-date'

const ERROR_MESSAGE = 'Unable to update interview completed date.'

export const useUpdateInterviewCompletedDate = (
  topShieldApplicationId: string
) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateInterviewCompletedDate, { loading: updateLoading }] =
    useMutation(UpdateTopShieldApplicationInterviewCompletedDateDocument, {
      onError: () => showError(ERROR_MESSAGE)
    })

  const handleChange = async (
    key: 'interviewCompletedDate',
    values: Partial<UpdateTopShieldApplicationInterviewCompletedDateInput>
  ) => {
    const { data } = await updateInterviewCompletedDate({
      variables: {
        input: {
          topShieldApplicationId,
          interviewCompletedDate: values.interviewCompletedDate
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTopShieldApplicationInterviewCompletedDate
    })
  }

  return { handleChange, loading: updateLoading }
}
