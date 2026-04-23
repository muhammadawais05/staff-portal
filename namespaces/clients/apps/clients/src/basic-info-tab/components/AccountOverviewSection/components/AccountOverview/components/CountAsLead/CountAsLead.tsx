import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'
import { YesOrNoDropdown } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { SetUpdateCountAsLeadDocument } from '../../../../data/set-update-client-count-as-lead.staff.gql.types'
import { getClientCountAsLeadHook } from '../../utils'
import { CompanyOverviewFragment } from '../../../../data'

interface Props {
  clientId: string
  value: CompanyOverviewFragment['countAsLead']
  operation: CompanyOperationFragment
}

const CountAsLead = ({ value, operation, clientId }: Props) => {
  const useGetClientCountAsLead = getClientCountAsLeadHook(clientId)
  const onChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateCountAsLeadDocument,
    initialValues: { countAsLead: value ?? undefined },
    requiredValues: { clientId }
  })

  return (
    <YesOrNoDropdown
      disabled={!isOperationEnabled(operation)}
      name='countAsLead'
      onChange={onChange}
      value={Number(value)}
      queryValue={useGetClientCountAsLead}
    />
  )
}

export default CountAsLead
