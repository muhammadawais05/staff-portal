import React, { ChangeEvent, useEffect, useMemo } from 'react'
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOption
} from '@staff-portal/ui'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import {
  TalentAutocompleteEdgeFragment,
  useGetTalentAutocomplete
} from '../../data'

export interface Props
  extends Omit<
    AutocompleteProps,
    | 'loading'
    | 'value'
    | 'options'
    | 'getKey'
    | 'renderOption'
    | 'onFocus'
    | 'onChange'
    | 'onSelect'
    | 'children'
  > {
  initialDisplayValue?: string
  onSelect: (talentName: string | null) => void
}

interface GroupedTalentsItem extends Item {
  label?: string | null
  labelHighlight?: string | null
}

const getKey = (item: GroupedTalentsItem) => item.label ?? ''

const renderOption = ({ label, labelHighlight }: GroupedTalentsItem) => {
  return (
    <AutocompleteHighlightOption
      label={label}
      labelHighlight={labelHighlight}
    />
  )
}

const handleFocus = (event: ChangeEvent<{ select: () => void }>) =>
  event.target.select()

const getUniqueTalentNames = (
  data: TalentAutocompleteEdgeFragment[] | null
): GroupedTalentsItem[] | null => {
  if (!data) {
    return null
  }

  const uniqueTalentNames = data.reduce((talentByName, talent) => {
    talentByName[talent.label ?? ''] = {
      label: talent.label,
      labelHighlight: talent.labelHighlight
    }

    return talentByName
  }, {} as Record<string, GroupedTalentsItem>)

  return Object.values(uniqueTalentNames)
}

export const TalentAutocompleteField = ({
  onSelect,
  initialDisplayValue,
  ...rest
}: Props) => {
  const { getTalents, data, loading } = useGetTalentAutocomplete()
  const uniqueTalentNames = useMemo(() => getUniqueTalentNames(data), [data])

  const {
    search,
    searching,
    searchTerm,
    setSearchTerm,
    searchOptions,
    selectItem
  } = useDebouncedAutocomplete({
    onSearch: (term: string) => {
      getTalents({ term })
    },
    searchOptions: uniqueTalentNames,
    loadingOptions: loading
  })

  useEffect(
    () => setSearchTerm(initialDisplayValue ?? ''),
    [initialDisplayValue, setSearchTerm]
  )

  const handleChange = (term: string, { isSelected }: ChangedOptions) => {
    setSearchTerm(term)

    if (!isSelected) {
      search(term)
    }
    // Reset button clicked
    if (!term.length) {
      onSelect(null)
    }
  }

  const handleSelect = (item: GroupedTalentsItem) => {
    const { label: talentName } = item

    if (talentName) {
      selectItem(talentName)
    }

    onSelect(talentName ?? null)
  }

  return (
    <Autocomplete<GroupedTalentsItem>
      loading={searching}
      value={searchTerm}
      options={searchOptions}
      getKey={getKey}
      renderOption={renderOption}
      onSelect={handleSelect}
      onChange={handleChange}
      onFocus={handleFocus}
      noOptionsText='No results'
      {...rest}
    />
  )
}

export default TalentAutocompleteField
