import { CompanyAction } from '@staff-portal/graphql/staff'
import {
  useMarkAsBadLeadModal,
  usePauseClientModal,
  useRepauseCompanyModal,
  useResumeCompanyModal
} from '@staff-portal/clients'

import {
  useRestoreApplicationModal,
  useRestoreFromBadLeadPrompt
} from '../../modals'
import { useClientApproveModal } from '../components/ClientApproveModal'

export const useCompanyActions = ({
  companyId,
  clientName,
  onClose,
  onSuccess
}: {
  companyId: string
  clientName?: string
  onClose?: () => void
  onSuccess?: () => void
}) => {
  const { showModal: showMarkAsBadLeadModal } = useMarkAsBadLeadModal({
    clientId: companyId,
    onClose,
    onSuccess
  })

  const { showModal: showPauseClientModal } = usePauseClientModal({
    clientId: companyId,
    onClose,
    onSuccess
  })

  const { showModal: showRepauseCompanyModal } = useRepauseCompanyModal({
    companyId,
    onClose,
    onSuccess
  })

  const { showModal: showResumeCompanyModal } = useResumeCompanyModal({
    companyId,
    onClose,
    onSuccess
  })

  const { showModal: showRestoreApplicationModal } = useRestoreApplicationModal(
    { companyId, onClose, onSuccess }
  )

  const { showModal: showClientApproveModal } = useClientApproveModal({
    clientId: companyId,
    onClose,
    onSuccess
  })

  const { showModal: showRestoreFromBadLeadPrompt } =
    useRestoreFromBadLeadPrompt(clientName)

  return {
    showRestoreFromBadLeadPrompt,
    showModal: (companyAction: CompanyAction) => {
      switch (companyAction) {
        case CompanyAction.BAD_LEAD:
          setTimeout(() => showMarkAsBadLeadModal(), 500)
          break
        case CompanyAction.PAUSE:
          showPauseClientModal()
          break
        case CompanyAction.REPAUSE:
          showRepauseCompanyModal()
          break
        case CompanyAction.RESUME:
          showResumeCompanyModal()
          break
        case CompanyAction.RESTORE:
          showRestoreApplicationModal()
          break
        case CompanyAction.APPROVE:
          showClientApproveModal()
          break
      }
    }
  }
}
