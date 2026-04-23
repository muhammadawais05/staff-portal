import { useModal } from '@staff-portal/modals-service'

import ImportContractAsTopModal, {  Props as ImportContractAsTopModalProps } from '../ImportContractAsTopModal'

type Props = Pick<ImportContractAsTopModalProps, 'engagementId'>

const useImportContractAsTopModal = ({ engagementId }: Props) => {
  const { showModal } = useModal(ImportContractAsTopModal, { engagementId })

  return {
    showModal
  }
}

export default useImportContractAsTopModal
