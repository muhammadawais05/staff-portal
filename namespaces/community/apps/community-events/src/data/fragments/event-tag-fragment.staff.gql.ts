import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const EVENT_TAG_FRAGMENT = gql`
  fragment EventTagFragment on TalentCommunityEventTag {
    id
    title
    active
    sortOrder
    operations {
      updateCommunityEventTag {
        ...OperationFragment
      }
      removeCommunityEventTag {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
