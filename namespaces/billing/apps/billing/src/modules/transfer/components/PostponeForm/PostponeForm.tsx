import { Container, Modal, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { PostponeTransferInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'

interface Props {
  handleOnSubmit: (
    values: Omit<PostponeTransferInput, 'pendingReceiptOn'> & {
      pendingReceiptOn: Date
    }
  ) => void
  initialValues: Omit<PostponeTransferInput, 'pendingReceiptOn'> & {
    pendingReceiptOn: Date
  }
}

const displayName = 'PostponeForm'
const True = () => true

const PostponeForm = ({ initialValues, handleOnSubmit }: Props) => {
  const { t: translate } = useTranslation('transfers')
  const { modalContainer } = useExternalIntegratorContext()
  const minDate = getCurrentDayAsJSDate()

  return (
    <Form<
      Omit<PostponeTransferInput, 'pendingReceiptOn'> & {
        pendingReceiptOn: Date
      }
    >
      data-testid={displayName}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
      initialValuesEqual={True}
    >
      <Modal.Title>{translate('postponeForm.title')}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Container bottom={2}>
          <Typography size='medium'>
            {translate('postponeForm.intro')}
          </Typography>
        </Container>
        <Form.DatePicker
          {...useDatepickerTimezoneProps()}
          autoFocus
          data-testid='pendingReceiptOn'
          label={translate('postponeForm.fields.date.label')}
          minDate={minDate}
          name='pendingReceiptOn'
          popperContainer={modalContainer}
          required
          width='full'
        />
        <Form.Input
          data-testid='comment'
          label={translate('postponeForm.fields.comment.label')}
          multiline
          name='comment'
          required
          rowsMin={4}
          width='full'
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('postponeForm.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

PostponeForm.displayName = displayName

export default memo(PostponeForm)
