import { Maybe } from '@staff-portal/graphql/staff'

import { AvailabilityStepDataFragment } from '../../../../data/get-availability-step-data'

const getInitialValues = ({
  availabilityStepData,
  hasPendingAssignment
}: {
  availabilityStepData?: Maybe<AvailabilityStepDataFragment>
  hasPendingAssignment: boolean
}) => ({
  availabilityConfirmed: availabilityStepData?.availabilityConfirmed,
  commitment: availabilityStepData?.commitment,
  hasPendingAssignment,
  trialLength: availabilityStepData?.newEngagement?.trialLength
})

export default getInitialValues
