import { Container, Tag } from '@toptal/picasso'
import { FieldWrapper } from '@toptal/picasso-forms'
import { isString } from '@toptal/picasso/utils'
import React from 'react'
import { Autocomplete, AutocompleteProps } from '@staff-portal/ui'

import { ApplicantSkillsAutocompleteFragment } from '../../data'
import { Skill } from './types'

const getSkillName = (skill: Skill): string =>
  isString(skill) ? skill : skill?.name ?? ''

export interface Props
  extends AutocompleteProps<ApplicantSkillsAutocompleteFragment> {
  name: string
  label: string
  skills: Skill[]
  onSkillDelete: (skill: Skill) => void
}

const TalentApplicantSkillsAutocomplete = ({
  name,
  required,
  label,
  skills,
  onSkillDelete,
  ...props
}: Props) => {
  return (
    <FieldWrapper name={name} required={required} label={label}>
      {(fieldProps: AutocompleteProps) => (
        <>
          <Autocomplete {...fieldProps} {...props} width='full' name={name} />

          <Container top='small'>
            <Tag.Group>
              {skills.map(item => {
                const skillName = getSkillName(item)

                return (
                  <Tag
                    onDelete={() => onSkillDelete(item)}
                    key={skillName}
                    data-testid={`selected-skill-${skillName}`}
                  >
                    {skillName}
                  </Tag>
                )
              })}
            </Tag.Group>
          </Container>
        </>
      )}
    </FieldWrapper>
  )
}

export default TalentApplicantSkillsAutocomplete
