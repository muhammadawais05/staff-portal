import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Notification } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { PayMultiplePaymentsInput } from '@staff-portal/graphql/staff'
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

import { useGetMultiplePaymentsListQuery } from '../../../../data/getMultiplePaymentsList.graphql.types'
import PaymentMultiplePayModalForm from '../PaymentMultiplePayModalForm'
import { useSetPayMultiplePaymentsMutation } from '../../data'
import adjustValues from './adjustValues'

const responseKey = 'payMultiplePayments'
const displayName = 'PaymentMultiplePayModal'

interface Props {
  options: ModalData
}

export const PaymentMultiplePayModal: FC<Props> = memo<Props>(
  ({ options: { data: filter } }) => {
    const {
      data: { nodes: payments, totalCount } = { nodes: [], totalCount: 0 },
      loading,
      initialLoading,
      refetch
    } = useGetData(useGetMultiplePaymentsListQuery, 'payments')(
      {
        filter: {
          forPayMultiple: true,
          ...filter
        },
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

    useRefetch([ApolloContextEvents.paymentMultiplePay], refetch)

    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()

    const { t: translate } = useTranslation('payment')

    const [multiplePayMutation] = useSetPayMultiplePaymentsMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const initialValues = {
      isEverythingSelected: true,
      comment: '',
      paymentIds: payments.map(({ id }) => id),
      filter
    }

    const handleOnSubmit = handleSubmit({
      adjustValues,
      handleError: handleOnSubmissionError(responseKey),
      handleSuccess: (input: PayMultiplePaymentsInput) => {
        handleOnSuccess({
          isModal: false,
          apolloEvent: ApolloContextEvents.paymentMultiplePay,
          successMessage: translate(
            'modals.multiplePayModal.notification.success',
            { paidCount: input.paymentIds.length }
          )
        })()
      },
      responseKey,
      submit: multiplePayMutation
    })

    if (!loading && !payments.length) {
      return (
        <AlertModal
          title={translate('modals.multiplePayModal.title')}
          message={
            <Notification>
              {translate(
                'modals.multiplePayModal.noPaymentsWithPreferredPaymentMethodWarning'
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
          <ModalSkeleton title={translate('modals.multiplePayModal.title')} />
        }
      >
        <Form<PayMultiplePaymentsInput>
          data-testid={displayName}
          onSubmit={handleOnSubmit}
          initialValues={initialValues}
          keepDirtyOnReinitialize
        >
          <PaymentMultiplePayModalForm
            payments={payments}
            totalCount={totalCount || undefined}
          />
        </Form>
      </ContentLoader>
    )
  }
)

PaymentMultiplePayModal.displayName = displayName

export default PaymentMultiplePayModal
