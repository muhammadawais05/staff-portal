import { useField, useForm } from '@toptal/picasso-forms'
import React, { useEffect } from 'react'
import { VerticalSkillFragment } from '@staff-portal/skills'
import { useTalentApplicantSkillsSelector } from '@staff-portal/talents'

const SKILLS_FIELD_NAME = 'applicantSkillIds'
const VERTICAL_FIELD_NAME = 'newVerticalId'

export type Skill = VerticalSkillFragment | string

const ApplicantSkillsSelector = () => {
  const form = useForm()

  const {
    input: { value: verticalId }
  } = useField(VERTICAL_FIELD_NAME)

  const disabled = !verticalId

  const { setSearchTerm, render: renderSkillsAutocomplete } =
    useTalentApplicantSkillsSelector({
      required: true,
      disabled,
      talentOrVerticalId: verticalId,
      name: SKILLS_FIELD_NAME,
      width: 'full',
      placeholder: disabled
        ? 'First you need to choose a vertical'
        : 'Select applicant skills from autocomplete'
    })

  useEffect(() => {
    form.change(SKILLS_FIELD_NAME, [])
    setSearchTerm('')
  }, [verticalId, form, setSearchTerm])

  return <>{renderSkillsAutocomplete()}</>
}

export default ApplicantSkillsSelector
