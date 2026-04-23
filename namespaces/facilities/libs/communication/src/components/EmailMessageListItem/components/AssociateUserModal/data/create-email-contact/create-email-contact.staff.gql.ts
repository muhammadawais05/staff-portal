import { ApolloError, gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CreateEmailContactDocument } from './create-email-contact.staff.gql.types'
import { AssociationAutocompleteUser } from '../../../UserAssociationAutocomplete'

export const CREATE_EMAIL_CONTACT: typeof CreateEmailContactDocument = gql`
  mutation CreateEmailContact($input: CreateEmailContactInput!) {
    createEmailContact(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateEmailContact = ({
  onError
}: {
  onError: (error: ApolloError) => void
}) => {
  const [callCreateEmailContact, { loading }] = useMutation(
    CREATE_EMAIL_CONTACT,
    { onError }
  )

  const createEmailContact = (
    email: string,
    associatedUser: AssociationAutocompleteUser
  ) => {
    return callCreateEmailContact({
      variables: {
        input: {
          roleId: associatedUser.node?.id ?? '',
          email
        }
      }
    })
  }

  return { createEmailContact, loading }
}
