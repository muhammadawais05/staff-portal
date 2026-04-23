import React, { useMemo, useState } from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import { Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import { isSubstring } from '@toptal/picasso/utils'
import { GridItemField } from '@staff-portal/ui'

import { useGetClientRepresentatives } from './data'

const filterOptions = (
  searchTerm = '',
  options: Item[] = []
): Item[] | null => {
  if (!searchTerm) {
    return options
  }

  const result = options.filter(option =>
    option?.text ? isSubstring(searchTerm, option.text) : false
  )

  return result.length > 0 ? result : null
}

const FIELD_NAME = 'companyRepresentativeIds'

interface Props {
  clientId: string
}

const JobClientRepresentativesTagSelector = ({ clientId }: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const { showError } = useNotifications()

  const { representatives, loading } = useGetClientRepresentatives({
    clientId,
    onError: () => {
      showError('Unable to load client representatives.')
    }
  })
  const representativesOptions = useMemo(
    () =>
      representatives?.map(({ id, fullName, phoneNumber }) => ({
        text: fullName,
        value: id,
        description: phoneNumber as string
      })),
    [representatives]
  )
  const filteredOptions = useMemo(
    () => filterOptions(inputValue, representativesOptions),
    [inputValue, representativesOptions]
  )

  return (
    <GridItemField label='Add Job Contacts' labelFor={FIELD_NAME}>
      <Form.TagSelector
        name={FIELD_NAME}
        width='full'
        options={filteredOptions}
        inputValue={inputValue}
        onInputChange={setInputValue}
        loading={loading}
      />
    </GridItemField>
  )
}

export default JobClientRepresentativesTagSelector
