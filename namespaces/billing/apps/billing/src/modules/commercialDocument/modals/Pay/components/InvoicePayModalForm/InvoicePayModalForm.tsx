import {
  AnyObject,
  FinalField,
  FormRenderProps,
  OnChange
} from '@toptal/picasso-forms'
import { Button, Form, Modal, Typography } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useRef } from 'react'
import * as fieldValidators from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  BillingMethodsOptions,
  InvoicePayModalFormValues,
  paymentOptionIsDiscountable
} from '@staff-portal/billing/src/_lib/helpers/billing'
import {
  onBlurToFloatNumber,
  onChangeToFloatNumber
} from '@staff-portal/billing/src/_lib/form/handlers'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import FormInput from '@staff-portal/billing/src/components/FormInput'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import * as Smc from '@staff-portal/billing/src/components/ModalContainer/styles'

import InvoicePayModalFormSource from '../InvoicePayModalFormSource/InvoicePayModalFormSource'
import BillingNotes from '../../../../components/BillingNotes'
import { GetPayModalInvoiceQuery } from '../../data'
import { Clients, validateUnappliedCash } from '../../utils'

const displayName = 'InvoicePayModalForm'

interface Props {
  availablePaymentSources: BillingMethodsOptions
  formRenderProps: FormRenderProps<InvoicePayModalFormValues>
  invoice: Exclude<GetPayModalInvoiceQuery['node'], null | undefined>
}

const InvoicePayModalForm: FC<Props> = memo(
  ({
    availablePaymentSources,
    formRenderProps: { handleSubmit, form },
    invoice
  }) => {
    const { t: translate } = useTranslation('invoice')
    const { getState } = form
    const { submitting, values } = getState()
    const amountChangedByUser = useRef(false)
    const { amount, discountedAmount, undiscountedAmount } = values
    const { discountApplied, documentNumber, issueDate, subjectObject } =
      invoice
    const {
      billingNotes,
      id,
      webResource: clientWebResource,
      hierarchy
    } = subjectObject
    const clientLink = clientWebResource && clientWebResource.url
    const clientLinkText = clientWebResource.text

    const updateAmount = () => {
      const discountable =
        discountApplied && paymentOptionIsDiscountable(values)
      const updatedAmount = discountable ? discountedAmount : undiscountedAmount
      const amountCompareKey = discountable
        ? 'discountedAmount'
        : 'undiscountedAmount'

      form.change('amountCompareKey', amountCompareKey)

      if (!amountChangedByUser.current && updatedAmount !== amount) {
        form.change('amount', updatedAmount)
      }
    }

    return (
      <Form
        data-testid={displayName}
        onSubmit={handleSubmit}
        css={Smc.modalContainer}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('payModal.title', { documentNumber })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.Field>
            <Form.Label>
              {translate('payModal.fields.invoice.label')}
            </Form.Label>
            {clientLink ? (
              <Link href={clientLink}>{clientLinkText}</Link>
            ) : (
              <Typography>{clientLinkText}</Typography>
            )}
          </Form.Field>
          {discountApplied && (
            <Form.Field data-testid={`${displayName}-amountToPay`}>
              <Form.Label>{translate('payModal.amountToPay.label')}</Form.Label>
              <Typography
                size='medium'
                data-testid={`${displayName}-amountToPay-discounted`}
              >
                {translate('payModal.amountToPay.discounted', {
                  amount: discountedAmount
                })}
              </Typography>
              <Typography
                size='medium'
                data-testid={`${displayName}-amountToPay-undiscounted`}
              >
                {translate('payModal.amountToPay.undiscounted', {
                  amount: undiscountedAmount
                })}
              </Typography>
            </Form.Field>
          )}
          <Form.Field>
            <FinalField
              component={FormInput}
              handleOnBlur={onBlurToFloatNumber}
              handleOnChange={onChangeToFloatNumber}
              inputProps={{
                autoFocus: true,
                icon: <span>$</span>,
                onInput: () => {
                  if (!amountChangedByUser.current) {
                    amountChangedByUser.current = true
                  }
                },
                placeholder: '0.00'
              }}
              label={translate('payModal.fields.amount.label')}
              name='amount'
              required
              testId={`${displayName}-amount`}
              validate={fieldValidators.composeValidators(
                fieldValidators.required,
                fieldValidators.positiveNumber,
                (value: string, allValues: AnyObject) =>
                  fieldValidators.lessThanOrEqualValue({
                    valueKey: allValues.amountCompareKey,
                    valueLabel: translate('payModal.outstandingAmount')
                  })(value, allValues),
                validateUnappliedCash
              )}
            />
          </Form.Field>
          <InvoicePayModalFormSource
            availableSources={availablePaymentSources}
            values={values}
            clients={hierarchy?.clients?.nodes as Clients}
            invoiceIssueDate={issueDate}
            clientId={id}
          />

          <Form.Field>
            <FinalField
              component={FormInput}
              inputProps={{
                multiline: true,
                rowsMin: 4,
                width: 'full'
              }}
              label={translate('payModal.fields.comment.label')}
              name='comment'
              required
              testId={`${displayName}-comment`}
              validate={value =>
                value
                  ? undefined
                  : translate('payModal.fields.comment.validationError')
              }
            />
          </Form.Field>
          <BillingNotes billingNotes={billingNotes} />
        </Modal.Content>
        <ModalFooter>
          <Button
            data-testid={`${displayName}-submit`}
            disabled={submitting}
            loading={submitting}
            type='submit'
            variant='positive'
          >
            {translate('payModal.actions.submit')}
          </Button>
        </ModalFooter>

        <OnChange name='paymentSource'>
          {() => {
            updateAmount()
            form.change('paymentMethod', '')
            form.change('pendingReceiptPaymentMethod', '')
            form.change('billingOptionId', '')
          }}
        </OnChange>
        <OnChange name='paymentMethod'>{updateAmount}</OnChange>
        <OnChange name='pendingReceiptPaymentMethod'>{updateAmount}</OnChange>
      </Form>
    )
  }
)

InvoicePayModalForm.displayName = displayName

export default InvoicePayModalForm
