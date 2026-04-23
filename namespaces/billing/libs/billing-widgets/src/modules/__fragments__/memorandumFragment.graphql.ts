import { gql } from '@apollo/client'

import { memorandumBaseItem } from './memorandumBaseFragment.graphql'

export const memorandumItem = gql`
  fragment MemorandumItem on Memorandum {
    ...MemorandumBaseItem
    portions {
      ...MemorandumBaseItem
    }
  }

  ${memorandumBaseItem}
`
