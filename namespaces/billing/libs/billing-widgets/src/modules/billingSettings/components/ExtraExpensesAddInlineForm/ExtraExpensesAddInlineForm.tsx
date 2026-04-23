import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { CreateEngagementExtraExpensesInput } from '@staff-portal/graphql/staff'
import InlineSectionForm from '@staff-portal/billing/src/components/InlineSectionForm'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import InlineFormSkeleton from '@staff-portal/billing/src/components/InlineFormSkeleton'

import { useGetEngagementQuery } from '../../../engagement/data/getEngagement.graphql.types'
import { useSetCreateEngagementExtraExpensesMutation } from '../../../extraExpenses/modals/data/setCreateEngagementExtraExpenses.graphql.types'
import ExtraExpensesAddForm from '../../../extraExpenses/modals/components/ExtraExpensesAddForm/ExtraExpensesAddForm'
import {
  getDefaultSelectPurchaseOrder,
  getPurchaseOrderLines
} from '../../../job/utils'

const responseKey = 'createEngagementExtraExpenses'
const displayName = 'ExtraExpensesAddInlineForm'

interface Props {
  engagementId: string
  isOpenInlineForm: boolean
  onCloseForm: () => void
}

export const ExtraExpensesAddInlineForm: FC<Props> = memo(
  ({ engagementId, isOpenInlineForm, onCloseForm }) => {
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
          id: engagementId,
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
      handleSuccess: () => {
        onCloseForm()

        return handleOnSuccess({
          apolloEvent: ApolloContextEvents.extraExpensesCreate,
          successMessage: translate('notification.add.success')
        })()
      },
      responseKey,
      submit: setCreateEngagementExtraExpensesMutation
    })

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <InlineFormSkeleton title={<>{translate('Table.title')}</>} />
        }
      >
        {isOpenInlineForm && (
          <InlineSectionForm<CreateEngagementExtraExpensesInput>
            headerTitle={translate('AddModal.submit')}
            saveButtonText='Save'
            onClose={onCloseForm}
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            editComponent={
              <ExtraExpensesAddForm
                purchaseOrders={purchaseOrders}
                purchaseOrderLines={getPurchaseOrderLines(purchaseOrders)}
                jobTitle={job?.title}
                talentName={talent?.fullName}
                isInline
              />
            }
          />
        )}
      </ContentLoader>
    )
  }
)

ExtraExpensesAddInlineForm.displayName = displayName

export default ExtraExpensesAddInlineForm
