import { gql } from '@apollo/client'

export default gql`
  query GetDataForConsolidationDefaultModal(
    $id: ID!
    $scope: ClientHierarchyEngagementScope
  ) {
    node(id: $id) {
      ... on Client {
        id
        fullName
        hierarchy {
          engagements(filter: { scope: $scope }) {
            nodes {
              ...ConsolidationDefaultEngagementFragment
            }
          }
        }
      }
    }
  }

  fragment ConsolidationDefaultEngagementFragment on Engagement {
    isWorking
    id
    purchaseOrderLine {
      id
      poLineNumber
      webResource {
        ...WebResourceFragment
      }
      purchaseOrder {
        id
        poNumber
      }
    }
    client {
      id
      fullName
      _companyId
      webResource {
        ...WebResourceFragment
      }
    }
    job {
      id
      title
      purchaseOrderLine {
        id
        poLineNumber
        webResource {
          ...WebResourceFragment
        }
        purchaseOrder {
          id
          poNumber
        }
      }
      webResource {
        ...WebResourceFragment
      }
    }
    talent {
      id
      fullName
      webResource {
        ...WebResourceFragment
      }
    }
    consolidationDefault {
      id
      name
      deleted
      client {
        id
        webResource {
          ...WebResourceFragment
        }
      }
    }
    startDate
  }
`
