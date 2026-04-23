import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { FailTransferInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

interface Props {
  handleOnSubmit: (values: FailTransferInput) => void
  initialValues?: FailTransferInput
}

const displayName = 'MarkFailedForm'

const MarkFailedForm = ({ initialValues, handleOnSubmit }: Props) => {
  const { t: translate } = useTranslation('transfers')

  return (
    <Form<FailTransferInput>
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title>{translate('markFailedForm.title')}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={2}>
          <Typography size='medium'>
            {translate('markFailedForm.intro')}
          </Typography>
        </Container>
        <Form.Input
          autoFocus
          data-testid='comment'
          label={translate('markFailedForm.fields.comment.label')}
          multiline
          name='comment'
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('markFailedForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

MarkFailedForm.displayName = displayName

export default memo(MarkFailedForm)
