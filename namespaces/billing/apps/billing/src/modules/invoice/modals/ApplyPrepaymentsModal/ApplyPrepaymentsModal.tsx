import { Form, FormRenderProps } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ApplyPrepaymentsInput, InvoiceKind } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import AlertModal from '@staff-portal/billing/src/components/AlertModal'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'

import { useGetInvoiceForPrepaymentQuery } from './data/getInvoiceForPrepayment.graphql.types'
import validator from './validator'
import InvoiceApplyPrepaymentsModalForm from './components/ApplyPrepaymentsModalForm'
import { PENDING_TO_PAY_STATUSES } from '../../utils'
import { useSetApplyPrepaymentsMutation } from './data/setApplyPrepaymentsInvoice.graphql.types'

const displayName = 'InvoiceApplyPrepaymentsModal'
const responseKey = 'applyPrepayments'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

export interface ApplyPrepaymentsFormValues {
  amount: string
  invoiceId: string
  manualAllocation: boolean
}

const InvoiceApplyPrepaymentsModal: FC<Props> = memo(
  ({ options: { nodeId } }) => {
    const { t: translate } = useTranslation('invoice')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [setApplyPrepaymentsMutation] = useSetApplyPrepaymentsMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const { data, loading, initialLoading } = useGetInvoiceForPrepaymentQuery({
      fetchPolicy: 'network-only',
      variables: {
        id: encodeId({ id: nodeId, type: 'invoice' })
      }
    })

    const {
      id,
      cleanAmountToPay,
      documentNumber,
      invoiceKind,
      status,
      subjectObject
    } = data?.node || {}

    const { availablePrepaymentBalance } = subjectObject || {}

    const cleanAmount = Number(cleanAmountToPay)
    const availableBalance = Number(availablePrepaymentBalance)
    const warningModalTitle = translate(
      'applyPrepaymentsModal.warningModalTitle'
    )
    const isCompanyDeposit = invoiceKind === InvoiceKind.COMPANY_DEPOSIT
    const isStatusValid = status && PENDING_TO_PAY_STATUSES.includes(status)

    if (!loading && availableBalance <= 0) {
      return (
        <AlertModal
          message={translate(
            'applyPrepaymentsModal.warningNoPrepaymentsAvailable'
          )}
          title={warningModalTitle}
        />
      )
    }

    if (!loading && (isCompanyDeposit || !isStatusValid)) {
      return (
        <AlertModal
          message={translate(
            'applyPrepaymentsModal.warningCannotAllocateMemorandums'
          )}
          title={warningModalTitle}
        />
      )
    }

    const initialValues: ApplyPrepaymentsFormValues = {
      amount: Math.min(availableBalance, cleanAmount).toFixed(2),
      invoiceId: id || '',
      // https://toptal-core.slack.com/archives/C02T5BTG5/p1592837923463200
      manualAllocation: true
    }

    return (
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton title={translate('applyPrepaymentsModal.title')} />
        }
      >
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit({
            handleError: handleOnSubmissionError(responseKey),
            handleSuccess: handleOnSuccess({
              apolloEvent: ApolloContextEvents.invoiceApplyPrepayments,
              successMessage: translate(
                'applyPrepaymentsModal.notification.success',
                {
                  documentNumber
                }
              )
            }),
            responseKey,
            submit: setApplyPrepaymentsMutation,
            validate: validator(availablePrepaymentBalance)
          })}
          render={(formProps: FormRenderProps<ApplyPrepaymentsInput>) => (
            <InvoiceApplyPrepaymentsModalForm
              cleanAmountToPay={cleanAmountToPay}
              formProps={formProps}
              documentNumber={documentNumber}
              availablePrepaymentBalance={availablePrepaymentBalance}
            />
          )}
        />
      </ContentLoader>
    )
  }
)

InvoiceApplyPrepaymentsModal.displayName = displayName

export default InvoiceApplyPrepaymentsModal
