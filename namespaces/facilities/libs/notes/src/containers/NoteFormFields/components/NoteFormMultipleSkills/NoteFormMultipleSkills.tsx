import React from 'react'
import { AutocompleteEdge } from '@staff-portal/graphql/staff'
import { FormTagSelector } from '@staff-portal/forms'

import { useGetTalentSkillsAutocomplete } from '../../data'
import { NoteFormAnswerBuilderType } from '../../../../types'

export interface Props extends NoteFormAnswerBuilderType {
  noteQuestionId: string
  verticalId: string
}

const NoteFormMultipleSkills = ({
  index,
  required,
  placeholder,
  noteQuestionId,
  verticalId,
  disabled
}: Props) => {
  const {
    getTalentSkills,
    data: skills,
    loading
  } = useGetTalentSkillsAutocomplete({ noteQuestionId, verticalId })

  return (
    <FormTagSelector
      required={required}
      loading={loading}
      placeholder={placeholder}
      options={skills as AutocompleteEdge[]}
      name={`answers[${index}].value`}
      width='full'
      onSearch={(term, _, excludedNames) =>
        getTalentSkills({ term, excludedExactSkillNames: excludedNames })
      }
      disabled={disabled}
    />
  )
}

export default NoteFormMultipleSkills
