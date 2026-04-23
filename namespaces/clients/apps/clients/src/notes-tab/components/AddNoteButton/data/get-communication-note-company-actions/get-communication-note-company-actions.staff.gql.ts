import { useCallback } from 'react'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetCommunicationNoteCompanyActionsDocument } from './get-communication-note-company-actions.staff.gql.types'

export const GET_COMMUNICATION_NOTE_COMPANY_ACTIONS = gql`
  query GetCommunicationNoteCompanyActions($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        communicationNoteCompanyActions
      }
    }
  }
`

export const useGetCommunicationNoteCompanyActions = (clientId: string) => {
  const [fetch, { data, loading }] = useLazyQuery(
    GetCommunicationNoteCompanyActionsDocument
  )

  const getCompanyActions = useCallback(
    () => fetch({ variables: { clientId } }),
    [clientId, fetch]
  )

  return {
    getCompanyActions,
    companyActions: data?.node?.communicationNoteCompanyActions ?? [],
    loading
  }
}
