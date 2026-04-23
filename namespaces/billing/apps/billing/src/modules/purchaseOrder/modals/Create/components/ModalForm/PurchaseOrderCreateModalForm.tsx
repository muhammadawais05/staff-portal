import React, { FC, memo, useMemo } from 'react'
import { Modal } from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { useTranslation } from 'react-i18next'
import { CreatePurchaseOrderInput } from '@staff-portal/graphql/staff'
import { positiveNumber } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  amountCleanNumberValue,
  convertToInteger,
  formatCleanNumberValue,
  percentCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import CompanyAutocomplete from '../CompanyAutocomplete'
import PurchaseOrderLinesFormContent from '../PurchaseOrderLinesFormContent'

const displayName = 'PurchaseOrderCreateModalForm'

interface Props {
  handleOnSubmit: (values: CreatePurchaseOrderInput) => void
  poLinesEnabled: boolean
}

const PurchaseOrderCreateModalForm: FC<Props> = memo<Props>(
  ({ handleOnSubmit, poLinesEnabled = false }: Props) => {
    const { t: translate } = useTranslation('purchaseOrder')
    const { modalContainer } = useExternalIntegratorContext()
    const poLinesFormProps = useMemo(
      () =>
        poLinesEnabled
          ? {
              mutators: { ...arrayMutators },
              initialValues: {
                number: '',
                purchaseOrderLinesAttributes: [{ number: '' }]
              }
            }
          : undefined,
      [poLinesEnabled]
    )

    return (
      <Form<CreatePurchaseOrderInput>
        {...poLinesFormProps}
        data-testid={displayName}
        onSubmit={handleOnSubmit}
      >
        <Modal.Title data-testid='purchaseOrderModal-title'>
          {translate('createModal.title')}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer />
          <CompanyAutocomplete required autoFocus />
          <Form.Input
            data-testid={`${displayName}-number`}
            label={translate('createModal.fields.number.label')}
            name='number'
            required
            width='full'
          />
          {poLinesEnabled ? (
            <PurchaseOrderLinesFormContent />
          ) : (
            <>
              <Form.Input
                autoComplete='off'
                data-testid={`${displayName}-amount`}
                format={convertToInteger}
                formatOnBlur
                icon={<ReferralBonus16 />}
                label={translate('createModal.fields.amount.label')}
                name='amount'
                parse={amountCleanNumberValue}
                placeholder='0'
                validate={(value: string | undefined) => {
                  if (typeof value === 'string' && value) {
                    return positiveNumber(value)
                  }
                }}
                width='full'
              />
              <Form.Input
                autoComplete='off'
                data-testid={`${displayName}-threshold`}
                format={formatCleanNumberValue}
                formatOnBlur
                icon={<span>%</span>}
                label={translate('createModal.fields.threshold.label')}
                name='threshold'
                parse={percentCleanNumberValue}
                placeholder='0.00'
                validate={(value: string | undefined) => {
                  if (typeof value === 'string' && value) {
                    return positiveNumber(value)
                  }
                }}
                width='full'
              />
              <Form.DatePicker
                // eslint-disable-next-line
                {...useDatepickerTimezoneProps()}
                autoComplete='off'
                data-testid={`${displayName}-expiryDate`}
                label={translate('createModal.fields.expiryDate.label')}
                minDate={getCurrentDayAsJSDate()}
                name='expiryDate'
                popperContainer={modalContainer}
                width='full'
              />
            </>
          )}
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('createModal.form.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

PurchaseOrderCreateModalForm.displayName = displayName

export default PurchaseOrderCreateModalForm
