import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const SOURCING_REQUEST_TALENT_FRAGMENT = gql`
  fragment SourcingRequestTalentFragment on SourcingRequestTalent {
    deletedAt
    id
    operations {
      unlinkSourcingRequestTalent {
        ...OperationFragment
      }
    }
    sourcingRequest {
      id
    }
    talent {
      id
      fullName
      cumulativeStatus
      detailedStatus
      webResource {
        text
        url
      }
      operations {
        linkSourcingRequest {
          ...OperationFragment
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
export const LINKED_SOURCING_REQUEST_TALENTS_FRAGMENT = gql`
  fragment LinkedSourcingRequestTalentsFragment on SourcingRequest {
    sourcingRequestTalents: sourcingRequestTalents(
      filter: { scope: NOT_DELETED }
    ) {
      nodes {
        ...SourcingRequestTalentFragment
      }
    }
  }

  ${SOURCING_REQUEST_TALENT_FRAGMENT}
`
export const UNLINKED_SOURCING_REQUEST_TALENTS_FRAGMENT = gql`
  fragment UnlinkedSourcingRequestTalentsFragment on SourcingRequest {
    unlinkedSourcingRequestTalents: sourcingRequestTalents(
      filter: { scope: DELETED }
    ) {
      nodes {
        ...SourcingRequestTalentFragment
      }
    }
  }

  ${SOURCING_REQUEST_TALENT_FRAGMENT}
`
