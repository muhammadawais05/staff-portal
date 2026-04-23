import React from 'react'
import { useField } from '@toptal/picasso-forms'

import { ProfileExperience, ProfilePublication } from '../../types'
import ExperienceList from '../ExperienceList'
import { toggleExperience } from './toggle'

interface ExperienceListFieldProps {
  name: string
  experiences: ProfileExperience[]
  talentId: string
  title: string
  approvedMentor: boolean
  fullName: string
  publications: ProfilePublication[]
}

const ExperienceListField = ({ name, ...rest }: ExperienceListFieldProps) => {
  const {
    input: { value, onChange, onBlur }
  } = useField(name)

  return (
    <ExperienceList
      {...rest}
      value={value}
      toggleItem={item => {
        onChange(toggleExperience(value.slice(), item))
        onBlur()
      }}
    />
  )
}

export default ExperienceListField
