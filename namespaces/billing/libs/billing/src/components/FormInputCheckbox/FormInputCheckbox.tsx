import { Checkbox } from '@toptal/picasso'
import React, { ComponentProps, FC, memo } from 'react'

import { FieldInputProps } from '../../@types/types'
import FormInputWrapper from '../FormInputWrapper'

const displayName = 'FormInputCheckbox'

interface Props extends ComponentProps<typeof FormInputWrapper> {
  inputProps?: ComponentProps<typeof Checkbox>
  input: FieldInputProps<string>
}

export const FormInputCheckbox: FC<Props> = memo(
  ({
    inputProps,
    input: { checked, name, onChange, value },
    testId,
    label,
    meta,
    required,
    hint
  }) => {
    if (checked !== true && checked !== false) {
      console.warn(`'type=checkbox' must be defined on '${name}' Field`)
    }

    const checkboxProps = {
      ...inputProps,
      checked,
      'data-testid': testId,
      id: label ? testId : undefined,
      label,
      name,
      onChange: (e: { currentTarget: HTMLInputElement }) => {
        onChange({
          target: { checked: e.currentTarget.checked, type: 'checkbox', value }
        })
      },
      titleCase: false
    }

    return (
      <FormInputWrapper
        hint={hint}
        meta={meta}
        renderChild={() => <Checkbox {...checkboxProps} />}
        required={required}
        testId={testId}
      />
    )
  }
)

FormInputCheckbox.displayName = displayName

export default FormInputCheckbox
