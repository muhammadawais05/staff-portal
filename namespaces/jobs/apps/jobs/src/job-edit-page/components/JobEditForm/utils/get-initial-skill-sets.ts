import { SkillSetConnection } from '@staff-portal/graphql/staff'

export const getInitialSkillSets = (
  skillSets?: Omit<SkillSetConnection, 'totalCount'> | null
) =>
  skillSets?.nodes.map(skillSet => ({
    ...skillSet,
    destroy: false,
    // eslint-disable-next-line @miovision/disallow-date/no-new-date
    addedAt: new Date().toISOString(),
    skill: {
      ...skillSet.skill,
      categoryId: skillSet.skill.category.id
    }
  })) || []
