import React, { FC, memo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import {
  AssignJobPurchaseOrderInput,
  Operation
} from '@staff-portal/graphql/staff'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import InlineForm from '@staff-portal/billing/src/components/InlineForm'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import PurchaseOrderEditForm from '../PurchaseOrderEditForm'
import { useAssignJobPurchaseOrderMutation, useGetJob } from '../../data'
import { purchaseOrderUpdateDataEvents } from '../../utils/billingSettingsDataEvents'

const displayName = 'PurchaseOrderEdit'
const responseKey = 'assignJobPurchaseOrder'

interface Props {
  jobId: string
  operation?: Operation
}

const PurchaseOrderEdit: FC<Props> = memo<Props>(({ jobId, operation }) => {
  const { t: translate } = useTranslation('billingSettings')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()

  const { data: { purchaseOrder, nextPurchaseOrder } = {}, refetch } =
    useGetJob(jobId)

  useRefetch(purchaseOrderUpdateDataEvents, refetch)

  const [createAssignJobPurchaseOrderMutation] =
    useAssignJobPurchaseOrderMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      successMessage: translate('notification.purchaseOrder.success'),
      apolloEvent: ApolloContextEvents.jobPurchaseOrderEdit
    }),
    responseKey,
    submit: createAssignJobPurchaseOrderMutation
  })

  return (
    <InlineForm<AssignJobPurchaseOrderInput>
      data-testid='purchase-order-edit'
      operation={operation}
      label={
        <>
          <Typography size='medium'>
            {translate('invoice.fields.purchaseOrder.label')}
          </Typography>
          <Container left='xlarge'>
            {purchaseOrder?.id ? (
              <LinkWrapper
                href={purchaseOrder?.webResource.url}
                data-testid='purchase-order-link'
              >
                <Typography size='medium' weight='semibold'>
                  {purchaseOrder.poNumber}
                </Typography>
              </LinkWrapper>
            ) : (
              EMPTY_DATA
            )}
          </Container>
        </>
      }
      onSubmit={handleOnSubmit}
      initialValues={{ jobId, purchaseOrderId: purchaseOrder?.id }}
      editComponent={
        <PurchaseOrderEditForm
          jobId={jobId}
          currentPOid={purchaseOrder?.id}
          nextPOid={nextPurchaseOrder?.id}
        />
      }
    />
  )
})

PurchaseOrderEdit.displayName = displayName

export default PurchaseOrderEdit
