import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const GET_SEND_EMAIL_OPERATION = gql`
  query GetSendEmailOperation($nodeId: ID!) {
    staffNode(id: $nodeId) {
      ... on Client {
        id
        emailMessaging {
          id
          operations {
            sendEmailTo {
              ...OperationFragment
            }
          }
        }
      }
      ... on Role {
        id
        emailMessaging {
          id
          operations {
            sendEmailTo {
              ...OperationFragment
            }
          }
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
