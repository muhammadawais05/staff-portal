import React from 'react'
import { useTranslation } from 'react-i18next'
// TODO: remove once poLinesExperiment has been released to production
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useGetExperiments } from '@staff-portal/billing/src/data'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { useSetCreatePurchaseOrderMutation } from '../../../../data/setCreatePurchaseOrder.graphql.types'
import PurchaseOrderCreateModalForm from '../ModalForm'
import adjustValues from './adjustValues'

const displayName = 'PurchaseOrderCreateModal'
const responseKey = 'createPurchaseOrder'

const PurchaseOrderCreateModal = () => {
  const { t: translate } = useTranslation('purchaseOrder')
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const [createPurchaseOrderMutation] = useSetCreatePurchaseOrderMutation({
    onRootLevelError: handleOnRootLevelError
  })
  // TODO: remove once poLinesExperiment has been released to production
  const { data: experiments, loading, initialLoading } = useGetExperiments()
  const poLinesEnabled = Boolean(experiments?.poLines?.enabled)

  const handleOnSubmit = handleSubmit({
    adjustValues,
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.purchaseOrderCreate,
      successMessage: translate('createModal.notification.success')
    }),
    responseKey,
    submit: createPurchaseOrderMutation,
    validate: values =>
      // todo: remove this adjustment as soon as Form.Autocomplete will support `id` instead of `search term` as value
      //   see https://toptal-core.atlassian.net/browse/FX-1469
      values.clientId
        ? {}
        : { clientId__fake: translate('createModal.fields.client.error') }
  })

  // TODO: remove ContentLoader once poLinesExperiment has been released to production
  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton title={translate('createModal.title')} />
      }
    >
      <PurchaseOrderCreateModalForm
        handleOnSubmit={handleOnSubmit}
        poLinesEnabled={poLinesEnabled}
      />
    </ContentLoader>
  )
}

PurchaseOrderCreateModal.displayName = displayName

export default PurchaseOrderCreateModal
