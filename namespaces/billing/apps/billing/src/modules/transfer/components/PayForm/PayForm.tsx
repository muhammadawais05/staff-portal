import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { PayTransferInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import {
  composeValidators,
  dateAfter,
  dateBefore,
  positiveNumber,
  required
} from '@staff-portal/billing/src/_lib/form/fieldValidators'
import { getCurrentTime, parse } from '@staff-portal/billing/src/_lib/dateTime'
import {
  amountCleanNumberValue,
  formatCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'

import { GetTransferQuery } from '../../data/getTransfer.graphql.types'

type InputValues = Omit<PayTransferInput, 'effectiveDate'> & {
  effectiveDate: Date
}

interface Props {
  handleOnSubmit: (values: InputValues) => void
  initialValues: InputValues
  transfer: Exclude<
    Exclude<GetTransferQuery, null | undefined>['node'],
    null | undefined
  >
}

const displayName = 'PayForm'

const PayForm = ({
  initialValues,
  handleOnSubmit,
  transfer: { createdAt }
}: Props) => {
  const { t: translate } = useTranslation('transfers')
  const { modalContainer } = useExternalIntegratorContext()
  const tomorrow = getCurrentTime().plus({ days: 1 }).startOf('day')
  const dayBeforeTransferCreated = parse(createdAt)
    .startOf('day')
    .minus({ days: 1 })
  const datePickerValidate = composeValidators(
    dateAfter({
      boundaryDate: dayBeforeTransferCreated,
      errorMessage: translate(
        'payForm.fields.effectiveDate.errorBeforeTransferCreated'
      )
    }),
    dateBefore({
      boundaryDate: tomorrow,
      errorMessage: translate('payForm.fields.effectiveDate.errorInTheFuture')
    }),
    required
  )

  return (
    <Form<InputValues>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('payForm.title')}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={2}>
          <Typography size='medium' data-testid={`${displayName}-intro`}>
            {translate('payForm.intro')}
          </Typography>
        </Container>
        <Form.Input
          autoComplete='off'
          autoFocus
          data-testid='amount'
          format={formatCleanNumberValue}
          formatOnBlur
          icon={<ReferralBonus16 />}
          label={translate('payForm.fields.amount.label')}
          name='amount'
          parse={amountCleanNumberValue}
          placeholder='0.0'
          required
          validate={composeValidators(required, positiveNumber)}
          width='full'
        />
        <Form.DatePicker
          {...useDatepickerTimezoneProps()}
          data-testid='effectiveDate'
          label={translate('payForm.fields.effectiveDate.label')}
          name='effectiveDate'
          popperContainer={modalContainer}
          required
          validate={datePickerValidate}
          width='full'
        />
        <Form.Input
          data-testid='comment'
          label={translate('payForm.fields.comment.label')}
          multiline
          name='comment'
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('payForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

PayForm.displayName = displayName

export default memo(PayForm)
