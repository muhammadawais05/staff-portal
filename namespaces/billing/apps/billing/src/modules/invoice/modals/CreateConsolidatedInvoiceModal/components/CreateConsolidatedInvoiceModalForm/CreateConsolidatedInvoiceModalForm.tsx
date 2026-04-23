import {
  Container,
  Form as PicassoForm,
  Modal,
  Typography,
  Helpbox
} from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState } from 'react'
import { Form, useFormState } from '@toptal/picasso-forms'
import { required } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { TaskStatuses } from '@staff-portal/billing/src/@types/types'
import ClientMultiSelector, {
  ClientOption
} from '@staff-portal/billing-widgets/src/modules/consolidationDefaults/modals/ConsolidationDefault/components/ClientMultiSelector/ClientMultiSelector'

import InvoiceList from '../../../../components/InvoiceList'
import {
  GetInvoicesToConsolidateQuery,
  ConsolidatableInvoiceItemFragment
} from '../../../../components/InvoiceList/data/getInvoicesToConsolidate.graphql.types'
import ConsolidatedInvoiceBillToSelector from '../ConsolidatedInvoiceBillToSelector/ConsolidatedInvoiceBillToSelector'

const displayName = 'CreateConsolidatedInvoiceModalForm'

interface Props {
  availableBillingTerms?: Exclude<
    GetInvoicesToConsolidateQuery['availableBillingTerms'],
    undefined
  >
  invoices: ConsolidatableInvoiceItemFragment[]
  clientId?: string
  clients?: ClientOption[]
}

export const buildNetTermsOptions = (terms: number[]) =>
  terms.map(term => ({
    value: term,
    text: i18n.t(
      `invoiceList:modals.createConsolidatedInvoice.fields.netTerms.${
        term === 0 ? 'default' : 'term'
      }`,
      { term }
    )
  }))

const baseKey = 'modals.createConsolidatedInvoice.fields'

const CreateConsolidatedInvoiceModalForm: FC<Props> = memo<Props>(
  ({
    availableBillingTerms,
    clientId = '',
    clients = [],
    invoices: defaultInvoices
  }) => {
    const { t: translate } = useTranslation('invoiceList')
    const { modalContainer } = useExternalIntegratorContext()
    const [selectedClientIds, setSelectedClientIds] = useState([clientId])
    const handleOnClientSelect = (values: string[]) =>
      setSelectedClientIds(values)
    const { values } = useFormState()
    const invoices = clients.length
      ? defaultInvoices.filter(
          invoice =>
            selectedClientIds.includes(invoice.subjectObject.id) ||
            values?.invoiceIds?.includes(invoice.id)
        )
      : defaultInvoices

    const OPTIONS = buildNetTermsOptions(
      availableBillingTerms?.availableNetTerms || []
    )
    const pendingIssueMemoTaskInvoices = invoices.filter(invoice => {
      const tasks = invoice.relatedTasks?.nodes || []

      return tasks.some(
        (task: { status: string }) => task.status === TaskStatuses.pending
      )
    })

    const memoInvoicesPresent = pendingIssueMemoTaskInvoices.length > 0

    return (
      <>
        <Modal.Title data-testid='modal-title'>
          {translate('modals.createConsolidatedInvoice.title')}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer />
          <Container bottom={1}>
            {memoInvoicesPresent ? (
              <Helpbox variant='yellow'>
                <Helpbox.Content
                  data-testid={`${displayName}-pending-memo-warning`}
                >
                  {translate('modals.createConsolidatedInvoice.warning')}
                </Helpbox.Content>
              </Helpbox>
            ) : (
              <Typography size='medium' data-testid={`${displayName}-subtitle`}>
                {translate('modals.createConsolidatedInvoice.subtitle')}
              </Typography>
            )}
          </Container>
          <Form.Select
            enableReset
            validate={required}
            options={OPTIONS}
            popperContainer={modalContainer}
            label={translate(`${baseKey}.netTerms.label`)}
            required
            name='netTerms'
            data-testid={`${displayName}-net-terms`}
          />
          {clients.length !== 0 && (
            <>
              <PicassoForm.Field>
                <PicassoForm.Label>
                  {translate(`${baseKey}.relatedCompanies.label`)}
                </PicassoForm.Label>
                <ClientMultiSelector
                  clients={clients}
                  initialValues={[clientId]}
                  placeholder={translate(
                    `${baseKey}.relatedCompanies.placeholder`
                  )}
                  selectAllLabel={translate(
                    `${baseKey}.relatedCompanies.selectAllCompanies`
                  )}
                  popperContainer={modalContainer}
                  onValuesChange={handleOnClientSelect}
                />
              </PicassoForm.Field>
              <ConsolidatedInvoiceBillToSelector
                clients={clients}
                popperContainer={modalContainer}
              />
            </>
          )}
          <Form.Checkbox
            label={translate(`${baseKey}.notification`)}
            name='sendNotifications'
            data-testid={`${displayName}-notification`}
          />
          <Container top='small'>
            <InvoiceList
              invoices={
                memoInvoicesPresent ? pendingIssueMemoTaskInvoices : invoices
              }
              selectionEnabled={!memoInvoicesPresent}
            />
          </Container>
        </Modal.Content>

        <ModalFooter>
          <Form.SubmitButton
            data-testid='submit'
            variant='positive'
            disabled={memoInvoicesPresent}
          >
            {translate('modals.createConsolidatedInvoice.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </>
    )
  }
)

CreateConsolidatedInvoiceModalForm.displayName = displayName

export default CreateConsolidatedInvoiceModalForm
