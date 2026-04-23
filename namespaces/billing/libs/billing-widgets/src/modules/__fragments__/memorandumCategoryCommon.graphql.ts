import { gql } from '@apollo/client'

export const memorandumCategoryCommon = gql`
  fragment MemorandumCategoryCommon on MemorandumCategory {
    id
    credit
    debit
    name
  }
`
