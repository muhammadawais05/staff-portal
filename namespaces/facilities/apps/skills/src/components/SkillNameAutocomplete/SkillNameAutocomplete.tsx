import React from 'react'
import { FieldWrapper, useForm } from '@toptal/picasso-forms'
import { Autocomplete, AutocompleteHighlightOption, AutocompleteProps } from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'

import {
  useGetSkillNamesAutocomplete,
  SkillNameEdgeFragment
} from '../../data/get-skill-name-autocomplete'

const getKey = (item: SkillNameEdgeFragment) => item.node?.id

const getDisplayValue = (skill: SkillNameEdgeFragment | null) =>
  skill?.label || ''

const renderOption = (item: Item) => {
  const { label, labelHighlight } = item as SkillNameEdgeFragment

  return (
    <AutocompleteHighlightOption
      labelHighlight={labelHighlight}
      label={label}
    />
  )
}

interface SkillNameAutocompleteProps {
  name: string;
  label: string;
  hint: string;
}

const SkillNameAutocomplete = ({ name, label, hint }: SkillNameAutocompleteProps) => {
  const form = useForm()
  const { values } = form.getState()
  const initialValue = values[name]

  const {
    getSkillNames,
    data: skillNames,
    loading: loadingSkillNames
  } = useGetSkillNamesAutocomplete()

  const {
    search,
    searching,
    searchTerm,
    searchOptions,
    setSearchTerm,
  } = useDebouncedAutocomplete({
    searchOptions: skillNames,
    loadingOptions: loadingSkillNames,
    initialSearchTerm: initialValue,
    onSearch: (term: string) => {
      getSkillNames({ term })
    }
  });

  const handleChange = (value: string, { isSelected }: ChangedOptions) => {
    setSearchTerm(value)

    if (!isSelected) {
      search(value)
    }

    form.change(name, value)
  }

  const handleSelect = ({ label: term }: SkillNameEdgeFragment) => {
    setSearchTerm(term || '')
    form.change(name, term)
  }

  return (
    <FieldWrapper
      name={name}
      width='full'
      label={label}
      autoFocus
      hint={hint}
      required
    >
      {(props: AutocompleteProps) => (
        <Autocomplete<SkillNameEdgeFragment>
          {...props}
          getKey={getKey}
          value={searchTerm}
          loading={searching}
          options={searchOptions}
          enableReset={false}
          getDisplayValue={getDisplayValue}
          renderOption={renderOption}
          onChange={handleChange}
          onSelect={handleSelect}
        />
      )}
    </FieldWrapper>
  )
}

export default SkillNameAutocomplete
