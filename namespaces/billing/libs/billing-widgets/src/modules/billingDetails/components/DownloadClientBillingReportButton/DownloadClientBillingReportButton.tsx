import React from 'react'
import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

interface Props {
  clientId?: string
  operation?: OperationItemFragment
}

const displayName = 'DownloadClientBillingReportButton'

const DownloadClientBillingReportButton = ({ clientId, operation }: Props) => {
  const { handleOnOpenModal } = useModals()
  const { t: translate } = useTranslation('billingDetails')

  const handleOnDownloadClientBillingReport = () =>
    handleOnOpenModal(ModalKey.clientBillingReportDownload, {
      nodeId: clientId
    })

  return (
    <OperationWrapper operation={operation}>
      <Button
        variant='secondary'
        size='small'
        onClick={handleOnDownloadClientBillingReport}
        data-testid={`${displayName}-download-button`}
      >
        {translate('actions.downloadClientBillingReport.label')}
      </Button>
    </OperationWrapper>
  )
}

DownloadClientBillingReportButton.displayName = displayName

export default DownloadClientBillingReportButton
