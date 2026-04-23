import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import {
  ApplyUnallocatedMemorandumsToPaymentGroupInput,
  ApplyUnallocatedMemorandumsToPaymentGroupPayload
} from '@staff-portal/graphql/staff'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'

import { useGetApplyUnallocatedMemorandumsToPaymentGroupQuery } from '../../data'
import PaymentGroupApplyUnallocatedMemosContent from '../PaymentGroupApplyUnallocatedMemosContent'

const displayName = 'PaymentGroupApplyUnallocatedMemos'

export type StepCompleted = (
  mutationInput?: ApplyUnallocatedMemorandumsToPaymentGroupInput,
  mutationResult?: ApplyUnallocatedMemorandumsToPaymentGroupPayload
) => void

export interface ApplyUnallocatedMemorandumsFormValues
  extends ApplyUnallocatedMemorandumsToPaymentGroupInput {
  creditMemorandums: string[]
  debitMemorandums: string[]
}

interface Props {
  nodeId: string
  onStepCompleted: StepCompleted
}

const PaymentGroupApplyUnallocatedMemos: FC<Props> = memo(
  ({ nodeId, onStepCompleted }) => {
    const { data, loading, initialLoading } = useGetNode(
      useGetApplyUnallocatedMemorandumsToPaymentGroupQuery
      // no-cache policy required, because of `MemorandumConnection` (it has no uniq id)
    )({ id: nodeId }, { fetchPolicy: 'no-cache' })
    const { t: translate } = useTranslation('paymentGroup')
    const { id } = decodeRawIdAndType(nodeId)

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate('modals.applyMemos.title', {
              id
            })}
          />
        }
      >
        <PaymentGroupApplyUnallocatedMemosContent
          paymentGroup={data}
          onStepCompleted={onStepCompleted}
        />
      </ContentLoader>
    )
  }
)

PaymentGroupApplyUnallocatedMemos.displayName = displayName

export default PaymentGroupApplyUnallocatedMemos
