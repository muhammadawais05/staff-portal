import React, { useMemo } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'

type Props = {
  hideModal: () => void
  loading?: boolean
}

const PostponeExpirationForm = ({ hideModal, loading }: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  return (
    <>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Interview will be restored to its original state and will not expire
            at least until the date specified.
          </Typography>
        </Container>

        <FormDatePickerWrapper
          name='expirationDate'
          label='Expiration date'
          width='full'
          minDate={minDate}
          autoFocus
          required
          // TODO: restore it back as part of https://toptal-core.atlassian.net/browse/SPT-2335
          // useServerTimezone
          data-testid='postpone-expiration-form-expiration-date'
        />

        <Form.Input
          name='comment'
          label='Comment'
          placeholder='Please specify a reason.'
          width='full'
          validate={isMaxLength}
          rows={4}
          required
          multiline
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='postpone-expiration-form-submit-button'
        >
          Postpone Expiration
        </Form.SubmitButton>
      </Modal.Actions>
    </>
  )
}

export default PostponeExpirationForm
