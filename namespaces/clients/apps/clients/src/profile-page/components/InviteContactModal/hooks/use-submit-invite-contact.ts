import type { InviteCompanyRepresentativeInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useInviteContact } from '../data'
import useNavigateToCompanyRepresentative from './use-navigate-to-company-representative'

const useSubmitInviteContact = () => {
  const { handleMutationResult } = useHandleMutationResult()
  const [inviteContact, { loading }] = useInviteContact()
  const { navigateToCompanyRepresentative } = useNavigateToCompanyRepresentative()
  const handleSubmit = async (input: InviteCompanyRepresentativeInput) => {
    const { data } = await inviteContact({
      variables: {
        input
      }
    })

    return handleMutationResult({
      mutationResult: data?.inviteCompanyRepresentative,
      successNotificationMessage: 'The Invitation was successfully sent.',
      onSuccessAction: navigateToCompanyRepresentative
    })
  }

  return {
    handleSubmit,
    loading
  }
}

export default useSubmitInviteContact
