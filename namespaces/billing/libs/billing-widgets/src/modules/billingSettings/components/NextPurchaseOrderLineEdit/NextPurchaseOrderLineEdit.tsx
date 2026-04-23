import React, { FC, memo } from 'react'
import { Grid, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import {
  AssignJobNextPurchaseOrderLineInput,
  Operation
} from '@staff-portal/graphql/staff'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import InlineForm from '@staff-portal/billing/src/components/InlineForm'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import PurchaseOrderLineUrlInformation from '../PurchaseOrderLineUrlInformation'
import NextPurchaseOrderLineEditForm from '../NextPurchaseOrderLineEditForm'
import {
  useAssignJobNextPurchaseOrderLineMutation,
  useGetPurchaseOrdersOptions
} from '../../data'
import { purchaseOrderUpdateDataEvents } from '../../utils/billingSettingsDataEvents'
import adjustValues from '../PurchaseOrderLineEdit/adjustValues'
import { GetJobQuery, GetJobQueryResult } from '../../data/getJob.graphql.types'

const responseKey = 'assignJobNextPurchaseOrderLine'

interface Props {
  operation?: Operation
  job: Exclude<GetJobQuery['node'], null | undefined>
  refetch: GetJobQueryResult['refetch']
}

interface FormProps extends AssignJobNextPurchaseOrderLineInput {
  nextPurchaseOrderId: string
}

const NextPurchaseOrderLineEdit: FC<Props> = memo<Props>(
  ({ job, operation, refetch }) => {
    const { t: translate } = useTranslation('billingSettings')
    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()

    const { nextPurchaseOrderLine, purchaseOrderLine, id: jobId } = job
    const nextPurchaseOrderId = nextPurchaseOrderLine?.purchaseOrder?.id
    const nextPurchaseOrderLineId = nextPurchaseOrderLine?.id ?? ''
    const purchaseOrderLineId = purchaseOrderLine?.id

    const { data, loading } = useGetPurchaseOrdersOptions(
      jobId,
      nextPurchaseOrderLineId ? [nextPurchaseOrderLineId] : [],
      purchaseOrderLineId ? [purchaseOrderLineId] : []
    )

    useRefetch(purchaseOrderUpdateDataEvents, refetch)

    const [createAssignJobNextPurchaseOrderLineMutation] =
      useAssignJobNextPurchaseOrderLineMutation({
        onRootLevelError: handleOnRootLevelError
      })
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        successMessage: translate('notification.nextPurchaseOrder.success'),
        apolloEvent: ApolloContextEvents.jobNextPurchaseOrderEdit
      }),
      responseKey,
      submit: createAssignJobNextPurchaseOrderLineMutation,
      adjustValues
    })

    return (
      <InlineForm<FormProps>
        data-testid='next-purchase-order-edit'
        operation={operation}
        loading={loading}
        striped
        label={
          <Grid direction='row'>
            <Grid.Item small={3}>
              <Typography size='medium'>
                {translate('invoice.fields.nextPurchaseOrder.label')}
              </Typography>
            </Grid.Item>
            <Grid.Item small={9}>
              <PurchaseOrderLineUrlInformation
                purchaseOrderLine={nextPurchaseOrderLine}
              />
            </Grid.Item>
          </Grid>
        }
        onSubmit={handleOnSubmit}
        initialValues={{
          jobId,
          nextPurchaseOrderId,
          nextPurchaseOrderLineId
        }}
        editComponent={
          <NextPurchaseOrderLineEditForm
            data={data?.client.purchaseOrdersNullable}
            currentPOid={nextPurchaseOrderId}
          />
        }
      />
    )
  }
)

export default NextPurchaseOrderLineEdit
