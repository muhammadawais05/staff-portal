import React from 'react'
import { Form } from '@toptal/picasso-forms'
import {
  LeadSource,
  UpdateClientLeadSourceInput
} from '@staff-portal/graphql/staff'
import { assertIsNotNullish } from '@staff-portal/utils'
import { titleize } from '@staff-portal/string'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import {
  CompanyOverviewFragment,
  SetUpdateClientLeadSourceDocument
} from '../../../../data'
import { LEAD_SOURCE_ITEMS } from './config'
import { getClientLeadSourceHook } from '../../utils/get-client-lead-source-hook'

interface Props {
  editingDisabled: boolean
  value: CompanyOverviewFragment['leadSource']
  clientId: string
}

const ClientLeadSource = ({
  editingDisabled,
  value = LeadSource.INBOUND,
  clientId
}: Props) => {
  const useGetClientLeadSourceHook = getClientLeadSourceHook(clientId)

  assertIsNotNullish(value)

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientLeadSourceDocument,
    initialValues: { leadSource: value },
    requiredValues: { clientId }
  })

  return (
    <EditableField<UpdateClientLeadSourceInput>
      disabled={editingDisabled}
      flex
      name='leadSource'
      onChange={handleChange}
      queryValue={useGetClientLeadSourceHook}
      value={value}
      viewer={titleize(value)}
      editor={props => (
        <Form.Select
          {...props}
          value={props.value as LeadSource}
          options={LEAD_SOURCE_ITEMS}
          size='small'
          width='auto'
          searchThreshold={0}
        />
      )}
    />
  )
}

export default ClientLeadSource
