import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { UpdatePaymentsEmployeeTypeInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Option } from '@toptal/picasso/Select/types'
import { NO_VALUE } from '@staff-portal/config'

import { getEmployeeTypesItemsHook, getStaffEmployeeTypeHook } from './services'
import { UpdatePaymentsEmployeeTypeDocument } from './data'

interface Props {
  staffId: string
  operation: OperationFragment
  value?: string | null
}

const EmployeeType = ({ staffId, value, operation }: Props) => {
  const useStaffEmployeeTypeHook = getStaffEmployeeTypeHook(staffId)
  const useGetEmployeeTypeItemsHook = getEmployeeTypesItemsHook()
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdatePaymentsEmployeeTypeDocument,
    initialValues: {
      paymentsEmployeeType: value || ''
    },
    requiredValues: {
      roleId: staffId
    }
  })

  return (
    <EditableField<UpdatePaymentsEmployeeTypeInput, string, Option[]>
      name='paymentsEmployeeType'
      onChange={handleChange}
      value={value || ''}
      disabled={!isOperationEnabled(operation)}
      viewer={value || NO_VALUE}
      queryValue={useStaffEmployeeTypeHook}
      queryOptions={useGetEmployeeTypeItemsHook}
      editor={({ options = [], ...props }) => (
        <Form.Select {...props} options={options} size='small' width='full' />
      )}
    />
  )
}

export default EmployeeType
