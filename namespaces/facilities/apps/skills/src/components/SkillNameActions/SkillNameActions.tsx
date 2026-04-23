import React from 'react'
import { Button } from '@toptal/picasso'

import {
  CloneSkillNameButton,
  DeleteSkillNameButton,
  EditSkillNameButton
} from '..'
import { VerticalWithSkillCategoriesFragment } from '../../data/get-verticals-with-categories'
import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'

export interface Props {
  skillName: SkillNamesListItemFragment
  skillPageSlugs: string[]
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
}

const SkillNameActions = ({
  skillName,
  skillPageSlugs,
  verticalsWithCategories
}: Props) => {
  return (
    <Button.Group>
      <DeleteSkillNameButton skillName={skillName} />
      <CloneSkillNameButton skillName={skillName} />
      <EditSkillNameButton
        skillName={skillName}
        verticalsWithCategories={verticalsWithCategories}
        skillPageSlugs={skillPageSlugs}
      />
    </Button.Group>
  )
}

export default SkillNameActions
