import { useMemo } from 'react'
import { gql, useGetData } from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'

import { GetVerticalsDocument } from './get-verticals.staff.gql.types'

export default gql`
  query GetVerticals {
    verticals(order: { field: ID, direction: ASC }) {
      nodes {
        id
        talentType
      }
    }
  }
`

export const useGetVerticals = () => {
  const { data, ...restOptions } = useGetData(
    GetVerticalsDocument,
    'verticals'
  )(undefined, { fetchPolicy: 'cache-first' })

  return {
    ...restOptions,
    data: useMemo(
      () =>
        data?.nodes.map(({ id, talentType }) => ({
          text: titleize(talentType),
          value: id
        })) || [],
      [data]
    )
  }
}
