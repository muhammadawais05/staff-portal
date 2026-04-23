import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'

import { GetVerticalSpecializationsDocument } from './use-get-vertical-specializations.staff.gql.types'

export default gql`
  query GetVerticalSpecializations($verticalId: ID!) {
    node(id: $verticalId) {
      ... on Vertical {
        id
        specializations(order: { field: TITLE, direction: ASC }) {
          nodes {
            id
            title
          }
        }
      }
    }
  }
`

export const useGetVerticalSpecializations = (verticalId?: string | null) => {
  const { data, ...restOptions } = useGetNode(
    GetVerticalSpecializationsDocument
  )(
    { verticalId: verticalId as string },
    {
      skip: !verticalId,
      fetchPolicy: 'cache-first'
    }
  )

  return {
    ...restOptions,
    data: useMemo(
      () =>
        data?.specializations.nodes.map(({ id, title }) => ({
          value: id,
          text: title
        })) || [],
      [data]
    )
  }
}
