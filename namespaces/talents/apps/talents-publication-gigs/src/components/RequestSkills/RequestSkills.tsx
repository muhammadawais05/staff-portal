import React from 'react'
import { Container, FormError } from '@toptal/picasso'
import { FieldRenderProps } from '@toptal/picasso-forms'

import * as S from './styles'
import { SkillsList } from '../../components'
import { SkillsAutoSuggest } from './components'
import { SEARCH_TYPES } from './types'

interface Props {
  skillsList: FieldRenderProps<string[], HTMLElement>
}

const RequestSkills = ({ skillsList }: Props) => {
  const input = skillsList?.input
  const handleBlur = input?.onBlur
  const value = input.value

  const handleSelect = (_type: SEARCH_TYPES, name: string) => {
    if (value.includes(name)) {
      return
    }
    if (Array.isArray(value)) {
      skillsList.input.onChange([...value, name])
    } else {
      skillsList.input.onChange([value, name])
    }
  }

  const handleDelete = (name: string) => {
    if (Array.isArray(value)) {
      const skillListFiltered = value.filter(skill => skill !== name)

      input.onChange(skillListFiltered)
    }
  }

  return (
    <Container flex top='small' bottom='medium' css={S.skills}>
      <SkillsAutoSuggest
        searchType={SEARCH_TYPES.SKILLS}
        placeholder='Add required skills...'
        onBlur={handleBlur}
        onSelect={handleSelect}
        initialValue=''
        searchTypeDropdownOpen={false}
      />
      <SkillsList skills={value} editMode handleDelete={handleDelete} />
      {skillsList.meta.touched && (
        <FormError>{skillsList.meta.error}</FormError>
      )}
    </Container>
  )
}

export default RequestSkills
