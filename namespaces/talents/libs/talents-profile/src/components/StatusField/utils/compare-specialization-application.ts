import { SpecializationApplicationFragment } from '../data/specialization-application-fragment/specialization-application-fragment.staff.gql.types'

export const compareSpecializationApplications = (
  acc: SpecializationApplicationFragment | undefined,
  current: SpecializationApplicationFragment
) => {
  if (!current.startedAt) {
    return
  }

  if (!acc?.startedAt || current.startedAt > acc.startedAt) {
    return current
  }

  return acc
}
