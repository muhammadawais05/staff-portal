import { DocumentNode, useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

interface Props {
  hideModal: () => void
  mutationDocument: DocumentNode
  mutationName: string
}

const useRequestTransfer = <FormInput>({
  hideModal,
  mutationDocument,
  mutationName
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [mutation, { loading }] = useMutation(mutationDocument)

  const handleSubmit = async (input: FormInput) => {
    const { data } = await mutation({
      variables: {
        input
      }
    })

    return handleMutationResult({
      mutationResult: data?.[mutationName],
      successNotificationMessage:
        'Your request for transfer on this lead was successfully submitted.',
      onSuccessAction: hideModal
    })
  }

  return { handleSubmit, submitting: loading }
}

export default useRequestTransfer
