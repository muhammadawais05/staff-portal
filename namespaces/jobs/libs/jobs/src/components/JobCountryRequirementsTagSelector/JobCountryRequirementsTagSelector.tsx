import React, { useMemo, useState } from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import { Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import { isSubstring } from '@toptal/picasso/utils'
import { useGetCountries } from '@staff-portal/facilities'

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

const JobCountryRequirementsTagSelector = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const { showError } = useNotifications()

  const { countries, loading } = useGetCountries({
    onError: () => {
      showError('Unable to load countries.')
    }
  })
  const countriesOptions = useMemo(
    () =>
      countries?.map(({ id, name }) => ({
        text: name,
        value: id
      })),
    [countries]
  )
  const filteredOptions = useMemo(
    () => filterOptions(inputValue, countriesOptions),
    [countriesOptions, inputValue]
  )

  return (
    <Form.TagSelector
      name='allowedCountryIds'
      width='full'
      options={filteredOptions}
      inputValue={inputValue}
      onInputChange={setInputValue}
      loading={loading}
    />
  )
}

export default JobCountryRequirementsTagSelector
