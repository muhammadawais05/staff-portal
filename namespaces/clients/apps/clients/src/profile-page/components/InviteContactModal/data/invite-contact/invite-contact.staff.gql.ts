import { useMutation, gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { InviteContactDocument } from './invite-contact.staff.gql.types'

export default gql`
  mutation InviteContact($input: InviteCompanyRepresentativeInput!) {
    inviteCompanyRepresentative(input: $input) {
      client {
        id
      }
      companyRepresentative { 
        id
        fullName
        email
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useInviteContact = () =>
  useMutation(InviteContactDocument)
