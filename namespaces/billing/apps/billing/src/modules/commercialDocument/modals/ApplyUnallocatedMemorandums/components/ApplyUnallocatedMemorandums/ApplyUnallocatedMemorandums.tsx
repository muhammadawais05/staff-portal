import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import {
  ApplyUnallocatedMemorandumsToCommercialDocumentInput,
  ApplyUnallocatedMemorandumsToCommercialDocumentPayload
} from '@staff-portal/graphql/staff'
import {
  encodeId,
  NodeIdPrefix
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import { useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery } from '../../data'
import ApplyUnallocatedMemorandumsContent from '../ApplyUnallocatedMemorandumsContent'

const displayName = 'ApplyUnallocatedMemorandums'

export type StepCompleted = (
  mutationInput?: ApplyUnallocatedMemorandumsToCommercialDocumentInput,
  mutationResult?: ApplyUnallocatedMemorandumsToCommercialDocumentPayload
) => void

export interface ApplyUnallocatedMemorandumsFormValues
  extends ApplyUnallocatedMemorandumsToCommercialDocumentInput {
  creditMemorandums: string[]
  debitMemorandums: string[]
}

type Props = {
  options?: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
  commercialDocumentId?: string
  isApplyMemosAndPayFlow?: boolean
  onStepCompleted?: StepCompleted
}

const ApplyUnallocatedMemorandums: FC<Props> = memo(
  ({
    options,
    commercialDocumentId,
    isApplyMemosAndPayFlow,
    onStepCompleted
  }) => {
    const id =
      commercialDocumentId ||
      encodeId({
        id: options?.nodeId as string,
        type: options?.nodeType as keyof typeof NodeIdPrefix
      })
    const { data, loading, initialLoading } = useGetNode(
      useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery
      // todo : use custom merge policy at src/_lib/helpers/apolloBillingCache/index.ts, remove `fetchPolicy` prop
      // no-cache policy required, because of `MemorandumConnection` (it has no uniq id)
    )({ id }, { fetchPolicy: 'no-cache' })
    const { t: translate } = useTranslation('commercialDocument')

    const commercialDocumentType =
      options?.nodeType === 'invoice' ? 'invoice' : 'payment'

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate(
              `modals.applyMemos.title.${commercialDocumentType}` as const,
              {
                id
              }
            )}
          />
        }
      >
        <ApplyUnallocatedMemorandumsContent
          commercialDocument={data}
          isApplyMemosAndPayFlow={isApplyMemosAndPayFlow}
          onStepCompleted={onStepCompleted}
        />
      </ContentLoader>
    )
  }
)

ApplyUnallocatedMemorandums.displayName = displayName

export default ApplyUnallocatedMemorandums
