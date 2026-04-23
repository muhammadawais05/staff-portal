import { useNotifications } from '@toptal/picasso/utils'
import { CloneTalentQuizQuestionInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCloneQuestions } from './data/clone-questions.staff.gql'

interface Props {
  onSuccess: () => void
}

const useCloneQuestionsForm = ({ onSuccess }: Props) => {
  const { showError } = useNotifications()

  const [createCloneQuestions] = useCloneQuestions({
    onError: () => {
      showError('An error occurred, the Questions were not cloned.')
    }
  })

  const { handleMutationResult } = useHandleMutationResult()

  const handleSubmit = async (values: CloneTalentQuizQuestionInput) => {
    const { data } = await createCloneQuestions({
      variables: { input: values }
    })

    return handleMutationResult({
      mutationResult: data?.cloneTalentQuizQuestion,
      successNotificationMessage: 'Questions were successfully cloned.',
      onSuccessAction: onSuccess
    })
  }

  return {
    handleSubmit
  }
}

export default useCloneQuestionsForm
