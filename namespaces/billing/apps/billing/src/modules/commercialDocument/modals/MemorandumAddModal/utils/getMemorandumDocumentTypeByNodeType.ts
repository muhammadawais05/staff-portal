import { MemorandumCategoryDocumentType } from '@staff-portal/graphql/staff'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

export const getMemorandumDocumentTypeByNodeType = (
  nodeType?: CommercialDocumentType
) => {
  switch (nodeType) {
    case 'invoice':
      return MemorandumCategoryDocumentType.INVOICE
    case 'payment':
      return MemorandumCategoryDocumentType.PAYMENT
    default:
      return MemorandumCategoryDocumentType.ROLE
  }
}
