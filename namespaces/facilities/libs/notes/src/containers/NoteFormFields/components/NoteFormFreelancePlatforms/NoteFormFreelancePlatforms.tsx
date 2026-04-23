import { Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import React, { useEffect, useMemo, useState } from 'react'

import { NoteFormAnswerBuilderType } from '../../../../types'
import { useNoteAnswerSuggestions } from './data'

const NoteFormFreelancePlatforms = ({
  index,
  required,
  placeholder,
  disabled
}: NoteFormAnswerBuilderType) => {
  const [inputValue, setInputValue] = useState('')
  const [tagOptions, setTagOptions] = useState<Item[]>([])
  const { suggestions, loading } = useNoteAnswerSuggestions()

  const options = useMemo(
    () =>
      suggestions?.map(suggestion => ({
        text: suggestion,
        value: suggestion
      })) ?? [],
    [suggestions]
  )

  useEffect(() => {
    setTagOptions(options)
  }, [options])

  const handleOnInputChange = (term: string) => {
    setInputValue(term)

    if (!term) {
      setTagOptions(options)

      return
    }

    const newOptions = options.filter(
      ({ text }) => text && text.toLowerCase().includes(term.toLowerCase())
    )

    setTagOptions(newOptions)
  }

  return (
    <Form.TagSelector
      loading={loading}
      options={tagOptions}
      name={`answers[${index}].value`}
      required={required}
      placeholder={placeholder}
      width='full'
      inputValue={inputValue}
      onInputChange={handleOnInputChange}
      disabled={disabled}
    />
  )
}

export default NoteFormFreelancePlatforms
