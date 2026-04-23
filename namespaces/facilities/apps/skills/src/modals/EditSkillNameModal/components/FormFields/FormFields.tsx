import React from 'react'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'

import { VerticalWithSkillCategoriesFragment } from '../../../../data/get-verticals-with-categories'
import { SkillsListFragment } from '../../data'
import { VerticalsSection } from '../index'
import { SkillNameAutocomplete } from '../../../../components'

interface Props {
  skills: SkillsListFragment[]
  skillCategoriesOptionsByVertical: Record<string, Option[]>
  skillSlugsOptions: Option[]
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
}

const FormFields = ({
  skills,
  skillSlugsOptions,
  skillCategoriesOptionsByVertical,
  verticalsWithCategories
}: Props) => (
  <>
    <SkillNameAutocomplete
      name='newName'
      label='Name'
      hint='If a new name matches an existing skill, the skills will be merged. When merging, the values below
              are taken from the destination skill and are not editable. You can use autocomplete to find existing
              checked skills.'
    />
    <Form.Select
      enableReset
      name='skillPageSlug'
      label='Skill Page Slug'
      options={skillSlugsOptions}
      placeholder='Choose Skill Page slug'
      width='full'
      hint="If provided, it will be used to link this skill on talent resumes to the skill page,
              if it's created in the respective vertical."
    />
    <VerticalsSection
      skills={skills}
      skillCategoriesOptionsByVertical={skillCategoriesOptionsByVertical}
      verticalsWithCategories={verticalsWithCategories}
    />
  </>
)

export default FormFields
