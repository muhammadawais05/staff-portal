import React from 'react'
import { Option } from '@toptal/picasso/Select'
import { RoleV2Scope } from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import {
  EditableFieldProps,
  QueryResult,
  EditableField
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { StaffUserFragment } from '../../data'
import { getStaffRolesHook } from '../../utils'
import { EditableStaffEditor, EditableStaffViewer } from '..'

export interface Props<TMutationInput extends Record<PropertyKey, unknown>>
  extends Partial<
    Omit<EditableFieldProps<TMutationInput, string, Option[]>, 'value'>
  > {
  operation: OperationFragment
  value: Partial<StaffUserFragment> | undefined | null
  scope: RoleV2Scope
  requiredValues?: Partial<TMutationInput>
  queryHook: () => QueryResult<string>
  name: keyof TMutationInput
  mutationDocument: DocumentNode
  mutationResultOptions?: object
  enableReset?: boolean
  isSelectedOptionDisabled?: boolean
}

const EditableStaff = <TMutationInput extends Record<string, unknown>>({
  operation,
  value,
  queryHook,
  name,
  scope,
  requiredValues,
  mutationDocument,
  mutationResultOptions,
  enableReset = true,
  isSelectedOptionDisabled,
  ...rest
}: Props<TMutationInput>) => {
  const useGetStaffRoles = getStaffRolesHook(scope)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument,
    initialValues: { [name]: value?.id },
    requiredValues: { ...requiredValues, [name]: null } as TMutationInput,
    mutationResultOptions
  })

  return (
    <EditableField<TMutationInput, string, Option[]>
      disabled={!isOperationEnabled(operation)}
      name={name}
      onChange={handleChange}
      queryValue={queryHook}
      queryOptions={useGetStaffRoles}
      value={value?.id}
      viewer={<EditableStaffViewer value={value} />}
      editor={props => (
        <EditableStaffEditor
          {...props}
          currentValue={value}
          enableReset={enableReset}
          isSelectedOptionDisabled={isSelectedOptionDisabled}
        />
      )}
      {...rest}
    />
  )
}

export default EditableStaff
