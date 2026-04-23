import React, { FC, memo, useCallback } from 'react'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import MemorandumsTable from './Table'
import { useGetCommercialDocumentMemorandums } from '../../data'
import MemorandumsSkeleton from './MemorandumsSkeleton'
import { memorandumActionHandler } from '../../../memorandum/utils/memorandumActionHandler'
import { memorandumDataEvents } from '../../../memorandum/utils'

const displayName = 'Memorandums'

interface Props {
  commercialDocumentId: string
}

const Memorandums: FC<Props> = memo(({ commercialDocumentId }) => {
  const { data, loading, initialLoading, refetch } =
    useGetCommercialDocumentMemorandums(commercialDocumentId)
  const type = decodeRawIdAndType(commercialDocumentId)
    .type as unknown as CommercialDocumentType
  const memorandums = data?.memorandums?.nodes || []
  const associatedMemorandums = data?.associatedMemorandums?.nodes || []

  const { handleOnOpenModalWithUrlSearch } = useModals()
  const handleMemorandumActionClick = useCallback(
    memorandumActionHandler({
      handleOnOpenModal: handleOnOpenModalWithUrlSearch
    }),
    [handleOnOpenModalWithUrlSearch]
  )

  useRefetch(memorandumDataEvents, refetch)

  return (
    <>
      <ContentLoader
        showSkeleton={initialLoading}
        loading={loading}
        skeletonComponent={<MemorandumsSkeleton />}
      >
        <MemorandumsTable
          isAllocated
          nodeType={type}
          commercialDocumentId={commercialDocumentId}
          memorandums={memorandums}
          handleMemorandumActionClick={handleMemorandumActionClick}
        />
        <MemorandumsTable
          nodeType={type}
          commercialDocumentId={commercialDocumentId}
          memorandums={associatedMemorandums}
          handleMemorandumActionClick={handleMemorandumActionClick}
        />
      </ContentLoader>
    </>
  )
})

Memorandums.displayName = displayName

export default Memorandums
