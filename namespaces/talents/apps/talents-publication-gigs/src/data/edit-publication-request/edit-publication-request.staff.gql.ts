import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { GIG_FRAGMENT } from '@staff-portal/talents-gigs'

import {
  EditPublicationRequestMutation,
  EditPublicationRequestMutationVariables
} from './edit-publication-request.staff.gql.types'

export const EDIT_PUBLICATION_REQUEST = gql`
  mutation EditPublicationRequest($input: EditGigInput!) {
    editGig(input: $input) {
      ...MutationResultFragment
      gig {
        ...GigFragment
      }
    }
  }

  ${GIG_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

interface Props {
  onCompleted?: (data: EditPublicationRequestMutation) => void
  onError?: (error: Error) => void
}

interface MutationProps {
  id: string
  title: string
  description: string
  skills: string[]
}

export const useEditPublicationRequest = ({ onCompleted, onError }: Props) => {
  const [mutate, { data, loading, error }] = useMutation<
    EditPublicationRequestMutation,
    EditPublicationRequestMutationVariables
  >(EDIT_PUBLICATION_REQUEST, {
    onCompleted,
    onError
  })

  const editPublicationRequest = ({
    id,
    title,
    description,
    skills
  }: MutationProps) =>
    mutate({
      variables: {
        input: {
          gigId: id,
          title,
          description,
          skills
        }
      }
    })

  return {
    editPublicationRequest,
    loading,
    data,
    error
  }
}
