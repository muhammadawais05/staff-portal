import { gql } from '@apollo/client'

import { memorandumListItemFragment } from '../../__fragments__/memorandumListItemFragment.graphql'

export default gql`
  query GetMemorandumsList(
    $pagination: OffsetPagination!
    $filter: MemorandumsFilter!
  ) {
    memorandums: memorandumsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      nodes {
        ...MemorandumListItemFragment
      }
    }
  }

  ${memorandumListItemFragment}
`
