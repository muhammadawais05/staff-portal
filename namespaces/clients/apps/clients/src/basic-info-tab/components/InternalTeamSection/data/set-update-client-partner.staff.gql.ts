import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  mutation SetUpdateClientClientPartner(
    $input: UpdateClientClientPartnerInput!
  ) {
    updateClientClientPartner(input: $input) {
      client {
        id
        clientPartner {
          ...StaffUserFragment
        }
      }
      updatedClients {
        id
        ...WebResourceFragment
      }
      updatedOpportunities {
        id
        ...WebResourceFragment
      }
      missedClients {
        id
        ...WebResourceFragment
      }
      missedOpportunities {
        id
        ...WebResourceFragment
      }
      ...MutationResultFragment
    }
  }

  ${OPERATION_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
