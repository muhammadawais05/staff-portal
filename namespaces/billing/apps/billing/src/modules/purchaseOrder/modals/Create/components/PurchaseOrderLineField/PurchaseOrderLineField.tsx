import React, { FC, memo, SyntheticEvent } from 'react'
import { Button, Container, ReferralBonus16, Minus16 } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { positiveNumber } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import {
  amountCleanNumberValue,
  formatCleanNumberValue,
  percentCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { deleteButton } from './styles'

interface Props {
  name: string
  index: number
  handleOnRemove: (e: SyntheticEvent<HTMLButtonElement>) => void
  showDelete: boolean
  disabled?: boolean
}
const formName = 'purchaseOrderLinesAttributes'

const PurchaseOrderLineField: FC<Props> = memo(
  ({
    name,
    index,
    handleOnRemove,
    showDelete = false,
    disabled = false
  }: Props) => {
    const { t: translate } = useTranslation('purchaseOrder')
    const { modalContainer } = useExternalIntegratorContext()
    const enableDelete = showDelete && !disabled

    return (
      <Container key={name} top='small' data-testid='purchase-order-line-field'>
        <Form.Input
          disabled={disabled}
          key={name}
          data-testid={`purchase-order-line-field-number.${index}`}
          label={translate('createModal.fields.poLinesName.label', {
            index: index + 1
          })}
          name={`${formName}.${index}.number`}
          required
          width='full'
        />
        <Container flex top='small' gap='small'>
          <Container>
            <Form.Input
              autoComplete='off'
              data-testid={`purchase-order-line-field-amount.${index}`}
              format={formatCleanNumberValue}
              formatOnBlur
              icon={<ReferralBonus16 />}
              label={translate('createModal.fields.amount.label')}
              name={`${formName}.${index}.amount`}
              parse={amountCleanNumberValue}
              placeholder='0'
              validate={(value: string | undefined) => {
                if (typeof value === 'string' && value) {
                  return positiveNumber(value)
                }
              }}
              width='shrink'
            />
          </Container>
          <Container>
            <Form.Input
              autoComplete='off'
              data-testid={`purchase-order-line-field-threshold.${index}`}
              format={formatCleanNumberValue}
              formatOnBlur
              icon={<span>%</span>}
              label={translate('createModal.fields.threshold.label')}
              name={`${formName}.${index}.threshold`}
              parse={percentCleanNumberValue}
              placeholder='0.00'
              validate={(value: string | undefined) => {
                if (typeof value === 'string' && value) {
                  return positiveNumber(value)
                }
              }}
              width='shrink'
            />
          </Container>
          <Container>
            <FormDatePickerWrapper
              autoComplete='off'
              data-testid={`purchase-order-line-field-expiryDate.${index}`}
              label={translate('createModal.fields.expiryDate.label')}
              minDate={getCurrentDayAsJSDate()}
              name={`${formName}.${index}.expiryDate`}
              popperContainer={modalContainer}
              width='shrink'
            />
          </Container>
        </Container>
        {enableDelete && (
          <Container top='small' bottom='small'>
            <Button.Action
              data-testid={`delete-button.${index}`}
              value={index}
              css={deleteButton}
              onClick={handleOnRemove}
              icon={<Minus16 />}
            >
              {translate('createModal.form.actions.delete', {
                index: index + 1
              })}
            </Button.Action>
          </Container>
        )}
      </Container>
    )
  }
)

export default PurchaseOrderLineField
