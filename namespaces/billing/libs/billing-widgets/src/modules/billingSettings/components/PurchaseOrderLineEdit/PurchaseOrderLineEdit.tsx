import React, { FC, memo } from 'react'
import { Grid, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import {
  AssignJobPurchaseOrderLineInput,
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

import PurchaseOrderLineEditForm from '../PurchaseOrderLineEditForm'
import PurchaseOrderLineUrlInformation from '../PurchaseOrderLineUrlInformation'
import {
  useAssignJobPurchaseOrderLineMutation,
  useGetPurchaseOrdersOptions
} from '../../data'
import { GetJobQuery, GetJobQueryResult } from '../../data/getJob.graphql.types'
import { purchaseOrderUpdateDataEvents } from '../../utils/billingSettingsDataEvents'
import adjustValues from './adjustValues'

const responseKey = 'assignJobPurchaseOrderLine'

interface Props {
  operation?: Operation
  job: Exclude<GetJobQuery['node'], null | undefined>
  refetch: GetJobQueryResult['refetch']
}

interface FormProps extends AssignJobPurchaseOrderLineInput {
  purchaseOrderId: string
}

const PurchaseOrderEdit: FC<Props> = memo<Props>(
  ({ job, operation, refetch }) => {
    const { t: translate } = useTranslation('billingSettings')
    const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()

    const { nextPurchaseOrderLine, purchaseOrderLine, id: jobId } = job

    const purchaseOrderId = purchaseOrderLine?.purchaseOrder?.id
    const purchaseOrderLineId = purchaseOrderLine?.id
    const nextPurchaseOrderLineId = nextPurchaseOrderLine?.id

    const { data, loading } = useGetPurchaseOrdersOptions(
      jobId,
      purchaseOrderLineId ? [purchaseOrderLineId] : [],
      nextPurchaseOrderLineId ? [nextPurchaseOrderLineId] : []
    )

    useRefetch(purchaseOrderUpdateDataEvents, refetch)

    const [createAssignJobPurchaseOrderLineMutation] =
      useAssignJobPurchaseOrderLineMutation({
        onRootLevelError: handleOnRootLevelError
      })
    const handleOnSubmit = handleSubmit({
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: handleOnSuccess({
        successMessage: translate('notification.purchaseOrder.success'),
        apolloEvent: ApolloContextEvents.jobPurchaseOrderEdit
      }),
      responseKey,
      submit: createAssignJobPurchaseOrderLineMutation,
      adjustValues
    })

    return (
      <InlineForm<FormProps>
        loading={loading}
        data-testid='purchase-order-line-edit'
        operation={operation}
        label={
          <Grid direction='row'>
            <Grid.Item small={3}>
              <Typography size='medium'>
                {translate('invoice.fields.purchaseOrder.label')}
              </Typography>
            </Grid.Item>
            <Grid.Item small={9}>
              <PurchaseOrderLineUrlInformation
                purchaseOrderLine={purchaseOrderLine}
              />
            </Grid.Item>
          </Grid>
        }
        onSubmit={handleOnSubmit}
        initialValues={{
          jobId,
          purchaseOrderLineId,
          purchaseOrderId
        }}
        editComponent={
          <PurchaseOrderLineEditForm
            data={data?.client.purchaseOrdersNullable}
            currentPOid={purchaseOrderId}
          />
        }
      />
    )
  }
)

export default PurchaseOrderEdit
