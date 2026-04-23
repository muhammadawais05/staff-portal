import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { TALENT_CURRENT_INTERVIEWS_FRAGMENT } from '@staff-portal/talents'
import { PHONE_CONTACTS_FRAGMENT } from '@staff-portal/role-profile'

export default gql`
  query GetTalentCandidateData($talentId: ID!) {
    staffNode(id: $talentId) {
      ... on Talent {
        id
        fullName
        type

        photo {
          default
          small
        }

        profileLink {
          url
          newTab
        }

        email
        toptalEmail

        skype
        additionalSkypeIds(order: { field: RECENCY, direction: DESC }) {
          nodes
        }

        cityDescription
        currentInterviews {
          ...TalentCurrentInterviewsFragment
        }

        timeZone {
          ...TimeZoneFragment
        }

        locationV2 {
          country {
            id
            name
          }
          cityName
        }

        engagements {
          counters {
            trialsNumber
            workingNumber
            clientsNumber
            repeatedClientsNumber
          }
        }

        ...PhoneContactsFragment
      }
    }
  }
  ${TIME_ZONE_FRAGMENT}
  ${TALENT_CURRENT_INTERVIEWS_FRAGMENT}
  ${PHONE_CONTACTS_FRAGMENT}
`
