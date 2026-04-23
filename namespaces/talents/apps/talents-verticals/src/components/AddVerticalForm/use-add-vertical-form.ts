import { useNotifications } from '@toptal/picasso/utils'
import { CreateVerticalInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCreateVerticalMutation } from './data/create-vertical'

export interface FormData {
  talentType: string
  publicPagesPath: string
}

interface Props {
  onSuccess: () => void
}

const useAddVerticalForm = ({ onSuccess }: Props) => {
  const { showError } = useNotifications()

  const [createVertical] = useCreateVerticalMutation({
    onError: () => {
      showError('An error occurred, the vertical was not created.')
    }
  })

  const { handleMutationResult } = useHandleMutationResult()

  const handleSubmit = async (values: CreateVerticalInput) => {
    const { data } = await createVertical({
      variables: { input: values }
    })

    return handleMutationResult({
      mutationResult: data?.createVertical,
      successNotificationMessage: 'The vertical was successfully added.',
      onSuccessAction: onSuccess
    })
  }

  return {
    handleSubmit
  }
}

export default useAddVerticalForm
