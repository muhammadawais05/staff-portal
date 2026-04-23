import React from 'react'
import { Form } from '@toptal/picasso-forms'
import {
  BusinessTypes,
  UpdateClientBusinessTypeInput
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'
import {
  CLIENT_UPDATED,
  BUSINESS_TYPE_OPTIONS,
  BUSINESS_TYPE_ITEMS
} from '@staff-portal/clients'

import { SetUpdateClientBusinessTypeDocument } from '../../../../data/set-update-client-business-type.staff.gql.types'
import { getClientBusinessTypeHook } from '../../utils/get-client-business-type-hook'

interface Props {
  editingDisabled: boolean
  value?: BusinessTypes
  clientId: string
}

const ClientBusinessType = ({ editingDisabled, value, clientId }: Props) => {
  const useGetClientBusinessTypeHook = getClientBusinessTypeHook(clientId)

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientBusinessTypeDocument,
    mutationResultOptions: {
      successMessageEmitOptions: {
        type: CLIENT_UPDATED,
        payload: { companyId: clientId }
      }
    },
    initialValues: { businessType: value },
    requiredValues: { clientId }
  })

  const viewerValue = value ? BUSINESS_TYPE_ITEMS[value].text : NO_VALUE

  return (
    <EditableField<UpdateClientBusinessTypeInput>
      disabled={editingDisabled}
      flex
      name='businessType'
      onChange={handleChange}
      queryValue={useGetClientBusinessTypeHook}
      value={value}
      viewer={viewerValue}
      editor={props => (
        <Form.Select
          {...props}
          value={value}
          options={BUSINESS_TYPE_OPTIONS}
          size='small'
          width='auto'
          searchThreshold={0}
        />
      )}
    />
  )
}

export default ClientBusinessType
