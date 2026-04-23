import React from 'react'
import { useForm, FieldWrapper } from '@toptal/picasso-forms'
import { ChangedOptions } from '@toptal/picasso/Autocomplete'
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOptionWithPhoto
} from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'
import {
  AutocompleteModels,
  NewEngagementWizardAttributes
} from '@staff-portal/graphql/staff'
import {
  useGetTalentAutocomplete,
  TalentAutocompleteEdgeFragment
} from '@staff-portal/talents'

import { DEFAULT_ROLE_NAME } from '../../config'
import { useCandidateSendingContext } from '../../hooks'

const testIds = {
  input: 'talent-autocomplete-field-input',
  menuItem: 'talent-autocomplete-field-menu-item'
}

const TalentAutocompleteField = () => {
  const { change, getState } = useForm<NewEngagementWizardAttributes>()
  const { talentName, setTalentName } = useCandidateSendingContext()

  const getTalentName = () => {
    if (getState().values?.talentId) {
      return talentName
    }
  }

  const { data, getTalents, loading } = useGetTalentAutocomplete()
  const {
    search,
    searching,
    searchTerm,
    setSearchTerm,
    selectItem,
    searchOptions
  } = useDebouncedAutocomplete({
    onSearch: (term: string) =>
      getTalents({
        term,
        model: AutocompleteModels.ACTIVE_TALENTS
      }),
    searchOptions: data,
    loadingOptions: loading,
    initialSearchTerm: getTalentName()
  })
  const handleOnChange = (term: string, { isSelected }: ChangedOptions) => {
    setSearchTerm(term)

    if (!isSelected) {
      search(term)
    }

    // Handle reset button and a case when no letters left in the input
    if (!isSelected && !term.length) {
      change('talentId', undefined)
    }
  }
  const handleOnSelect = ({ node, label }: TalentAutocompleteEdgeFragment) => {
    if (node && label) {
      selectItem(label)
      setTalentName(label)
      change('talentId', node.id)
    }
  }

  return (
    <FieldWrapper
      name='talentId'
      hint={`Start typing ${DEFAULT_ROLE_NAME.toLowerCase()}'s name`}
    >
      {(props: AutocompleteProps) => (
        <Autocomplete<TalentAutocompleteEdgeFragment>
          {...props}
          width='full'
          loading={searching}
          value={searchTerm}
          options={searchOptions}
          getKey={(item: TalentAutocompleteEdgeFragment) => item.node?.id}
          renderOption={(item: TalentAutocompleteEdgeFragment) => (
            <AutocompleteHighlightOptionWithPhoto
              label={item.label}
              nodeTypes={item.nodeTypes}
            />
          )}
          onChange={handleOnChange}
          onSelect={handleOnSelect}
          noOptionsText='No results'
          testIds={testIds}
        />
      )}
    </FieldWrapper>
  )
}

export default TalentAutocompleteField
