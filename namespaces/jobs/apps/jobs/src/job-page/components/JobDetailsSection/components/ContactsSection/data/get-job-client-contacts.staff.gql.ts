import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export const GET_JOB_CLIENT_CONTACTS = gql`
  query GetJobClientContacts($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        client {
          id
          contact {
            ...JobDetailsPrimaryContactFragment
          }
        }
        operations {
          createJobContactFromJob {
            ...OperationFragment
          }
        }
        contacts {
          edges {
            ...GetJobContactsItemFragment
          }
        }
      }
    }
  }

  fragment JobDetailsPrimaryContactFragment on CompanyRepresentative {
    id
    fullName
    phoneNumber
    email
    timeZone {
      ...TimeZoneFragment
    }
    contacts {
      nodes {
        id
        primary
        type
        value
      }
    }
  }

  fragment GetJobContactsItemFragment on JobContactEdge {
    node {
      id
      fullName
      webResource {
        url
      }
      phoneNumber
      contacts {
        nodes {
          id
          value
          primary
          type
        }
      }
      email
      timeZone {
        ...TimeZoneFragment
      }
      photo {
        small
      }
    }
    operations {
      removeJobContact {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
`
