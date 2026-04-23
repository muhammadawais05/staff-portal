import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { UpdateClientBillingEnabledInput } from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getClientBillingOptionsUpdateHook } from '../../utils'
import {
  SetUpdateClientBillingEnabledDocument,
  CompanyOverviewFragment
} from '../../../../data'

interface Props {
  clientId: string
  value: CompanyOverviewFragment['billingOptionsUpdateEnabled']
  editingDisabled: boolean
}

const BILLING_OPTIONS_UPDATE: Option[] = [
  { text: 'Enabled', value: 1 },
  { text: 'Disabled', value: 0 }
]

const getClientBillingOptionsUpdateDisplay = (
  value: CompanyOverviewFragment['billingOptionsUpdateEnabled']
) => (value ? 'Enabled' : 'Disabled')

const BillingOptionsUpdate = ({
  clientId,
  value: billingOptionsUpdateEnabled,
  editingDisabled
}: Props) => {
  const value = billingOptionsUpdateEnabled ?? true
  const onChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientBillingEnabledDocument,
    initialValues: { billingOptionsUpdateEnabled: value },
    requiredValues: { clientId }
  })
  const useClientBillingOptionsUpdate =
    getClientBillingOptionsUpdateHook(clientId)

  return (
    <EditableField<UpdateClientBillingEnabledInput, number>
      disabled={editingDisabled}
      onChange={onChange}
      name='billingOptionsUpdateEnabled'
      value={Number(value)}
      queryValue={useClientBillingOptionsUpdate}
      adjustValues={values => ({
        billingOptionsUpdateEnabled: Boolean(values.billingOptionsUpdateEnabled)
      })}
      viewer={getClientBillingOptionsUpdateDisplay(value)}
      editor={props => (
        <Form.Select
          {...props}
          options={BILLING_OPTIONS_UPDATE}
          autoFocus
          size='small'
          width='auto'
        />
      )}
    />
  )
}

export default BillingOptionsUpdate
