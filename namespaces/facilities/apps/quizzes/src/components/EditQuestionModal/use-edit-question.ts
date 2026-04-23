import { useNotifications } from '@toptal/picasso/utils'
import { UpdateTalentQuizQuestionInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUpdateTalentQuizQuestion } from './data/update-talent-quiz-question'

interface Props {
  questionId: string
  onSuccess: () => void
}

const useEditQuestion = ({ questionId, onSuccess }: Props) => {
  const { showError } = useNotifications()

  const [updateTalentQuizQuestion] = useUpdateTalentQuizQuestion({
    onError: () => {
      showError('An error occurred, the Question was not updated.')
    }
  })

  const { handleMutationResult } = useHandleMutationResult()

  const handleSubmit = async (
    values: Omit<UpdateTalentQuizQuestionInput, 'talentQuizQuestionId'>
  ) => {
    const { data } = await updateTalentQuizQuestion({
      variables: {
        input: {
          ...values,
          talentQuizQuestionId: questionId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateTalentQuizQuestion,
      successNotificationMessage: 'The question was successfully updated.',
      onSuccessAction: onSuccess
    })
  }

  return {
    handleSubmit
  }
}

export default useEditQuestion
