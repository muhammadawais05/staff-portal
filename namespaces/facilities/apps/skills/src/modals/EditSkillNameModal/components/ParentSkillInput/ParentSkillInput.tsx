import React, { useState, useEffect } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { Form, useForm } from '@toptal/picasso-forms'
import { Item, ChangedOptions } from '@toptal/picasso/Autocomplete/types'
import { AutocompleteHighlightOption } from '@staff-portal/ui'

import {
  SkillsListFragment,
  EditSkillNameSkillAutocompleteEdgeFragment
} from '../../data'
import { useGetParentNamesAutocomplete } from '../../hooks'

interface Props {
  name: string
  skills: Partial<SkillsListFragment>[]
  currentSkillIndex: number
  currentVerticalId: string
}

interface ParentSkillAutocompleteState {
  [key: string | number]: {
    searchTerm?: string
    selectedParentName?: string
  }
}

const initiateParentSkillAutocompleteState = (skills: Props['skills']) => {
  const state: ParentSkillAutocompleteState = {}

  skills.forEach((skill, index) => {
    state[index] = { selectedParentName: skill.parent?.name }
  })

  return state
}

const ParentSkillInput = ({
  name: inputName,
  skills,
  currentSkillIndex,
  currentVerticalId
}: Props) => {
  const autocompleteInputName = inputName + '_AutoComplete'

  const { showError } = useNotifications()
  const form = useForm()
  const currentSkill = skills[currentSkillIndex]

  const [parentSkillAutocompleteState, setParentSkillAutocompleteState] =
    useState<ParentSkillAutocompleteState>(
      initiateParentSkillAutocompleteState(skills)
    )

  const autocompleteState = parentSkillAutocompleteState[currentSkillIndex]
  const {
    search,
    setSearchTerm,
    selectItem,
    searching,
    searchOptions,
    resetSearchTerm
  } = useGetParentNamesAutocomplete({
    currentVerticalId,
    currentSkillId: currentSkill?.id,
    onError: () => showError('An error occurred. Failed to load skill list.')
  })

  const handleAutoCompleteChange = (
    searchQuery: string,
    options: ChangedOptions
  ) => {
    const selectedParentName = searchQuery
      ? autocompleteState?.selectedParentName
      : ''

    setParentSkillAutocompleteState(state => ({
      ...state,
      [currentSkillIndex]: {
        searchTerm: searchQuery,
        selectedParentName
      }
    }))

    if (!selectedParentName) {
      // To explicitly change parent skill to the Vertical Root.
      form.change(inputName, null)
    }

    setSearchTerm(searchQuery)

    if (!options?.isSelected) {
      search(searchQuery)
    }
  }

  const handleAutoCompleteSelect = (item: Item) => {
    const { label, node } = item as EditSkillNameSkillAutocompleteEdgeFragment

    setParentSkillAutocompleteState(state => ({
      ...state,
      [currentSkillIndex]: {
        searchTerm: autocompleteState?.searchTerm,
        selectedParentName: label || ''
      }
    }))

    selectItem(label || '')
    form.change(inputName, node?.id)
  }

  const handleAutoCompleteBlur = () => {
    if (searchOptions?.length) {
      // To auto select the first result.
      handleAutoCompleteSelect(searchOptions[0])
      form.change(autocompleteInputName, searchOptions[0].label)
    } else {
      // To make sure the autocomplete text box always render a valid skill name.
      setSearchTerm(autocompleteState?.selectedParentName || '')
      form.change(autocompleteInputName, autocompleteState?.selectedParentName)
    }
  }

  useEffect(() => {
    // Reset search term and search options on switching tab.
    resetSearchTerm()
  }, [resetSearchTerm, currentSkillIndex])

  const initialAutocompleteValue = autocompleteState
    ? autocompleteState.selectedParentName
    : currentSkill?.parent?.name

  return (
    <>
      <Form.Input type='hidden' name={inputName} />
      <Form.Autocomplete
        initialValue={initialAutocompleteValue}
        name={autocompleteInputName}
        hint='Type a skill, then select from the list below. Leave blank to set it as Vertical Root.'
        width='full'
        maxLength={2048}
        label='Parent Skill'
        options={searchOptions}
        loading={searching}
        value={autocompleteState?.searchTerm || ''}
        onChange={handleAutoCompleteChange}
        onSelect={handleAutoCompleteSelect}
        onBlur={handleAutoCompleteBlur}
        placeholder='Vertical Root'
        renderOption={(item: Item) => {
          const { label: itemLabel, labelHighlight } =
            item as EditSkillNameSkillAutocompleteEdgeFragment

          return (
            <AutocompleteHighlightOption
              label={itemLabel}
              labelHighlight={labelHighlight}
            />
          )
        }}
        getDisplayValue={(item: Item | null) =>
          (item as EditSkillNameSkillAutocompleteEdgeFragment)?.label || ''
        }
        getKey={(item: Item) =>
          (item as EditSkillNameSkillAutocompleteEdgeFragment).key
        }
      />
    </>
  )
}

export default ParentSkillInput
