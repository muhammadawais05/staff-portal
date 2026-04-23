import { Form, useFormState } from '@toptal/picasso-forms'
import { Container, Helpbox, Modal, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { required } from '@staff-portal/billing/src/_lib/form/fieldValidators'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

import { PaymentGroupItemFragment } from '../../../../data'
import PaymentGroupSelectableList from '../../../../components/PaymentGroupSelectableList'

const displayName = 'PaymentGroupMultiplePayModalForm'

interface Props {
  paymentGroups: PaymentGroupItemFragment[]
  totalCount?: number
}

const PaymentGroupMultiplePayModalForm: FC<Props> = memo<Props>(
  ({ paymentGroups, totalCount }) => {
    const { values } = useFormState()
    const { t: translate } = useTranslation('paymentGroupList')

    const selectedCount = values?.paymentGroupIds?.length ?? 0
    const totalAmount = paymentGroups.reduce((sum, paymentGroup) => {
      return (
        sum +
        (values?.paymentGroupIds?.includes(paymentGroup.id)
          ? Number(paymentGroup.amount)
          : 0)
      )
    }, 0)

    return (
      <>
        <Modal.Title data-testid='modal-title'>
          {translate('modals.payPaymentGroups.title')}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer />

          <Container>
            <Helpbox variant='yellow'>
              <Helpbox.Content data-testid={`${displayName}-warning`}>
                {translate('modals.payPaymentGroups.defaultWarning')}
              </Helpbox.Content>
            </Helpbox>
          </Container>

          <Container top={1}>
            <Typography size='medium' data-testid={`${displayName}-info`}>
              {translate('modals.payPaymentGroups.info', {
                selectedCount,
                totalCount,
                totalAmount
              })}
            </Typography>
          </Container>

          <Container top={1}>
            <Form.Input
              autoFocus
              multiline
              multilineResizable
              placeholder={translate(
                'modals.payPaymentGroups.fields.comment.placeholder'
              )}
              rowsMin={5}
              label={translate('modals.payPaymentGroups.fields.comment.label')}
              name='comment'
              width='full'
              data-testid='pay-multiple-comment'
              required
              validate={required}
            />
          </Container>

          <Container top={1}>
            <PaymentGroupSelectableList
              paymentGroups={paymentGroups}
              selectionEnabled
            />
          </Container>
        </Modal.Content>

        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('modals.payPaymentGroups.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </>
    )
  }
)

PaymentGroupMultiplePayModalForm.displayName = displayName

export default PaymentGroupMultiplePayModalForm
