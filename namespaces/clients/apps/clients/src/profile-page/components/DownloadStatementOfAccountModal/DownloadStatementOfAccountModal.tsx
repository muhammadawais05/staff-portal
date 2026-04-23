import React from 'react'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { DownloadForPeriodModal } from '@staff-portal/facilities'

import { useDownloadStatementsOfAccount } from './data'
import { useHandleSubmit } from './utils'

type Props = {
  companyId: string
  hideModal: () => void
  operationVariables?: GetLazyOperationVariables
}

const DownloadStatementOfAccountModal = ({
  companyId,
  operationVariables,
  hideModal
}: Props) => {
  const [downloadDocument, { loading }] = useDownloadStatementsOfAccount()
  const handleSubmit = useHandleSubmit(downloadDocument, companyId, hideModal)

  return (
    <DownloadForPeriodModal
      title='Statement of Account'
      downloadButtonText='Download PDF'
      onSubmit={handleSubmit}
      loading={loading}
      hideModal={hideModal}
      operationVariables={operationVariables}
    />
  )
}

export default DownloadStatementOfAccountModal
