import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const GET_SEND_TOP_MODAL_DATA = gql`
  query GetSendTopModalData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        operations {
          importContractAsTop {
            ...OperationFragment
          }
        }
        job {
          id
          descriptionOfService
        }
        client {
          id
          legalName
          fullName
        }
        talent {
          id
          fullName
        }
        nextTopEffectiveDate
        nextTopNumber
        trialLength
        trialEndDate
        companyHourlyRate
        companyPartTimeRate
        companyFullTimeRate
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
