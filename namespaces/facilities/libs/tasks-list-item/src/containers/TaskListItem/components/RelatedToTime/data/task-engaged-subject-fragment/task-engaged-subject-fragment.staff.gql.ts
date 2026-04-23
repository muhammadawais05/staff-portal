import { gql } from '@staff-portal/data-layer-service'

export const TASK_ENGAGED_SUBJECT_FRAGMENT = gql`
  fragment RoleTimeZoneFragment on Role {
    id
    fullName
    type
    timeZone {
      name
    }
  }

  fragment ClientTimeZoneFragment on Client {
    id
    contact {
      id
      fullName
    }
    timeZone {
      name
    }
  }
`
