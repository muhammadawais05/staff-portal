import { toSkillCategoryOptions } from '../to-skill-category-options'
import { VerticalWithSkillCategoriesFragment } from '../../../../data/get-verticals-with-categories'

export const toSkillCategoriesOptions = (
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
) => {
  return Object.fromEntries(
    verticalsWithCategories.map(({ id: verticalId, skillCategories }) => {
      return [verticalId, toSkillCategoryOptions(skillCategories.nodes)]
    })
  )
}
