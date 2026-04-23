import { useNavigate } from '@staff-portal/navigation'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@toptal/picasso/utils'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { CreateClaimerResult } from '../../types'
import { GetCreateClaimerDetailsQuery } from '../../data'
import { getNextAction } from '../get-next-action/get-next-action'

export const useClaimCompanyNextAction = (hideModal: () => void) => {
  const emitMessage = useMessageEmitter()
  const { showSuccess, showError } = useNotifications()
  const navigate = useNavigate()

  return ({
    company,
    result
  }: {
    result: CreateClaimerResult
    company: NonNullable<GetCreateClaimerDetailsQuery['node']>
  }) => {
    const { successMessage, errorMessage, redirectLink } = getNextAction(
      result,
      company
    )

    if (successMessage) {
      showSuccess(successMessage)
    } else if (errorMessage) {
      showError(errorMessage)
    } else {
      showSuccess('The Company was successfully claimed and assigned to you.')
    }

    navigate(redirectLink)

    // closing modal and triggering an event,
    // since if we're executing the action from the same URL as a redirect link, nothing gonna happen
    hideModal()
    emitMessage(CLIENT_UPDATED, { companyId: company.id })
  }
}
