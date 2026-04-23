import React from 'react'
import { FieldWrapper } from '@toptal/picasso-forms'
import { FieldProps } from '@toptal/picasso-forms/FieldWrapper'

import TaskStaffAutocomplete, {
  TaskStaffAutocompleteProps
} from '../../../TaskStaffAutocomplete'

interface Props
  extends Omit<
      TaskStaffAutocompleteProps,
      'name' | 'value' | 'onSelect' | 'onReset' | 'type'
    >,
    FieldProps<string | undefined> {
  initialDisplayValue?: string
}

const FormTaskStaffAutocomplete = ({ initialDisplayValue, ...rest }: Props) => {
  const handleSelect = (props: Props, performerId: string) => {
    props.onChange(performerId)
  }

  return (
    <FieldWrapper<Props> {...rest}>
      {(props: Props) => (
        <TaskStaffAutocomplete
          {...props}
          onSelect={({ id }) => handleSelect(props, id)}
          onReset={props.onChange}
          initialDisplayValue={initialDisplayValue}
        />
      )}
    </FieldWrapper>
  )
}

export default FormTaskStaffAutocomplete
