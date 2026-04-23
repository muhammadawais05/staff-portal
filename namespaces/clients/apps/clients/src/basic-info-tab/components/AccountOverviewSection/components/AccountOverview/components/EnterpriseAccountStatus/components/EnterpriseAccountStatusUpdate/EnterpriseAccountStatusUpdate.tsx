import React, { useMemo, useCallback } from 'react'
import { Form } from '@toptal/picasso-forms'
import { ClientEnterpriseAccountStatusEnum } from '@staff-portal/graphql/staff'
import { isOperationDisabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SetUpdateClientEnterpriseAccountStatusDocument } from '../../data'
import EnterpriseAccountStatusView from '../EnterpriseAccountStatusView'
import {
  getEnterpriseAccountStatusHook,
  getEnterpriseAccountStatusAllowedTransactionsHook
} from '../../hooks'
import { CompanyEnterpriseAccountStatusFragment } from '../../../../../../data'

interface Props {
  operation: CompanyEnterpriseAccountStatusFragment['operations']['updateClientEnterpriseAccountStatus']
  status: ClientEnterpriseAccountStatusEnum
  clientId: string
}

const EnterpriseAccountStatusUpdate = ({
  operation,
  status,
  clientId
}: Props) => {
  const useGetEnterpriseAccountStatusHook =
    getEnterpriseAccountStatusHook(clientId)
  const useGetEnterpriseAccountStatusAllowedTransactionsHook =
    getEnterpriseAccountStatusAllowedTransactionsHook(clientId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientEnterpriseAccountStatusDocument,
    initialValues: { enterpriseAccountStatus: status },
    requiredValues: { clientId }
  })
  const operationDisabled = isOperationDisabled(operation)
  const viewer = useMemo(
    () => <EnterpriseAccountStatusView status={status} />,
    [status]
  )
  const editor = useCallback(
    ({ options = [], ...props }) => (
      <Form.Select {...props} options={options} size='small' width='auto' />
    ),
    []
  )

  return (
    <EditableField
      disabled={operationDisabled}
      flex
      name='enterpriseAccountStatus'
      onChange={handleChange}
      queryValue={useGetEnterpriseAccountStatusHook}
      queryOptions={useGetEnterpriseAccountStatusAllowedTransactionsHook}
      value={status}
      viewer={viewer}
      editor={editor}
    />
  )
}

export default EnterpriseAccountStatusUpdate
