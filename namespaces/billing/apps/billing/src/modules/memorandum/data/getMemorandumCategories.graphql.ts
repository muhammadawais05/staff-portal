import { gql } from '@apollo/client'
import { memorandumCategoryCommon } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumCategoryCommon.graphql'

export default gql`
  query GetMemorandumCategories(
    $documentType: MemorandumCategoryDocumentType!
  ) {
    memorandumCategories: memorandumCategoriesNullable(
      documentType: $documentType
    ) {
      nodes {
        ...MemorandumCategoryCommon
      }
    }
  }

  ${memorandumCategoryCommon}
`
