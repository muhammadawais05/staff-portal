import { FieldProps } from '@toptal/picasso-forms/FieldWrapper'
import React from 'react'

import { useTalentApplicantSkillsSelector } from './hooks'
import { Skill } from './types'

interface Props extends FieldProps<Skill[] | undefined> {
  talentOrVerticalId: string
  placeholder?: string
  disabled?: boolean
}

const TalentApplicantSkillsSelector = (props: Props) => {
  const { render } = useTalentApplicantSkillsSelector(props)

  return <>{render()}</>
}

export default TalentApplicantSkillsSelector
