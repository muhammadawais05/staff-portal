import React, { memo, SyntheticEvent } from 'react'
import { camelCase } from 'lodash-es'

import { useGetData } from '../../utils/graphql'
import {
  GetOperationsQuery,
  useGetOperationsQuery
} from './data/getOperations.graphql.types'
import Actions from '../Actions'
import SkeletonActions from './SkeletonActions'
import { decodeRawIdAndType } from '../../_lib/helpers/apollo'
import { InvoiceDeferredOperationFragment } from '../../__fragments__/invoiceDeferredOperation.graphql.types'
import { PaymentDeferredOperationFragment } from '../../__fragments__/paymentDeferredOperation.graphql.types'
import { TranslationCode } from '../Actions/components/ActionsList/ActionsList'

const displayName = 'OperationFetcherForActions'

interface Props {
  id: string
  actionItems: string[]
  handleOnClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

type Operations = Exclude<GetOperationsQuery['node'], null | undefined>
type CommercialDocument =
  | InvoiceDeferredOperationFragment
  | PaymentDeferredOperationFragment

const OperationFetcherForActions = <TData extends Operations>({
  id,
  actionItems,
  handleOnClick
}: Props) => {
  const { data, loading } = useGetData(
    useGetOperationsQuery,
    'node'
  )({ nodeId: id })
  const { id: nodeId, type: nodeType } = decodeRawIdAndType(id)

  if (loading) {
    return <SkeletonActions />
  }

  const {
    operations,
    documentNumber,
    webResource,
    downloadHtmlUrl,
    downloadPdfUrl
  } = data as TData extends CommercialDocument
    ? CommercialDocument
    : Record<string, null | undefined> & {
        operations: Operations['operations']
      }

  return (
    <Actions
      translationCode={camelCase(nodeType) as TranslationCode}
      actionItems={actionItems}
      nodeId={nodeId}
      documentNumber={documentNumber}
      downloadHtmlUrl={downloadHtmlUrl}
      downloadPdfUrl={downloadPdfUrl}
      handleOnClick={handleOnClick}
      operations={operations}
      webResource={webResource}
    />
  )
}

OperationFetcherForActions.displayName = displayName

export default memo(OperationFetcherForActions)
