import { Modal, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { CancelPaymentGroupInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

interface Props {
  paymentGroupNumber: string
  handleOnSubmit: (values: CancelPaymentGroupInput) => void
  initialValues: CancelPaymentGroupInput
}

const displayName = 'CancelPaymentGroupForm'

const CancelPaymentGroupForm = ({
  paymentGroupNumber,
  initialValues,
  handleOnSubmit
}: Props) => {
  const { t: translate } = useTranslation('paymentGroup')
  const baseString = 'modals.cancelPaymentGroup.form'
  const title = translate(`${baseString}.title` as const, {
    number: paymentGroupNumber
  })

  return (
    <Form<CancelPaymentGroupInput>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom='medium'>
          <Typography size='medium' data-testid={`${displayName}-intro`}>
            {translate(`${baseString}.intro` as const)}
          </Typography>
        </Container>
        <Form.Input
          autoFocus
          data-testid={`${displayName}-comment`}
          multiline
          label={translate(`${baseString}.fields.comment.label` as const)}
          name='comment'
          placeholder={translate(
            `${baseString}.fields.comment.placeholder` as const
          )}
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate(`${baseString}.actions.submit` as const)}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

CancelPaymentGroupForm.displayName = displayName

export default memo(CancelPaymentGroupForm)
