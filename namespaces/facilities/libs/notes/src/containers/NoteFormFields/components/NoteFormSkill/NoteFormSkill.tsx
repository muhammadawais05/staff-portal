import { Autocomplete, AutocompleteHighlightOption } from '@staff-portal/ui'
import { ChangedOptions } from '@toptal/picasso/Autocomplete'
import { useForm, useField } from '@toptal/picasso-forms'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'

import {
  useGetTalentSkillsAutocomplete,
  NoteAutocompleteEdgeFragment
} from '../../data'
import { NoteFormAnswerBuilderType } from '../../../../types'

const getKey = (item: NoteAutocompleteEdgeFragment) => item.node?.id

const renderAssigneeOption = ({
  label,
  labelHighlight
}: NoteAutocompleteEdgeFragment) => {
  return (
    <AutocompleteHighlightOption
      label={label}
      labelHighlight={labelHighlight}
    />
  )
}

const handleOnFocus = (event: ChangeEvent<{ select: () => void }>) =>
  event.target.select()

export interface Props extends NoteFormAnswerBuilderType {
  noteQuestionId: string
  verticalId: string
  initialDisplayValue?: string
  name?: string
}

const NoteFormSkill = ({
  index,
  initialDisplayValue = '',
  placeholder,
  required,
  noteQuestionId,
  verticalId,
  disabled,
  name = 'value'
}: Props) => {
  const { change } = useForm()
  const {
    input: { value }
  } = useField(`answers[${index}].${name}`)

  const [autocompleteState, setAutocompleteState] = useState<string>(
    value || initialDisplayValue
  )

  useEffect(() => {
    setAutocompleteState(value)
  }, [value])

  const {
    getTalentSkills,
    data: skills,
    loading
  } = useGetTalentSkillsAutocomplete({ noteQuestionId, verticalId })

  const [options, setOptions] = useState<NoteAutocompleteEdgeFragment[] | null>(
    skills
  )

  useEffect(() => {
    setOptions(skills)
  }, [skills])

  const getSkillsDebounced = useDebouncedCallback(
    (term: string) => getTalentSkills({ term }),
    DEBOUNCE_LIMIT
  )

  const changeValue = (newValue?: string) =>
    change(`answers[${index}].${name}`, newValue)

  const handleOnChange = (term: string, { isSelected }: ChangedOptions) => {
    // Change called when an item was selected
    if (isSelected) {
      return
    }

    // Reset/hide options while user is typing
    setOptions(null)

    // Change called when something is typed
    if (term.length) {
      getSkillsDebounced(term)
      changeValue(term)

      return
    }

    // Changed called when reset button is clicked
    // `term` is an empty string
    changeValue()
  }

  const handleOnSelect = ({ label }: NoteAutocompleteEdgeFragment) => {
    const selectedValue = label as string

    changeValue(selectedValue)
  }

  return (
    <Autocomplete<NoteAutocompleteEdgeFragment>
      loading={loading}
      required={required}
      value={autocompleteState}
      options={options}
      placeholder={placeholder}
      getKey={getKey}
      renderOption={renderAssigneeOption}
      onFocus={handleOnFocus}
      onChange={handleOnChange}
      onSelect={handleOnSelect}
      noOptionsText='No results'
      width='full'
      disabled={disabled}
    />
  )
}

export default NoteFormSkill
