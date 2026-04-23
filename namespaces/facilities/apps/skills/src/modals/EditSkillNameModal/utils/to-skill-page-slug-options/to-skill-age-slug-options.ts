export const toSkillPageSlugOptions = (skillPageSlugs?: string[]) =>
  (skillPageSlugs || []).map(slug => ({
    value: slug,
    text: slug
  }))
