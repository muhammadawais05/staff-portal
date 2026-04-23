import { Form } from '@toptal/picasso-forms'
import { Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ConvertPaymentIntoCreditMemorandumInput } from '@staff-portal/graphql/staff'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

const displayName = 'PaymentConvertToCreditMemoModalForm'

type InputValues = Omit<ConvertPaymentIntoCreditMemorandumInput, 'paymentId'>

interface Props {
  paymentId: string
  handleOnSubmit: (values: InputValues) => void
  initialValues: InputValues
}

const PaymentConvertToCreditMemoModalForm: FC<Props> = memo<Props>(
  ({ paymentId, handleOnSubmit, initialValues }) => {
    const { t: translate } = useTranslation('payment')

    return (
      <Form<InputValues>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
      >
        <Modal.Title data-testid={`${displayName}-modal-title`}>
          {translate('modals.convertToCreditMemo.title', {
            paymentId: decodeId({ id: paymentId, type: 'payment' })
          })}
        </Modal.Title>

        <Modal.Content>
          <Form.Input
            multiline
            multilineResizable
            placeholder={translate(
              'modals.convertToCreditMemo.fields.comment.placeholder'
            )}
            rowsMin={5}
            label={translate('modals.convertToCreditMemo.fields.comment.label')}
            name='comment'
            data-testid='convert-to-credit-comment'
            width='full'
            required
          />
        </Modal.Content>

        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('modals.convertToCreditMemo.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

PaymentConvertToCreditMemoModalForm.displayName = displayName

export default PaymentConvertToCreditMemoModalForm
