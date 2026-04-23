import React from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { QueryResult, EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { useGetClientIndustries } from '../../../../utils'

interface Props {
  disabled?: boolean
  name: keyof PatchClientProfileInput
  value?: string
  adjustValues?: (values: AnyObject) => AnyObject
  queryValue: () => QueryResult<string>
  onChange: (key: keyof PatchClientProfileInput, values: AnyObject) => void
}

const InDepthCompanyResearchSecondaryIndustry = ({
  queryValue,
  disabled = false,
  name,
  value,
  ...rest
}: Props) => (
  <EditableField<PatchClientProfileInput, string, Option[]>
    {...rest}
    disabled={disabled}
    flex
    name={name}
    queryValue={queryValue}
    queryOptions={useGetClientIndustries}
    value={value}
    viewer={value || NO_VALUE}
    editor={({ options = [], ...props }) => (
      <Form.Select
        {...props}
        enableReset
        options={options}
        size='small'
        width='full'
      />
    )}
  />
)

export default InDepthCompanyResearchSecondaryIndustry
