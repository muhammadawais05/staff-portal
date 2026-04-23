import { Amount, Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { RollbackInvoiceTransferInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

interface Props {
  handleOnSubmit: (values: RollbackInvoiceTransferInput) => void
  initialValues: RollbackInvoiceTransferInput
  amount: string
}

const displayName = 'RollbackForm'

const RollbackForm = ({ initialValues, handleOnSubmit, amount }: Props) => {
  const { t: translate } = useTranslation(['transfers', 'common'])
  const [pre, post] = translate('transfers:rollbackForm.intro').split('{0}')

  return (
    <Form<RollbackInvoiceTransferInput>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title>{translate('transfers:rollbackForm.title')}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={2}>
          <Typography size='medium'>
            {pre} <Amount amount={amount} />
            {post}
          </Typography>
        </Container>
        <Form.Input
          autoFocus
          data-testid={`${displayName}-comment`}
          label={translate('transfers:rollbackForm.fields.comment.label')}
          multiline
          name='comment'
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter cancelButtonText={translate('common:actions.cancel')}>
        <Form.SubmitButton data-testid='submit' variant='negative'>
          {translate('transfers:rollbackForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

RollbackForm.displayName = displayName

export default memo(RollbackForm)
