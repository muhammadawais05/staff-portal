import { Select } from '@toptal/picasso'
import React, { ComponentProps, FC, memo } from 'react'

import {
  FieldInputProps,
  FormInputHandleOnBlur,
  FormInputHandleOnChange,
  FormInputHandleOnFocus
} from '../../@types/types'
import FormInputWrapper from '../FormInputWrapper'

const displayName = 'FormInputSelect'

interface Props extends ComponentProps<typeof FormInputWrapper> {
  inputProps: ComponentProps<typeof Select>
  input: FieldInputProps<string>
  handleOnBlur?: FormInputHandleOnBlur
  handleOnChange?: FormInputHandleOnChange
  handleOnFocus?: FormInputHandleOnFocus
  width: 'full' | 'shrink' | 'auto'
}

export const FormInputSelect: FC<Props> = memo(
  ({
    handleOnBlur,
    handleOnChange,
    handleOnFocus,
    hint,
    input,
    inputProps,
    label,
    meta,
    required,
    testId,
    width = 'full'
  }) => {
    const { onBlur, onChange, onFocus } = input
    const selectProps = {
      ...inputProps,
      ...input,
      'data-testid': testId,
      id: label ? testId : undefined,
      // TODO: React final form bad type
      // eslint-disable-next-line
      // @ts-ignore
      onBlur: handleOnBlur ? handleOnBlur(onBlur, onChange) : onBlur,
      onChange: handleOnChange ? handleOnChange(onChange) : onChange,
      // TODO: React final form bad type
      // eslint-disable-next-line
      // @ts-ignore
      onFocus: handleOnFocus ? handleOnFocus(onFocus) : onFocus
    }

    return (
      // TODO: related Picasso issue: https://github.com/toptal/picasso/issues/827
      <FormInputWrapper
        hint={hint}
        label={label}
        meta={meta}
        renderChild={({ isInvalid }) => (
          <Select width={width} {...selectProps} error={isInvalid} />
        )}
        required={required}
        testId={testId}
      />
    )
  }
)

FormInputSelect.displayName = displayName

export default FormInputSelect
