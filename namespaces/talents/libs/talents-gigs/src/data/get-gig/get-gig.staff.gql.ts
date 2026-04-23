import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetGigDocument } from './get-gig.staff.gql.types'
import { GIG_FRAGMENT } from '../gig-fragment'

export const GET_GIG: typeof GetGigDocument = gql`
  query GetGig($id: ID!) {
    node(id: $id) {
      ...GigFragment
    }
  }

  ${GIG_FRAGMENT}
`

export const useGetGig = (id: string) => {
  const {
    data: gig,
    error,
    ...restOptions
  } = useGetNode(GetGigDocument)({ id })

  if (error && gig) {
    throw error
  }

  return { gig, error, ...restOptions }
}
