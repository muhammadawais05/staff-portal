import { Radio } from '@toptal/picasso'
import React, { ComponentProps, FC, memo } from 'react'

import { FieldInputProps, FormInputHandleOnChange } from '../../@types/types'
import FormInputWrapper from '../FormInputWrapper'

const displayName = 'FormInputRadio'

interface Props extends ComponentProps<typeof FormInputWrapper> {
  handleOnChange?: FormInputHandleOnChange
  horizontal?: boolean
  input: FieldInputProps<string>
  label?: string
  options: ComponentProps<typeof Radio>[]
  required?: boolean
  testId?: string
}

const FormInputRadioGroup: FC<Props> = memo<Props>(
  ({
    handleOnChange,
    hint,
    horizontal,
    label: fieldLabel,
    input: { name, onChange, value },
    meta,
    options,
    required,
    testId = name
  }: Props) => (
    <FormInputWrapper
      hint={hint}
      label={fieldLabel}
      meta={meta}
      renderChild={() => (
        <Radio.Group
          horizontal={horizontal}
          name={name}
          onChange={handleOnChange ? handleOnChange(onChange) : onChange}
          value={value}
        >
          {options.map(({ disabled, value: fieldValue, label }) => (
            <Radio
              disabled={disabled}
              key={label as string}
              label={label}
              titleCase={false}
              value={fieldValue}
            />
          ))}
        </Radio.Group>
      )}
      required={required}
      testId={testId}
    />
  )
)

FormInputRadioGroup.displayName = displayName

export default FormInputRadioGroup
