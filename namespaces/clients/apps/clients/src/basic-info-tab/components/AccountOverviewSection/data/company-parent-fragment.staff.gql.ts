import { gql } from '@staff-portal/data-layer-service'

export const COMPANY_PARENT_FRAGMENT = gql`
  fragment CompanyParentFragment on Client {
    parent {
      id
      fullName
      webResource {
        text
        url
      }
      contracts(
        filter: { kinds: [STA], statuses: [SIGNED], showDescendants: false }
      ) {
        nodes {
          id
          guid
        }
      }
    }
    operations {
      removeClientParent {
        ...CompanyOperationFragment
      }
      updateClientParent {
        ...CompanyOperationFragment
      }
      cascadeClientParentUpdates {
        ...CompanyOperationFragment
      }
    }
  }
`
