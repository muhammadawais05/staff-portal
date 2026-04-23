import { FC, FunctionComponent } from 'react'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { GetAddMemorandumQuery } from '../data'

export type MemorandumTemplates = {
  [id: string]: Partial<{
    [key in MemorandumBalance]: null | string
  }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MemorandumAddModalFormContext<T = any> = FunctionComponent<{
  nodeId?: string
  nodeType?: CommercialDocumentType
  externalInitialValues?: Partial<T>
  children: FC<{
    document?: Exclude<GetAddMemorandumQuery['node'], null | undefined>
    loading: boolean
    initialLoading: boolean
    handleOnSubmit: (values: T) => void
    initialValues: Partial<T>
    showReceiverField: boolean
  }>
}>
