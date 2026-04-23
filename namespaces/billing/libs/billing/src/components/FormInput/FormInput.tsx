import { Input } from '@toptal/picasso'
import React, { ComponentProps, FC, memo } from 'react'

import {
  FieldInputProps,
  FormInputHandleOnBlur,
  FormInputHandleOnChange,
  FormInputHandleOnFocus
} from '../../@types/types'
import FormInputWrapper from '../FormInputWrapper'

const displayName = 'FormInput'

interface Props extends ComponentProps<typeof FormInputWrapper> {
  input: FieldInputProps<string>
  inputProps?: ComponentProps<typeof Input>
  className?: string
  handleOnBlur?: FormInputHandleOnBlur
  handleOnChange?: FormInputHandleOnChange
  handleOnFocus?: FormInputHandleOnFocus
}

export const FormInput: FC<Props> = memo(
  ({
    inputProps,
    input,
    handleOnBlur,
    handleOnChange,
    handleOnFocus,
    testId,
    className,
    label,
    meta,
    required,
    hint
  }) => {
    const { onBlur, onChange, onFocus } = input
    const extendedInputProps = {
      ...inputProps,
      ...input,
      id: label ? testId : undefined,
      className,
      // TODO: React final form bad type
      // eslint-disable-next-line
      // @ts-ignore
      onBlur: handleOnBlur ? handleOnBlur(onBlur, onChange) : onBlur,
      onChange: handleOnChange ? handleOnChange(onChange) : onChange,
      // TODO: React final form bad type
      // eslint-disable-next-line
      // @ts-ignore
      onFocus: handleOnFocus ? handleOnFocus(onFocus) : onFocus,
      width: inputProps?.width || 'full'
    }

    return (
      // TODO: related Picasso issue: https://github.com/toptal/picasso/issues/827
      <FormInputWrapper
        hint={hint}
        label={label}
        meta={meta}
        renderChild={({ isInvalid }) => (
          <Input
            {...extendedInputProps}
            data-testid={testId}
            error={isInvalid}
          />
        )}
        required={required}
        testId={testId}
      />
    )
  }
)

FormInput.displayName = displayName

export default FormInput
