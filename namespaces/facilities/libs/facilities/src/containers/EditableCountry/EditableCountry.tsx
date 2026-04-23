import React from 'react'
import { EditableWrapper } from '@staff-portal/editable'

import { CountryCityFields } from '../../components'
import { CountryFragment } from '../../data'

// TODO: move this component along with everything related to Country
interface Props {
  name: string
  required?: boolean
  loading?: boolean
  disabled?: boolean
  error?: boolean
  options: CountryFragment[] | undefined
  placeholder?: string
  cancelText?: string
  submitText?: string
  onReset?: () => void
}

const EditableCountry = ({
  loading,
  error,
  disabled,
  required,
  options,
  placeholder,
  ...rest
}: Props) => {
  return (
    <EditableWrapper
      {...rest}
      loading={loading}
      disabled={disabled}
      data-testid='EditableCountry'
    >
      <CountryCityFields
        data-testid='EditableCountry'
        countries={options}
        placeholder={placeholder}
        required={required}
        loading={loading}
        disabled={disabled}
        error={error}
      />
    </EditableWrapper>
  )
}

export default EditableCountry
