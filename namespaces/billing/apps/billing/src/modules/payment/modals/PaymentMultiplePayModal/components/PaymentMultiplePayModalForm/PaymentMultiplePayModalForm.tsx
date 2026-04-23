import { Form, useFormState } from '@toptal/picasso-forms'
import { Container, Helpbox, Modal, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { required } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import { PaymentListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'

import PaymentSelectableList from '../../../../components/PaymentSelectableList'

const displayName = 'PaymentMultiplePayModalForm'

interface Props {
  payments: PaymentListItemFragment[]
  totalCount?: number
}

const PaymentMultiplePayModalForm: FC<Props> = memo<Props>(
  ({ payments, totalCount }) => {
    const { values } = useFormState()
    const { t: translate } = useTranslation('payment')

    const selectedCount = values?.paymentIds?.length ?? 0
    const totalAmount = payments.reduce((sum, payment) => {
      return (
        sum +
        (values?.paymentIds?.includes(payment.id) ? Number(payment.amount) : 0)
      )
    }, 0)

    return (
      <>
        <Modal.Title data-testid='modal-title'>
          {translate('modals.multiplePayModal.title')}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer />

          <Container>
            <Helpbox variant='yellow'>
              <Helpbox.Content data-testid={`${displayName}-warning`}>
                {translate('modals.multiplePayModal.defaultWarning')}
              </Helpbox.Content>
            </Helpbox>
          </Container>

          <Container top={1}>
            <Typography
              size='medium'
              data-testid='PaymentMultiplePayModalForm-info'
            >
              {translate('modals.multiplePayModal.info', {
                selectedCount,
                totalCount,
                totalAmount
              })}
            </Typography>
          </Container>

          <Container top={1}>
            <Form.Input
              multiline
              multilineResizable
              placeholder={translate(
                'modals.multiplePayModal.fields.comment.placeholder'
              )}
              rowsMin={5}
              label={translate('modals.multiplePayModal.fields.comment.label')}
              name='comment'
              width='full'
              data-testid='pay-multiple-comment'
              required
              validate={required}
            />
          </Container>

          <Container top={1}>
            <PaymentSelectableList payments={payments} selectionEnabled />
          </Container>
        </Modal.Content>

        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('modals.multiplePayModal.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </>
    )
  }
)

PaymentMultiplePayModalForm.displayName = displayName

export default PaymentMultiplePayModalForm
