import React, { useMemo, useState } from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { isSubstring } from '@toptal/picasso/utils'

import { convertContactToItem } from '../utils'

interface Props {
  contacts: { id: string; fullName: string }[]
}

const ContactsTagSelector = ({ contacts }: Props) => {
  const {
    input: { value: selectedContacts }
  } = useField<Item[]>('contacts')
  const initialOptions = useMemo(
    () =>
      contacts
        .filter(
          ({ id: contactId }) =>
            !selectedContacts.some(({ value }) => value === contactId)
        )
        .map(convertContactToItem),
    [contacts, selectedContacts]
  )
  const allOptions = useMemo(
    () => contacts.map(convertContactToItem),
    [contacts]
  )
  const [values, setValues] = useState<Item[] | undefined>(initialOptions)
  const [options, setOptions] = useState(allOptions)
  const [inputValue, setInputValue] = useState('')

  const filterOptions = (value: string) => {
    setInputValue(value)

    if (value !== '') {
      setOptions(allOptions?.filter(option => isSubstring(value, option.text)))

      return
    }

    setOptions(allOptions)
  }

  const handleChange = (items: Item[]) => setValues(items)

  return (
    <Form.TagSelector
      name='contacts'
      label='Contacts'
      width='full'
      value={values}
      options={options}
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={filterOptions}
      noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
    />
  )
}

export default ContactsTagSelector
