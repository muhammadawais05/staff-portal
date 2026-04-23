import { VerticalWithSkillCategoriesFragment } from '../../../../data/get-verticals-with-categories'

export const getAvailableVerticals = (
  usedCategoryIds: string[],
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
) => {
  return verticalsWithCategories.filter(
    ({ skillCategories }) =>
      skillCategories.nodes.filter(({ id }) => usedCategoryIds.includes(id))
        .length === 0
  )
}
