import { isString } from '@toptal/picasso/utils'

export const extractFormSkills = (
  formApplicantSkills: ({ id: string; name: string } | string)[]
) =>
  formApplicantSkills.reduce<{ ids: string[]; names: string[] }>(
    ({ ids, names }, skill) => {
      if (isString(skill)) {
        return { ids, names: [...names, skill] }
      }

      const { id, name } = skill

      return {
        ids: id ? [...ids, id] : ids,
        names: [...names, name]
      }
    },
    { ids: [], names: [] }
  )
