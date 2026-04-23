import { MemorandumCategoryDocumentType } from '@staff-portal/graphql/staff'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { getMemorandumDocumentTypeByNodeType } from './getMemorandumDocumentTypeByNodeType'

describe('getMemorandumDocumentTypeByNodeType', () => {
  it('returns valid memorandum category respectively to commercial document node type', () => {
    expect(
      getMemorandumDocumentTypeByNodeType(CommercialDocumentType.invoice)
    ).toEqual(MemorandumCategoryDocumentType.INVOICE)
    expect(
      getMemorandumDocumentTypeByNodeType(CommercialDocumentType.payment)
    ).toEqual(MemorandumCategoryDocumentType.PAYMENT)
    expect(getMemorandumDocumentTypeByNodeType()).toEqual(
      MemorandumCategoryDocumentType.ROLE
    )
  })
})
