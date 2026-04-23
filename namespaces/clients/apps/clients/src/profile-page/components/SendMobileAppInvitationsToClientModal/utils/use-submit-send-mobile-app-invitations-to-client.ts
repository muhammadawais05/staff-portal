import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useSendMobileAppInvitationsToClient } from '../data'

type Props = {
  clientId: string
  hideModal: () => void
}

const useSubmitSendMobileAppInvitationsToClient = ({
  clientId,
  hideModal
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [sendMobileAppInvitationsToClient, { loading }] = useSendMobileAppInvitationsToClient()
  const handleSubmit = async () => {
    const { data } = await sendMobileAppInvitationsToClient({
      variables: {
        input: {
          clientId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.sendMobileAppInvitationsToClient,
      successNotificationMessage: 'Invitations for this client has been sent',
      onSuccessAction: hideModal
    })
  }

  return {
    handleSubmit,
    loading
  }
}

export default useSubmitSendMobileAppInvitationsToClient
