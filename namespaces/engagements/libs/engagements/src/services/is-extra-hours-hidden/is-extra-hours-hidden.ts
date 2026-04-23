import { CommitmentAvailability } from '@staff-portal/graphql/staff'

export const isExtraHoursHidden = ({
  availability,
  enterprise
}: {
  availability?: CommitmentAvailability
  enterprise?: boolean
}) => availability === CommitmentAvailability.hourly || enterprise
