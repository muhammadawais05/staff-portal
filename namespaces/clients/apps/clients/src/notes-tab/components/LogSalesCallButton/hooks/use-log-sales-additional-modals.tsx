import { useNotifications } from '@staff-portal/error-handling'
import { useCheckClientCompliance } from '@staff-portal/clients'

import { ClientClaimingOperationsFragment } from '../../../data/client-claiming-operations-fragment'
import { useCompanyActions } from '../../../hooks'
import { LogSalesCallBusinessAction } from '../../../types'
import { useLogSalesCallActionsModal } from '../../LogSalesCallActionsModal'
import { useLogSalesCallChangeClaimer } from '../../LogSalesCallChangeClaimerModal'
import { isLogSalesCallMissingAction } from '../utils'

interface Props {
  clientId: string
  clientName: string
  clientOperations?: ClientClaimingOperationsFragment
  onCheckCompliance?: () => void
  onComplete: () => void
  onChangeClaimerComplete: () => void
}

export const useLogSalesAdditionalModals = ({
  clientId,
  clientName,
  clientOperations,
  onCheckCompliance,
  onComplete,
  onChangeClaimerComplete
}: Props) => {
  const { showError } = useNotifications()

  const [checkClientCompliance, { loading: checkComplianceLoading }] =
    useCheckClientCompliance({
      onCompleted: data => {
        if (data.checkClientCompliance?.success) {
          onCheckCompliance?.()
        }
      },
      onError: () =>
        showError(
          'An error occurred, the client has not passed the compliance check.'
        )
    })

  const { showModal: showLogSalesCallActionsModal } =
    useLogSalesCallActionsModal({
      clientId,
      operations: clientOperations,
      onSubmit: (companyAction: LogSalesCallBusinessAction) => {
        if (isLogSalesCallMissingAction(companyAction)) {
          checkClientCompliance({ variables: { input: { clientId } } })
        } else {
          showCompanyActionModal(companyAction)
        }
      }
    })

  const { showModal: showCompanyActionModal } = useCompanyActions({
    companyId: clientId,
    clientName,
    onClose: showLogSalesCallActionsModal,
    onSuccess: onComplete
  })

  const { showModal: showChangeClaimerModal } = useLogSalesCallChangeClaimer({
    clientName,
    onCompleted: onChangeClaimerComplete
  })

  return {
    loading: checkComplianceLoading,
    showLogSalesCallActionsModal,
    showChangeClaimerModal
  }
}
