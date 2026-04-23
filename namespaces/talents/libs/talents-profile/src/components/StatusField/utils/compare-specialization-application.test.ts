import { SpecializationApplicationFragment } from '../data/specialization-application-fragment/specialization-application-fragment.staff.gql.types'
import { compareSpecializationApplications } from './compare-specialization-application'

const specialization = {
  startedAt: 2
} as unknown as SpecializationApplicationFragment
const specializationWithoutStartedAt =
  {} as unknown as SpecializationApplicationFragment
const oldSpecialization = {
  startedAt: 1
} as unknown as SpecializationApplicationFragment

describe('compareSpecializationApplications', () => {
  it.each([
    [
      {
        acc: undefined,
        current: specialization
      },
      specialization
    ],
    [
      {
        acc: undefined,
        current: specializationWithoutStartedAt
      },
      undefined
    ],
    [
      {
        acc: oldSpecialization,
        current: specialization
      },
      specialization
    ],
    [
      {
        acc: specialization,
        current: oldSpecialization
      },
      specialization
    ]
  ])('returns expected output for %s', ({ acc, current }, expected) => {
    const result = compareSpecializationApplications(acc, current)

    expect(result).toBe(expected)
  })
})
