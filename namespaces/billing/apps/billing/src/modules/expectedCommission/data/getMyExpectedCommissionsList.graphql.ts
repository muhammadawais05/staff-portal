import { gql } from '@apollo/client'

export default gql`
  query GetMyExpectedCommissions($pagination: OffsetPagination!) {
    viewer {
      expectedCommissions(pagination: $pagination) {
        totalCount
        groups {
          month
          year
          expectedCommissions {
            ...MyExpectedCommissionFragment
          }
        }
      }
    }
  }

  fragment MyExpectedCommissionFragment on ExpectedCommission {
    ...ExpectedCommissionFragment
    client {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    invoiceReasonEngagement: invoiceReason {
      ... on Engagement {
        id
        job {
          id
          title
          webResource {
            ...WebResourceFragment
          }
        }
      }
    }
    invoiceReasonJob: invoiceReason {
      ... on Job {
        id
        title
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }
`
