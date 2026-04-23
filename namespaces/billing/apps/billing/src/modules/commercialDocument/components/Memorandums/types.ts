import { GetCommercialDocumentMemorandumsQuery } from '../../data/getCommercialDocumentMemorandums.graphql.types'

export type Memorandum = Exclude<
  GetCommercialDocumentMemorandumsQuery['node'],
  undefined | null
>['memorandums']['nodes'][number]

export type Memorandums = Exclude<
  GetCommercialDocumentMemorandumsQuery['node'],
  undefined | null
>['memorandums']['nodes']

type Document = Exclude<
  GetCommercialDocumentMemorandumsQuery['node'],
  undefined | null
>['memorandums']['nodes'][number]['document']

export type InvoiceDocument = Extract<
  Document,
  {
    subjectObject: {
      fullName: string
      id: string
    }
  }
>
