import React, { useCallback } from 'react'
import { CompanyAutocomplete } from '@staff-portal/clients'
import { FieldWrapper, useForm } from '@toptal/picasso-forms'
import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'
import { AutocompleteProps } from '@staff-portal/ui'

import { useCandidateSendingContext } from '../../hooks'

const testIds = {
  input: 'company-autocomplete-field-input',
  menuItem: 'company-autocomplete-field-menu-item'
}

const CompanyAutocompleteField = () => {
  const { change } = useForm<NewEngagementWizardAttributes>()
  const { setClientId, clientName, setClientName } =
    useCandidateSendingContext()

  const handleSetClient = useCallback(
    ({ id }: { id: string }, label?: string | null) => {
      if (label) {
        setClientName(label)
      }

      return setClientId(id)
    },
    [setClientId]
  )
  const handleResetClientId = useCallback(() => {
    setClientId(null)
    setClientName(undefined)
    change('jobId', undefined)
  }, [setClientId])

  return (
    <FieldWrapper name='clientId' hint='Start typing the company name'>
      {(props: AutocompleteProps) => (
        <CompanyAutocomplete
          {...props}
          name='clientId'
          width='full'
          onSelect={handleSetClient}
          onChange={handleResetClientId}
          onReset={handleResetClientId}
          initialDisplayValue={clientName}
          placeholder=''
          testIds={testIds}
        />
      )}
    </FieldWrapper>
  )
}

export default CompanyAutocompleteField
