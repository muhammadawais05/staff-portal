export const toSkillCategoryOptions = (
  skillCategories?: { id: string; title: string }[]
) =>
  (skillCategories || []).map(({ id, title }) => ({
    value: id,
    text: title
  }))
