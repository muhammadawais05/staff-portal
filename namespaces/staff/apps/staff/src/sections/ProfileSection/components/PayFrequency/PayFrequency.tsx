import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { UpdatePaymentsFrequencyInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Option } from '@toptal/picasso/Select/types'
import { NO_VALUE } from '@staff-portal/config'

import { getPayFrequencyItemsHook, getStaffPayFrequencyHook } from './services'
import { UpdatePaymentsFrequencyDocument } from './data'

interface Props {
  staffId: string
  operation: OperationFragment
  value?: string | null
}

const PayFrequency = ({ staffId, value, operation }: Props) => {
  const useStaffPayFrequencyHook = getStaffPayFrequencyHook(staffId)
  const useGetPayFrequencyItemsHook = getPayFrequencyItemsHook()
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdatePaymentsFrequencyDocument,
    initialValues: {
      paymentsFrequency: value || ''
    },
    requiredValues: {
      roleId: staffId
    }
  })

  return (
    <EditableField<UpdatePaymentsFrequencyInput, string, Option[]>
      name='paymentsFrequency'
      onChange={handleChange}
      value={value || ''}
      disabled={!isOperationEnabled(operation)}
      viewer={value || NO_VALUE}
      queryValue={useStaffPayFrequencyHook}
      queryOptions={useGetPayFrequencyItemsHook}
      editor={({ options = [], ...props }) => (
        <Form.Select {...props} options={options} size='small' width='full' />
      )}
    />
  )
}

export default PayFrequency
