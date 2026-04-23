import React from 'react'

import { EngagementCommonActionsFragment } from '../../data/engagement-common-actions-fragment'
import EngagementOperationButtonWithModal from '../EngagementOperationButtonWithModal'
import { useImportContractAsTopModal } from '../ImportContractAsTopModal'

export type Props = {
  engagement: EngagementCommonActionsFragment
}

const ImportContractAsTopButton = ({ engagement }: Props) => {
  const { id: engagementId } = engagement

  const importContractAsTopModalData = useImportContractAsTopModal({
    engagementId
  })

  return (
    <EngagementOperationButtonWithModal
      titleCase={false}
      engagement={engagement}
      operationName='importContractAsTop'
      modalData={importContractAsTopModalData}
      size='small'
      variant='secondary'
      data-testid='import-sta-as-top'
    >
      Import STA as TOP
    </EngagementOperationButtonWithModal>
  )
}

export default ImportContractAsTopButton
