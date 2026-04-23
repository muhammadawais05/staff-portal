import { useNotifications } from '@toptal/picasso/utils'
import { CreateTalentQuizQuestionInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCreateTalentQuizQuestion } from './data/create-talent-quiz-question'

interface Props {
  onSuccess: () => void
}

const useAddNewQuestion = ({ onSuccess }: Props) => {
  const { showError } = useNotifications()

  const [createTalentQuizQuestion] = useCreateTalentQuizQuestion({
    onError: () => {
      showError('An error occurred, the Question was not created.')
    }
  })

  const { handleMutationResult } = useHandleMutationResult()

  const handleSubmit = async (values: CreateTalentQuizQuestionInput) => {
    const { data } = await createTalentQuizQuestion({
      variables: { input: values }
    })

    return handleMutationResult({
      mutationResult: data?.createTalentQuizQuestion,
      successNotificationMessage: 'The question was successfully added.',
      onSuccessAction: onSuccess
    })
  }

  return {
    handleSubmit
  }
}

export default useAddNewQuestion
