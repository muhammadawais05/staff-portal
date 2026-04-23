import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { GIG_FRAGMENT } from '@staff-portal/talents-gigs'

import {
  CreateRequestMutation,
  CreateRequestMutationVariables
} from './create-request.staff.gql.types'

export const CREATE_REQUEST = gql`
  mutation CreateRequest($input: CreatePublicationGigInput!) {
    createPublicationGig(input: $input) {
      ...MutationResultFragment
      publicationGig {
        ...GigFragment
      }
    }
  }

  ${GIG_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

interface Props {
  onCompleted?: (data: CreateRequestMutation) => void
  onError?: (error: Error) => void
}

interface MutationProps {
  title: string
  description: string
  skills: string[]
}

export const useCreateRequest = ({ onCompleted, onError }: Props) => {
  const [mutate, { data, loading, error }] = useMutation<
    CreateRequestMutation,
    CreateRequestMutationVariables
  >(CREATE_REQUEST, {
    refetchQueries: ['GetGigsList'],
    onCompleted,
    onError
  })

  const createRequest = ({ title, description, skills }: MutationProps) =>
    mutate({
      variables: {
        input: {
          title,
          description,
          skills
        }
      }
    })

  return {
    createRequest,
    loading,
    data,
    error
  }
}
