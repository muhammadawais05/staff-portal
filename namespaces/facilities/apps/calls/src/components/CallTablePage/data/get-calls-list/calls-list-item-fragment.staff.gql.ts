import { gql } from '@staff-portal/data-layer-service'

export const CALLS_LIST_ITEM_FRAGMENT = gql`
  fragment CallsListItemFragment on Call {
    id
    isUnfilled
    duration
    purpose
    customPurpose
    isDismissed
    direction
    isMissed
    voicemail {
      url
      duration
      transcriptionText
    }
    recordings {
      url
    }
    counterparty {
      phoneNumber
      roleId
      roleType
      fullName
      profileUrl
    }
    createdAt
  }
`
