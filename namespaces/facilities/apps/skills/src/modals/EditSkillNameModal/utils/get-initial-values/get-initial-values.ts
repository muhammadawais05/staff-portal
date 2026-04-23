import { Maybe } from '@staff-portal/graphql/staff'

import { toSkillsForm } from '../to-skills-form'
import { SkillsListFragment } from '../../data'

interface Arguments {
  skillNameId: string
  skillsData: Maybe<SkillsListFragment>[]
  newName: string
  skillPageSlug?: Maybe<string>
}

export const getInitialValues = ({
  skillNameId,
  skillsData,
  newName,
  skillPageSlug
}: Arguments) => {
  if (skillsData) {
    return {
      skillNameId,
      newName,
      skillPageSlug,
      skills: toSkillsForm(skillsData)
    }
  }

  return {
    newName,
    skillPageSlug
  }
}
