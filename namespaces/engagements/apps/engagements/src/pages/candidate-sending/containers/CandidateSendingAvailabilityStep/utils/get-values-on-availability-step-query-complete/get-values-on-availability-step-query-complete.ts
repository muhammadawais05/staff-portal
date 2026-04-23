import { Maybe } from '@staff-portal/graphql/staff'

import { AvailabilityStepDataFragment } from '../../../../data/get-availability-step-data'

const getValuesOnAvailabilityStepQueryComplete = ({
  availabilityStepData,
  hasPendingAssignment,
  isRefetching
}: {
  availabilityStepData?: Maybe<AvailabilityStepDataFragment>
  hasPendingAssignment: boolean
  isRefetching: boolean
}) => ({
  availabilityConfirmed: availabilityStepData?.availabilityConfirmed,
  commitment: availabilityStepData?.commitment,
  hasPendingAssignment,
  trialLength: availabilityStepData?.newEngagement?.trialLength,

  // We should reset these two fields after re-fetching.
  // It's an undocumented feature, but on legacy, these fields are reset after re-fetching
  ...(isRefetching && {
    talentCommitmentConfirmed: false,
    lockOverrideConfirmed: false
  })
})

export default getValuesOnAvailabilityStepQueryComplete
