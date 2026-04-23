import React, { useMemo, useState } from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import { Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import { isSubstring } from '@toptal/picasso/utils'
import { Props as FormTagSelectorProps } from '@toptal/picasso-forms/TagSelector/TagSelector'

import { useGetLanguages } from '../../data/get-languages/get-languages.staff.gql'

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

type Props = Pick<
  FormTagSelectorProps,
  'width' | 'required' | 'loading' | 'placeholder' | 'disabled'
>

const LanguagesTagSelector = (props: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const { showError } = useNotifications()

  const { languages, loading } = useGetLanguages({
    onError: () => {
      showError('Unable to load languages.')
    }
  })
  const languagesOptions = useMemo(
    () =>
      languages?.map(({ id, name }) => ({
        text: name,
        value: id
      })),
    [languages]
  )
  const filteredOptions = useMemo(
    () => filterOptions(inputValue, languagesOptions),
    [inputValue, languagesOptions]
  )

  return (
    <Form.TagSelector
      name='languageIds'
      width='auto'
      options={filteredOptions}
      inputValue={inputValue}
      onInputChange={setInputValue}
      loading={loading}
      {...props}
    />
  )
}

export default LanguagesTagSelector
