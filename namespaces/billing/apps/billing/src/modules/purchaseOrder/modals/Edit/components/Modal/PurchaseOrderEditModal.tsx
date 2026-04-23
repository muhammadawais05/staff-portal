import React from 'react'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { useSetUpdatePurchaseOrderMutation } from '../../../../data/setUpdatePurchaseOrder.graphql.types'
import { useGetPurchaseOrderLinesToUpdate } from '../../../../data'
import PurchaseOrderEditModalForm from '../ModalForm'
import adjustValues from './adjustValues'
import { getInitialValuesToUpdatePurchaseOrder } from '../../../../utils'

const responseKey = 'updatePurchaseOrder'

interface Props {
  options: {
    nodeId: string
  }
}

const PurchaseOrderEditModal = ({ options: { nodeId } }: Props) => {
  const { t: translate } = useTranslation('purchaseOrder')
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const [updatePurchaseOrderMutation] = useSetUpdatePurchaseOrderMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const { data, loading, initialLoading } =
    useGetPurchaseOrderLinesToUpdate(nodeId)

  const handleOnSubmit = handleSubmit({
    adjustValues,
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.purchaseOrderUpdate,
      successMessage: translate('editModal.notification.success')
    }),
    responseKey,
    submit: updatePurchaseOrderMutation,
    variables: {
      clientId: data?.client?.id,
      purchaseOrderId: data?.id
    }
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate('createModal.title')} />
      }
    >
      <PurchaseOrderEditModalForm
        initialValues={getInitialValuesToUpdatePurchaseOrder(data)}
        handleOnSubmit={handleOnSubmit}
      />
    </ContentLoader>
  )
}

export default PurchaseOrderEditModal
