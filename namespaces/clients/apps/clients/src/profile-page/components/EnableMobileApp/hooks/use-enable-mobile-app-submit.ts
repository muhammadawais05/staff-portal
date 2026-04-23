import { EnableMobileAppForClientInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useEnableMobileApp } from '../data'

const useEnableMobileAppSubmit = ({
  hideModal,
  companyId
}: {
  hideModal: () => void
  companyId: string
}) => {
  const { handleMutationResult } = useHandleMutationResult()

  const [enableMobileAppForClient, { loading }] = useEnableMobileApp()

  const handleSubmit = async (comment = '') => {
    const input: EnableMobileAppForClientInput = {
      clientId: companyId,
      comment
    }

    const { data } = await enableMobileAppForClient({
      variables: { input }
    })

    return handleMutationResult({
      mutationResult: data?.enableMobileAppForClient,
      successNotificationMessage:
        'Mobile access has been enabled for this company.',
      onSuccessAction: hideModal,
      isFormSubmit: true
    })
  }

  return { handleSubmit, loading }
}

export default useEnableMobileAppSubmit
