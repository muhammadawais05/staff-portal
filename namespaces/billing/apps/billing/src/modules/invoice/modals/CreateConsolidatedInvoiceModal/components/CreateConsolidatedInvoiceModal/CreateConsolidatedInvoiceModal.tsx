import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo, FC } from 'react'
import { ConsolidateInvoicesInput } from '@staff-portal/graphql/staff'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { ModalSkeleton } from '@staff-portal/ui'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import adjustValues from './adjustValues'
import validator from './validator'
import CreateConsolidatedInvoiceModalForm from '../CreateConsolidatedInvoiceModalForm'
import { useSetConsolidateInvoiceMutation } from '../../data'
import { useInvoicesToConsolidate } from '../../utils'

const displayName = 'CreateConsolidatedInvoiceModal'
const responseKey = 'consolidateInvoices'

interface Props {
  options: ModalData
}

const CreateConsolidatedInvoiceModal: FC<Props> = memo(
  ({ options: { data: filter } }) => {
    const { t: translate } = useTranslation('invoiceList')
    const { handleOnRootLevelError, handleOnSuccess } = useFormSubmission()
    const [consolidateInvoicesMutation] = useSetConsolidateInvoiceMutation({
      onRootLevelError: handleOnRootLevelError
    })

    const {
      initialLoading,
      clientId,
      availableBillingTerms,
      initialValues,
      loading,
      variables,
      clients,
      invoices
    } = useInvoicesToConsolidate(filter)

    return (
      <ContentLoader
        isModalContainer
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <ModalSkeleton
            title={translate('modals.createConsolidatedInvoice.title')}
          />
        }
      >
        <Form<ConsolidateInvoicesInput>
          keepDirtyOnReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit({
            handleError: handleOnSubmissionError(responseKey),
            handleSuccess: handleOnSuccess({
              apolloEvent: ApolloContextEvents.invoiceConsolidatedCreate,
              successMessage: translate(
                'modals.createConsolidatedInvoice.notification.success'
              )
            }),
            responseKey,
            variables,
            adjustValues,
            validate: values => validator({ ...values, ...variables }),
            submit: consolidateInvoicesMutation
          })}
        >
          <CreateConsolidatedInvoiceModalForm
            clients={clients}
            clientId={clientId}
            invoices={invoices}
            availableBillingTerms={availableBillingTerms}
          />
        </Form>
      </ContentLoader>
    )
  }
)

CreateConsolidatedInvoiceModal.displayName = displayName

export default CreateConsolidatedInvoiceModal
