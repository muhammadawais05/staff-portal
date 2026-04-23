import React, { useState, useMemo } from 'react'
import { Checkbox, Container, TagSelector } from '@toptal/picasso'
import { Item } from '@toptal/picasso/TagSelector'
import { Client } from '@staff-portal/graphql/staff'

import { convertClientToItem } from './utils'

const displayName = 'ClientMultiSelector'

export type ClientOption = Pick<Client, 'id' | 'fullName'>

interface Props {
  clients: ClientOption[]
  onValuesChange: (values: string[]) => void
  placeholder: string
  selectAllLabel: string
  initialValues?: string[]
  popperContainer?: HTMLElement
}

const ClientMultiSelector = ({
  clients,
  onValuesChange,
  placeholder,
  selectAllLabel,
  initialValues = [],
  popperContainer
}: Props) => {
  const initialItems: Item[] = useMemo(
    () =>
      clients
        .filter(({ id }) => initialValues?.includes(id))
        .map(convertClientToItem),
    [clients, initialValues]
  )
  const allOptions = useMemo(() => clients.map(convertClientToItem), [clients])
  const [values, setValues] = useState(initialItems)
  const [options, setOptions] = useState(allOptions)
  const [inputValue, setInputValue] = useState('')

  const [allSelected, setAllSelected] = useState(false)

  const handleCheckbox = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const allIds = checked ? allOptions.map(item => item.value) : []

    setAllSelected(checked)
    setValues(checked ? allOptions : [])
    onValuesChange(allIds)
  }

  const handleChange = (items: Item[]) => {
    const newValues = items.map(item => item.value)

    setValues(items)
    setAllSelected(newValues.length === allOptions.length)
    onValuesChange(newValues as string[])
  }

  const handleOptionSearch = (newValue: string) => {
    setInputValue(newValue)
    if (newValue.length > 1) {
      setOptions(
        allOptions.filter(option =>
          option.text.toLowerCase().includes(newValue.toLowerCase())
        )
      )
    } else {
      setOptions(allOptions)
    }
  }

  return (
    <div data-testid={`${displayName}-container`}>
      <TagSelector
        onChange={handleChange}
        options={options}
        value={values}
        inputValue={inputValue}
        onInputChange={handleOptionSearch}
        placeholder={placeholder}
        width='full'
        popperContainer={popperContainer}
        // TODO: remove, when testIds prop would be added into the TagSelector
        // https://toptal-core.atlassian.net/browse/SPB-2817
        testIds={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          input: displayName
        }}
        enableAutofill
      />
      <Container top='xsmall'>
        <Checkbox
          data-testid={`${displayName}-checkbox`}
          checked={allSelected}
          onChange={handleCheckbox}
          label={selectAllLabel}
        />
      </Container>
    </div>
  )
}

ClientMultiSelector.displayName = displayName

export default ClientMultiSelector
