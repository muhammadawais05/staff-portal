import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { CreateEngagementExtraExpensesInput } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'

import { useGetEngagementQuery } from '../../../../engagement/data/getEngagement.graphql.types'
import { useSetCreateEngagementExtraExpensesMutation } from '../../data/setCreateEngagementExtraExpenses.graphql.types'
import ExtraExpensesAddForm from '../ExtraExpensesAddForm'
import {
  getDefaultSelectPurchaseOrder,
  getPurchaseOrderLines
} from '../../../../job/utils'

const responseKey = 'createEngagementExtraExpenses'
const displayName = 'ExtraExpensesAddModal'

interface Props {
  options: Required<ModalData>
}

export const ExtraExpensesAddModal: FC<Props> = memo(({ options }) => {
  const { t: translate } = useTranslation('extraExpenses')
  const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()

  const [setCreateEngagementExtraExpensesMutation] =
    useSetCreateEngagementExtraExpensesMutation({
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

  const { id, job, talent } = data?.node || {}

  const purchaseOrders = job?.client?.purchaseOrders?.nodes
  const initialValues: CreateEngagementExtraExpensesInput = {
    companyAmount: '',
    description: '',
    engagementId: id as string,
    purchaseOrderId: getDefaultSelectPurchaseOrder(purchaseOrders),
    talentAmount: ''
  }
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError(responseKey),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.extraExpensesCreate,
      successMessage: translate('notification.add.success')
    }),
    responseKey,
    submit: setCreateEngagementExtraExpensesMutation
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<ModalSkeleton title={translate('AddModal.title')} />}
    >
      <Form<CreateEngagementExtraExpensesInput>
        data-testid={`${displayName}Form`}
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      >
        <ExtraExpensesAddForm
          purchaseOrders={purchaseOrders}
          purchaseOrderLines={getPurchaseOrderLines(purchaseOrders)}
          jobTitle={job?.title}
          talentName={talent?.fullName}
        />
      </Form>
    </ContentLoader>
  )
})

ExtraExpensesAddModal.displayName = displayName

export default ExtraExpensesAddModal
