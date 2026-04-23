import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Notification } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { PayPaymentGroupsInput } from '@staff-portal/graphql/staff'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import AlertModal from '@staff-portal/billing/src/components/AlertModal'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { useGetPaymentGroupsListQuery } from '../../../../data/getPaymentGroupsList.graphql.types'
import PaymentGroupMultiplePayModalForm from '../PaymentGroupMultiplePayModalForm'
import { useSetPayPaymentGroupsMutation } from '../../data'
import adjustValues from './adjustValues'

const responseKey = 'payPaymentGroups'
const displayName = 'PaymentGroupMultiplePayModal'

interface Props {
  options: ModalData
}

export const PaymentGroupMultiplePayModal: FC<Props> = memo<Props>(
  ({ options: { data: filterData } }) => {
    const filter = {
      forPayMultiple: true,
      ...filterData
    }

    const {
      data: { nodes: paymentGroups, totalCount } = { nodes: [], totalCount: 0 },
      loading,
      initialLoading,
      refetch
    } = useGetData(useGetPaymentGroupsListQuery, 'paymentGroupsNullable')(
      {
        filter,
        pagination: {
          offset: 0,
          limit: 25
        }
      },
      {
        abortKey: displayName,
        fetchPolicy: 'network-only'
      }
    )

    useRefetch(ApolloContextEvents.payPaymentGroups, refetch)

    const { t: translate } = useTranslation('paymentGroupList')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [payPaymentGroupsMutation] = useSetPayPaymentGroupsMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const initialValues = {
      isEverythingSelected: true,
      comment: '',
      paymentGroupIds: paymentGroups.map(({ id }) => id),
      filter
    }

    const handleOnSubmit = handleSubmit({
      adjustValues,
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: (input: PayPaymentGroupsInput) => {
        handleOnSuccess({
          isModal: false,
          apolloEvent: ApolloContextEvents.payPaymentGroups,
          successMessage: translate(
            'modals.payPaymentGroups.notification.success',
            { paidCount: input.paymentGroupIds.length }
          )
        })()
      },
      responseKey,
      submit: payPaymentGroupsMutation
    })

    if (!loading && !paymentGroups.length) {
      return (
        <AlertModal
          title={translate('modals.payPaymentGroups.title')}
          message={
            <Notification>
              {translate(
                'modals.payPaymentGroups.noPaymentGroupsWithPreferredPaymentMethodWarning'
              )}
            </Notification>
          }
        />
      )
    }

    return (
      <ContentLoader
        isModalContainer
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton title={translate('modals.payPaymentGroups.title')} />
        }
      >
        <Form<PayPaymentGroupsInput>
          data-testid={displayName}
          onSubmit={handleOnSubmit}
          initialValues={initialValues}
          keepDirtyOnReinitialize
        >
          <PaymentGroupMultiplePayModalForm
            paymentGroups={paymentGroups}
            totalCount={totalCount || 0}
          />
        </Form>
      </ContentLoader>
    )
  }
)

PaymentGroupMultiplePayModal.displayName = displayName

export default PaymentGroupMultiplePayModal
