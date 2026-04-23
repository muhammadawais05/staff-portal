import { CommitmentAvailability } from '@staff-portal/graphql/staff'

import { COMMITMENT_AVAILABILITY_HOURS_MAPPING } from '../../config'

const getRequiredJobHours = ({
  commitment,
  expectedWeeklyHours
}: {
  commitment?: string | null
  expectedWeeklyHours?: number | null
}) => {
  if (!commitment) {
    return
  }

  if (commitment === CommitmentAvailability.hourly) {
    return (
      expectedWeeklyHours ?? COMMITMENT_AVAILABILITY_HOURS_MAPPING[commitment]
    )
  }

  return COMMITMENT_AVAILABILITY_HOURS_MAPPING[
    commitment as CommitmentAvailability
  ]
}

export default getRequiredJobHours
