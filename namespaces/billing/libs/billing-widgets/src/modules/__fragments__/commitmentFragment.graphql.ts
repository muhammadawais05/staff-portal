import { gql } from '@apollo/client'

export const commitmentFragment = gql`
  fragment CommitmentFragment on Commitment {
    availability
    availabilityHours
    companyRate
    talentRate
    startDate
  }
`
