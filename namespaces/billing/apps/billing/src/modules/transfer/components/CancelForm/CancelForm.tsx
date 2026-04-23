import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { CancelTransferInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

interface Props {
  handleOnSubmit: (values: CancelTransferInput) => void
  initialValues: CancelTransferInput
}

const displayName = 'CancelForm'

const CancelForm = ({ initialValues, handleOnSubmit }: Props) => {
  const { t: translate } = useTranslation('transfers')

  return (
    <Form<CancelTransferInput>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title>{translate('cancelForm.title')}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={2}>
          <Typography size='medium'>{translate('cancelForm.intro')}</Typography>
        </Container>
        <Form.Input
          autoFocus
          data-testid={`${displayName}-comment`}
          label={translate('cancelForm.fields.comment.label')}
          multiline
          name='comment'
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('cancelForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

CancelForm.displayName = displayName

export default memo(CancelForm)
