import { Modal } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  TaskPriorityLevel,
  RepauseClientInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import {
  TaskTagEdgeFragment,
  FormTaskTagSelector,
  TASK_PRIORITY_OPTIONS
} from '@staff-portal/tasks'

import { CLIENT_UPDATED } from '../../messages'
import { useRepauseClient } from './data'

type RepauseCompanyForm = Omit<RepauseClientInput, 'clientId' | 'tagsId'> & {
  tags?: TaskTagEdgeFragment[]
}

export interface Props {
  companyId: string
  hideModal: () => void
  onClose?: () => void
  onRepauseCompany?: () => void
}

const RepauseCompanyModal = ({
  companyId,
  hideModal,
  onClose,
  onRepauseCompany
}: Props) => {
  const minDate = useMemo(() => new Date(), [])

  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [repauseClient, { loading }] = useRepauseClient({
    onError: () =>
      showError('An error occurred, the company has not been repaused.')
  })

  const handleSubmit = async ({ tags, ...rest }: RepauseCompanyForm) => {
    const { data } = await repauseClient({
      variables: {
        input: {
          clientId: companyId,
          tagIds: tags?.map(({ node }) => node?.id ?? '').filter(Boolean),
          ...rest
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.repauseClient,
      successNotificationMessage: 'Company has been repaused.',
      onSuccessAction: () => {
        hideModal()
        onRepauseCompany?.()
        emitMessage(CLIENT_UPDATED, { companyId })
      }
    })
  }

  const handleClose = () => {
    hideModal()
    onClose?.()
  }

  return (
    <Modal
      withForm
      onClose={handleClose}
      open
      size='small'
      data-testid='RepauseCompanyModal'
    >
      <Modal.Title>Repause Company</Modal.Title>

      <Form<RepauseCompanyForm> onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Do you really want to repause this company?
            </Typography>
          </Container>

          <Form.Input
            label='Custom task description'
            placeholder='Leave empty to set default description'
            width='full'
            name='description'
            autoFocus
          />

          <FormDatePickerWrapper
            name='dueDate'
            label='Due date'
            width='full'
            minDate={minDate}
            required
            data-testid='RepauseCompanyModal-due-date'
          />

          <Form.Select
            name='priority'
            label='Priority'
            options={TASK_PRIORITY_OPTIONS}
            width='full'
            initialValue={TaskPriorityLevel.MEDIUM}
          />

          <FormTaskTagSelector name='tags' label='Tags' width='full' />

          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Details'
            validate={isMaxLength}
            data-testid='RepauseCompanyModal-details'
          />
        </Modal.Content>

        <Modal.Actions>
          <Button
            variant='secondary'
            disabled={loading}
            onClick={handleClose}
            data-testid='RepauseCompanyModal-cancel-button'
          >
            Cancel
          </Button>
          <Form.SubmitButton
            variant='negative'
            data-testid='RepauseCompanyModal-submit-button'
          >
            Repause Company
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default RepauseCompanyModal
