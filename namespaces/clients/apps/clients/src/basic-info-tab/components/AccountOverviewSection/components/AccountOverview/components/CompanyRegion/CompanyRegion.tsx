import React, { useCallback } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { Region } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableFieldProps,
  QueryResult,
  ValuesToAdjust,
  EditableField
} from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { useGetCompanyRegions } from './utils'

interface Props<T> {
  operation: CompanyOperationFragment
  value?: Region | null
  handleChange: EditableFieldProps<T>['onChange']
  queryValue: () => QueryResult<string>
  name: keyof T & string
  adjustValues:
    | ((values: ValuesToAdjust<T, keyof T & string>) => Partial<T>)
    | undefined
}

const CompanyRegion = <T,>({
  operation,
  value,
  name,
  handleChange,
  queryValue,
  adjustValues
}: Props<T>) => (
  <EditableField<T, string, Option[]>
    disabled={!isOperationEnabled(operation)}
    flex
    name={name}
    onChange={handleChange}
    queryValue={queryValue}
    queryOptions={useGetCompanyRegions}
    value={value?.id}
    viewer={value?.name || NO_VALUE}
    adjustValues={adjustValues}
    editor={useCallback(
      ({ ...props }) => (
        <Form.Select {...props} enableReset size='small' width='auto' />
      ),
      []
    )}
  />
)

export default CompanyRegion
