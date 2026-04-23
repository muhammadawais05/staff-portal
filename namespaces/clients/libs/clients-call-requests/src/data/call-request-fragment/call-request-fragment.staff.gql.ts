import { gql } from '@staff-portal/data-layer-service'
import { ROLE_FLAG_FRAGMENT } from '@staff-portal/role-flags'

export const CALL_REQUEST_FRAGMENT = gql`
  fragment CallRequestFragment on CallbackRequest {
    claimedAt
    createdAt
    purpose
    requestedStartTime
    id
    name
    requestedStartTime
    status
    type
    late
    isNew
    obscureLead
    job {
      id
      webResource {
        url
        text
      }
      __typename
    }
    claimer {
      __typename
      ... on Node {
        id
      }
      ... on WebResource {
        webResource {
          url
          text
        }
      }
    }
    contacts {
      nodes {
        id
        type
        value
      }
    }
    inWorkingHours
    operations {
      claimCallbackRequest {
        callable
        messages
        __typename
      }
      claimCallbackRequestWithClient {
        callable
        messages
        __typename
      }
      removeCallbackRequest {
        callable
        messages
        __typename
      }
      __typename
    }
    client {
      id
      roleFlags {
        nodes {
          ...RoleFlagFragment
        }
      }
      claimer {
        id
        __typename
      }
      contact {
        id
        fullName
        contacts(filter: { type: [PHONE, SKYPE] }) {
          nodes {
            id
            type
            value
          }
        }
        __typename
      }
      createdAt
      timeZone {
        name
        __typename
      }
      fullName
      photo {
        icon
      }
      netTerms
      country {
        name
        id
        __typename
      }
      webResource {
        url
      }
      __typename
    }
    __typename
  }

  ${ROLE_FLAG_FRAGMENT}
`
