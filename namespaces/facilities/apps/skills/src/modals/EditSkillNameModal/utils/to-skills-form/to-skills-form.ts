import { Maybe } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'

import { SkillForm } from '../../types'
import { SkillsListFragment } from '../../data'

export const toSkillsForm = (skills: Maybe<SkillsListFragment>[]) =>
  skills.filter(isNotNullish).map(
    ({
      id,
      isIdentifier,
      isIdentifierUnmarkable,
      category: { id: categoryId, vertical },
      parent
    }): SkillForm => ({
      id,
      categoryId,
      isIdentifier,
      isIdentifierUnmarkable,
      parentSkillId: parent?.id,
      verticalId: vertical?.id as string
    })
  )
