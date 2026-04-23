import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetBillingNotesDocument } from './get-billing-notes.staff.gql.types'

export default gql`
  query GetBillingNotes($staffId: ID!) {
    node(id: $staffId) {
      ... on Staff {
        id
        billingNotes
      }
    }
  }
`

export const getLazyBillingNotesHook = (staffId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetBillingNotesDocument,
    {
      variables: { staffId }
    }
  )

  return {
    request,
    data: data?.node?.billingNotes,
    error,
    loading
  }
}
