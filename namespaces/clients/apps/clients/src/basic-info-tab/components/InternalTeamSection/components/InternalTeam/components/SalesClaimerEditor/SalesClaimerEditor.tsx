import React from 'react'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import { EditorProps } from '@staff-portal/editable'

const SalesClaimerEditor = <TMutationInput extends Record<string, unknown>>({
  options = [],
  name,
  ...props
}: EditorProps<TMutationInput, string, Option[]>) => (
  <Form.Select
    {...props}
    name={name as string}
    options={options.map(item => {
      if (item.value !== props.value) {
        return item
      }

      return { ...item, disabled: true }
    })}
    size='small'
  />
)

export default SalesClaimerEditor
