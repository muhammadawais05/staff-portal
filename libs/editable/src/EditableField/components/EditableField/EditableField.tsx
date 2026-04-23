import React from 'react'
import { arrayMutators, Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'

import { EditableFieldProps, ValuesToAdjust } from '../../types'
import EditableFieldContent from '../EditableFieldContent'

const EditableField = <
  TMutationInput,
  TQueryValue = string,
  TQueryOptions = Item[],
  TKey extends keyof TMutationInput = keyof TMutationInput
>({
  adjustValues,
  onChange,
  name,
  value,
  initialValues,
  ...fieldProps
}: EditableFieldProps<TMutationInput, TQueryValue, TQueryOptions, TKey>) => {
  const handleSubmit = (
    values: Partial<TMutationInput> &
      ValuesToAdjust<TMutationInput, TKey, TQueryValue>
  ) => onChange(name, adjustValues ? adjustValues(values) : values)

  return (
    <Form<TMutationInput>
      disableScrollOnError
      initialValues={{ [name]: value, ...initialValues }}
      onSubmit={handleSubmit}
      mutators={{ ...arrayMutators }}
    >
      <EditableFieldContent
        {...fieldProps}
        name={name}
        data-testid={fieldProps['data-testid'] || `EditableField-${name}`}
      />
    </Form>
  )
}

export default EditableField
