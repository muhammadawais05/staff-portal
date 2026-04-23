import { DisableMobileAppForClientInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useDisableMobileApp } from '../data'

const useDisableMobileAppSubmit = ({
  hideModal,
  companyId
}: {
  hideModal: () => void
  companyId: string
}) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [disableMobileAppForClient, { loading }] = useDisableMobileApp()

  const handleSubmit = async (comment = '') => {
    const input: DisableMobileAppForClientInput = {
      clientId: companyId,
      comment
    }

    const { data } = await disableMobileAppForClient({
      variables: { input }
    })

    return handleMutationResult({
      mutationResult: data?.disableMobileAppForClient,
      successNotificationMessage:
        'Mobile access has been disabled for this company.',
      onSuccessAction: hideModal,
      isFormSubmit: true
    })
  }

  return { handleSubmit, loading }
}

export default useDisableMobileAppSubmit
