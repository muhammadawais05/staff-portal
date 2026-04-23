import { useCallback } from 'react'
import { ClientNoteType } from '@staff-portal/graphql/staff'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { NOTE_ANSWER_WITH_OPTIONS_FRAGMENT } from '@staff-portal/notes'

import { GetClientDefaultNoteAnswersDocument } from './get-client-default-note-answers.staff.gql.types'
import { CLIENT_CLAIMING_OPERATIONS_FRAGMENT } from '../../../../data/client-claiming-operations-fragment'

export const GET_CLIENT_DEFAULT_NOTE_ANSWERS: typeof GetClientDefaultNoteAnswersDocument = gql`
  query GetClientDefaultNoteAnswers(
    $clientId: ID!
    $noteType: ClientNoteType!
    $isForEdit: Boolean!
  ) {
    viewer {
      permits {
        checkComplianceSalesFlow
      }
    }

    node(id: $clientId) {
      ... on Client {
        id
        status
        referrer {
          ... on WebResource {
            webResource {
              text
              url
            }
          }
        }
        defaultNoteAnswers(filter: { noteType: $noteType }) {
          nodes {
            ...NoteAnswerWithOptionsFragment
          }
        }

        operations {
          ...ClientClaimingOperationsFragment
        }
      }
    }
  }

  ${NOTE_ANSWER_WITH_OPTIONS_FRAGMENT}
  ${CLIENT_CLAIMING_OPERATIONS_FRAGMENT}
`

export const useGetClientDefaultNoteAnswers = ({
  clientId,
  noteType,
  onCompleted
}: {
  clientId: string
  noteType: ClientNoteType
  onCompleted?: () => void
}) => {
  const [fetch, { data, ...restOptions }] = useLazyQuery(
    GET_CLIENT_DEFAULT_NOTE_ANSWERS,
    {
      variables: { clientId, noteType, isForEdit: false },
      onCompleted
    }
  )

  const fetchDefaultNoteAnswers = useCallback(() => fetch(), [fetch])

  return {
    answers: data?.node?.defaultNoteAnswers?.nodes,
    referrer: data?.node?.referrer?.webResource.text,
    checkComplianceSalesFlow: data?.viewer.permits.checkComplianceSalesFlow,
    clientStatus: data?.node?.status,
    operations: data?.node?.operations,
    fetchDefaultNoteAnswers,
    ...restOptions
  }
}
