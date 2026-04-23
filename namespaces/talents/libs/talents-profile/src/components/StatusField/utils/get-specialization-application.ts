import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'

import { SpecializationApplicationFragment } from '../data/specialization-application-fragment/specialization-application-fragment.staff.gql.types'
import { compareSpecializationApplications } from './compare-specialization-application'

export const getSpecializationApplication = (
  specializationApplications: SpecializationApplicationFragment[]
) => {
  const specializationApplication = specializationApplications.reduce(
    compareSpecializationApplications,
    undefined
  )

  // check if talent status is rejected and contains a reason
  if (
    !(
      specializationApplication?.status &&
      [
        TalentSpecializationApplicationStatus.REJECTED,
        TalentSpecializationApplicationStatus.REJECTED_INACTIVE
      ].includes(specializationApplication.status) &&
      specializationApplication.rejectionReason
    )
  ) {
    return null
  }

  return specializationApplication
}
