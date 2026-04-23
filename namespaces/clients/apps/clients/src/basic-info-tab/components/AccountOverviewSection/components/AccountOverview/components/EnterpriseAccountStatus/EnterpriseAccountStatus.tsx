import React from 'react'
import { assertIsNotNullish } from '@staff-portal/utils'
import { isOperationHidden } from '@staff-portal/operations'

import {
  EnterpriseAccountStatusRestore,
  EnterpriseAccountStatusUpdate
} from './components'
import { CompanyEnterpriseAccountStatusFragment } from '../../../../data'

interface Props {
  clientId: string
  enterpriseAccountStatus: CompanyEnterpriseAccountStatusFragment['enterpriseAccountStatus']
  restoreClientEnterpriseAccountStatus: CompanyEnterpriseAccountStatusFragment['operations']['restoreClientEnterpriseAccountStatus']
  updateClientEnterpriseAccountStatus: CompanyEnterpriseAccountStatusFragment['operations']['updateClientEnterpriseAccountStatus']
}

const EnterpriseAccountStatus = ({
  clientId,
  enterpriseAccountStatus,
  restoreClientEnterpriseAccountStatus,
  updateClientEnterpriseAccountStatus
}: Props) => {
  const isUpdateClientEnterpriseAccountStatusHidden = isOperationHidden(
    updateClientEnterpriseAccountStatus
  )

  assertIsNotNullish(enterpriseAccountStatus?.status)

  return isUpdateClientEnterpriseAccountStatusHidden ? (
    <EnterpriseAccountStatusRestore
      operation={restoreClientEnterpriseAccountStatus}
      status={enterpriseAccountStatus?.status}
      clientId={clientId}
    />
  ) : (
    <EnterpriseAccountStatusUpdate
      operation={updateClientEnterpriseAccountStatus}
      status={enterpriseAccountStatus?.status}
      clientId={clientId}
    />
  )
}

export default EnterpriseAccountStatus
