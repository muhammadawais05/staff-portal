import { gql } from '@staff-portal/data-layer-service'

export const SCHEDULE_ENGAGEMENT_FRAGMENT = gql`
  fragment ScheduleEngagementFragment on Engagement {
    id
    job {
      id
      title
      claimer {
        id
        fullName
        phoneNumber
        email
        skype
      }
    }
    client {
      id
      fullName
      enterprise
      timeZone {
        name
        value
      }
      contact {
        id
        phoneNumber
      }
      emailCarbonCopyOptions {
        nodes {
          ...EmailCarbonCopyOptionFragment
        }
      }
    }
    talent {
      id
      fullName
      skype
      phoneNumber
      toptalEmail
    }
  }

  fragment EmailCarbonCopyOptionFragment on EmailCarbonCopyOption {
    default
    label
    role {
      id
      email
      fullName
    }
  }
`
