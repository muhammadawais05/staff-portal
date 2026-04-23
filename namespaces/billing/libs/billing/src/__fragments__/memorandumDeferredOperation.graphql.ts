import { gql } from '@apollo/client'

import { memorandumOperationsFragment } from './memorandumOperationsFragment.graphql'
import { webResourceFragment } from './webResourceFragment.graphql'

export const memorandumDeferredOperation = gql`
  fragment MemorandumDeferredOperationFragment on Memorandum {
    id
    downloadHtmlUrl
    downloadPdfUrl
    ...MemorandumOperationsFragment
  }

  ${memorandumOperationsFragment}
  ${webResourceFragment}
`
