import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState } from 'react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { CreateEngagementPlacementFeeInput } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  GeneralResponse,
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import {
  formatDateURL,
  getCurrentTime
} from '@staff-portal/billing/src/_lib/dateTime'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import {
  getDefaultSelectPurchaseOrder,
  getPurchaseOrderLines,
  getSelectFormatPurchaseOrders
} from '../../../../job/utils'
import AddModalForm from '../AddModalForm'
import adjustValues from './adjustValues'
import { useGetEngagementQuery } from '../../../../engagement/data/getEngagement.graphql.types'
import { useSetCreateEngagementPlacementFeeMutation } from '../../data/setCreateEngagementPlacementFee.graphql.types'

const responseKey = 'createEngagementPlacementFee'
const displayName = 'AddModal'

interface Props {
  options: Required<ModalData>
}

export interface PlacementFeeInput
  extends Pick<CreateEngagementPlacementFeeInput, 'installments'> {
  purchaseOrderId?: string
  purchaseOrderLineId?: string
}

const AddModal: FC<Props> = memo(({ options }) => {
  const { t: translate } = useTranslation('placementFees')
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
  const [isConfirmStep, setConfirmStep] = useState(false)

  const [setCreateEngagementPlacementFeeMutation] =
    useSetCreateEngagementPlacementFeeMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const { data, loading, initialLoading } = useGetEngagementQuery({
    fetchPolicy: 'network-only',
    variables: {
      engagementId: encodeId({
        id: options.engagementId,
        type: 'engagement'
      })
    }
  })

  const { id, job } = data?.node || {}

  const purchaseOrders = job?.client?.purchaseOrders?.nodes
  const initialValues: PlacementFeeInput = {
    installments: [
      {
        amount: '',
        dueDate: formatDateURL(getCurrentTime())
      }
    ],
    purchaseOrderId: getDefaultSelectPurchaseOrder(purchaseOrders)
  }
  const handleError = (response: GeneralResponse) => {
    setConfirmStep(false)

    return handleOnSubmissionError(responseKey)(response)
  }

  const handleOnSubmit = handleSubmit({
    adjustValues,
    handleError,
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.placementFeeCreate,
      outboundEvent: { key: 'placement-fee-submit' },
      successMessage: translate('notification.submit')
    }),
    responseKey,
    submit: setCreateEngagementPlacementFeeMutation,
    variables: { engagementId: id }
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<ModalSkeleton title={translate('AddModal.title')} />}
    >
      <Form<PlacementFeeInput>
        data-testid={displayName}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        mutators={{ ...arrayMutators }}
        keepDirtyOnReinitialize
      >
        <AddModalForm
          purchaseOrders={getSelectFormatPurchaseOrders(purchaseOrders)}
          purchaseOrderLines={getPurchaseOrderLines(purchaseOrders)}
          setConfirmStep={setConfirmStep}
          isConfirmStep={isConfirmStep}
        />
      </Form>
    </ContentLoader>
  )
})

AddModal.displayName = displayName

export default AddModal
