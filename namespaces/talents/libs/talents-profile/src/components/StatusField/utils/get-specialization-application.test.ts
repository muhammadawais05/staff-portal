import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'

import { SpecializationApplicationFragment } from '../data/specialization-application-fragment/specialization-application-fragment.staff.gql.types'
import { compareSpecializationApplications } from './compare-specialization-application'
import { getSpecializationApplication } from './get-specialization-application'

jest.mock('./compare-specialization-application', () => ({
  compareSpecializationApplications: jest.fn()
}))

const compareSpecializationApplicationsMock =
  compareSpecializationApplications as jest.Mock

const SPECIALIZATION_APPLICATION = {
  status: TalentSpecializationApplicationStatus.REJECTED,
  rejectionReason: true
} as unknown as SpecializationApplicationFragment

describe('getSpecializationApplication', () => {
  it.each([
    [[SPECIALIZATION_APPLICATION], SPECIALIZATION_APPLICATION],
    [[{ status: undefined }], null],
    [[{}], null]
  ])('returns expected for %s', (values, expected) => {
    compareSpecializationApplicationsMock.mockImplementation(
      (_, value) => value
    )

    const result = getSpecializationApplication(
      values as unknown as SpecializationApplicationFragment[]
    )

    expect(result).toBe(expected)
  })
})
