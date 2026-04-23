import React, { FC, memo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import {
  AssignJobNextPurchaseOrderInput,
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

import NextPurchaseOrderEditForm from '../NextPurchaseOrderEditForm'
import { useAssignJobNextPurchaseOrderMutation, useGetJob } from '../../data'
import { purchaseOrderUpdateDataEvents } from '../../utils/billingSettingsDataEvents'

const displayName = 'PurchaseOrderEdit'
const responseKey = 'assignJobNextPurchaseOrder'

interface Props {
  jobId: string
  operation?: Operation
}

const PurchaseOrderEdit: FC<Props> = memo<Props>(({ jobId, operation }) => {
  const { t: translate } = useTranslation('billingSettings')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()

  const { data: { nextPurchaseOrder, purchaseOrder } = {}, refetch } =
    useGetJob(jobId)

  useRefetch(purchaseOrderUpdateDataEvents, refetch)

  const [createAssignJobNextPurchaseOrderMutation] =
    useAssignJobNextPurchaseOrderMutation({
      onRootLevelError: handleOnRootLevelError
    })
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      successMessage: translate('notification.nextPurchaseOrder.success'),
      apolloEvent: ApolloContextEvents.jobNextPurchaseOrderEdit
    }),
    responseKey,
    submit: createAssignJobNextPurchaseOrderMutation
  })

  return (
    <InlineForm<AssignJobNextPurchaseOrderInput>
      data-testid='next-purchase-order-edit'
      operation={operation}
      striped
      label={
        <>
          <Typography size='medium'>
            {translate('invoice.fields.nextPurchaseOrder.label')}
          </Typography>
          <Container left='xlarge'>
            {nextPurchaseOrder?.id ? (
              <LinkWrapper
                href={nextPurchaseOrder?.webResource.url}
                data-testid='next-purchase-order-link'
              >
                <Typography size='medium' weight='semibold'>
                  {nextPurchaseOrder.poNumber}
                </Typography>
              </LinkWrapper>
            ) : (
              EMPTY_DATA
            )}
          </Container>
        </>
      }
      onSubmit={handleOnSubmit}
      initialValues={{ jobId, nextPurchaseOrderId: nextPurchaseOrder?.id }}
      editComponent={
        <NextPurchaseOrderEditForm
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
