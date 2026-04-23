import { gql } from '@staff-portal/data-layer-service'

export const TALENT_AVAILABILITY_RESPONSE_SPEED_FRAGMENT = gql`
  fragment TalentAvailabilityResponseSpeedFragment on Talent {
    availabilityResponseSpeed
  }
`
