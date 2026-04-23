import React, { useState, useCallback, ComponentType } from 'react'
import { Dropdown, Tag } from '@toptal/picasso'
import TagSelectorInput from '@toptal/picasso/TagSelectorInput'
import { Autocomplete } from '@staff-portal/ui'

import TypeSelectContent from '../TypeSelectContent'
import { Option } from '../../types'
import * as S from './styles'

export interface Props {
  options: Option[]
  value?: Option[]
  loading?: boolean
  placeholder?: string
  searchPlaceholder?: string
  onChange: (options: Option[] | undefined) => void
}

const TypeSelect = ({
  options,
  placeholder,
  searchPlaceholder,
  value,
  loading,
  onChange
}: Props) => {
  const [selected, setSelected] = useState<Option[] | undefined>(value)

  const getParentLabel = useCallback(
    (itemId: string) =>
      options.find(option =>
        option.children?.some(child => child.id === itemId)
      )?.label,
    [options]
  )

  const handleSelect = (selectedOptions: Option[] | undefined) => {
    setSelected(selectedOptions)
    onChange(selectedOptions)
  }

  const handleDelete = (deletedOption: Option) => {
    const selectedOptions = selected?.filter(
      ({ id }) => id !== deletedOption.id
    )

    setSelected(selectedOptions)
    onChange(selectedOptions)
  }

  const currentPlaceholder = !selected?.length ? placeholder : ''

  return (
    <Dropdown
      css={S.dropdown}
      content={
        <TypeSelectContent
          options={options}
          onSelectionChange={handleSelect}
          selectedOptions={selected}
          searchPlaceholder={searchPlaceholder}
          loading={loading}
        />
      }
      disableAutoClose
      disablePortal
    >
      <Autocomplete
        placeholder={currentPlaceholder}
        options={null}
        testIds={{
          input: 'type-select-autocomplete'
        }}
        width='full'
        value=''
        loading={loading}
        inputComponent={TagSelectorInput as ComponentType}
        startAdornment={selected?.map(item => (
          <Tag
            key={item.id}
            css={S.tag}
            variant='light-grey'
            data-testid={`type-select-selected-tag-${item.id}`}
            onDelete={() => handleDelete(item)}
          >
            {item.label} {getParentLabel(item.id)}
          </Tag>
        ))}
      />
    </Dropdown>
  )
}

export default TypeSelect
