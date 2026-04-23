import React from 'react'
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOption
} from '@staff-portal/ui'
import { FieldWrapper } from '@toptal/picasso-forms'
import { ChangedOptions } from '@toptal/picasso/Autocomplete'
import { useDebouncedAutocomplete } from '@staff-portal/utils'
import {
  TalentAutocompleteEdgeFragment,
  useGetTalentAutocomplete
} from '@staff-portal/talents'

type FormAutocompleteProps = Omit<AutocompleteProps, 'onChange'> & {
  onChange: (value: string) => void
}

interface Props {
  name: string
  label: string
  placeholder: string
  required: boolean
}

export const InfractionFormTalentAutocomplete = ({
  name,
  label,
  placeholder,
  required
}: Props) => {
  const { getTalents, data, loading } = useGetTalentAutocomplete()

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term: string) => {
        getTalents({ term })
      },
      searchOptions: data,
      loadingOptions: loading
    })

  const handleTalentChange = (
    term: string,
    { isSelected }: ChangedOptions,
    props: FormAutocompleteProps
  ) => {
    setSearchTerm(term)
    props.onChange('')

    if (!isSelected) {
      search(term)
    }
  }

  const handleTalentSelect = (
    { node, label: talentName }: TalentAutocompleteEdgeFragment,
    props: FormAutocompleteProps
  ) => {
    setSearchTerm(talentName as string)

    if (node) {
      props.onChange(node.id)
    }
  }

  return (
    <FieldWrapper name={name} label={label} required={required}>
      {(props: FormAutocompleteProps) => (
        <Autocomplete<TalentAutocompleteEdgeFragment>
          {...props}
          loading={searching}
          value={searchTerm}
          data-testid='autocomplete'
          options={searchOptions}
          getKey={(item: TalentAutocompleteEdgeFragment) => item.node?.id}
          enableReset={false}
          renderOption={(talent: TalentAutocompleteEdgeFragment) => (
            <AutocompleteHighlightOption label={talent.label} />
          )}
          onChange={(term, options) => handleTalentChange(term, options, props)}
          onSelect={selectedTalent => handleTalentSelect(selectedTalent, props)}
          noOptionsText='No results'
          placeholder={placeholder}
          width='full'
        />
      )}
    </FieldWrapper>
  )
}

export default InfractionFormTalentAutocomplete
