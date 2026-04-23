import React, { ComponentProps } from 'react'
import { FieldWrapper, useForm } from '@toptal/picasso-forms'
import { FieldProps } from '@toptal/picasso-forms/FieldWrapper'
import { CompanyAutocomplete } from '@staff-portal/clients'

interface Props
  extends Omit<
      ComponentProps<typeof CompanyAutocomplete>,
      'name' | 'value' | 'onSelect' | 'onReset' | 'type'
    >,
    FieldProps<string | undefined> {
  initialDisplayValue?: string
}

const FormCompanyAutocomplete = ({ initialDisplayValue, ...rest }: Props) => {
  const { change } = useForm()
  const handleSelect = (performerId: string) => change('clientId', performerId)
  const handleReset = () => change('clientId', '')

  return (
    <FieldWrapper<Props> {...rest}>
      {(props: Props) => (
        <CompanyAutocomplete
          {...props}
          onSelect={({ id }) => handleSelect(id)}
          onReset={handleReset}
          initialDisplayValue={initialDisplayValue}
        />
      )}
    </FieldWrapper>
  )
}

export default FormCompanyAutocomplete
