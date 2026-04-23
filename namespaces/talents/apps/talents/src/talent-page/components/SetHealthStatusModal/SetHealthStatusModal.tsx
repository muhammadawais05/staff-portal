import { Modal } from '@staff-portal/modals-service'
import { Button, Container, SelectOption, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { TalentHealthStatusValue } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import { TALENT_UPDATED, HEALTH_STATUS_MAPPING } from '@staff-portal/talents'

import { useSetHealthStatusTalent } from './data'

const HEALTH_STATUS_OPTIONS: SelectOption[] = Object.keys(
  HEALTH_STATUS_MAPPING
).map(slug => ({
  value: slug,
  text: HEALTH_STATUS_MAPPING[slug as TalentHealthStatusValue].text
}))

interface SetHealthStatusForm {
  healthStatus: TalentHealthStatusValue
  comment: string
}

export interface Props {
  talentId: string
  hideModal: () => void
}

const SetHealthStatusModal = ({ talentId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitEvent = useMessageEmitter()
  const [setHealthStatus, { loading }] = useSetHealthStatusTalent({
    talentId,
    onError: () => showError('An error occurred, health status was not set.')
  })

  const handleSubmit = async ({
    comment,
    healthStatus
  }: SetHealthStatusForm) => {
    const { data } = await setHealthStatus({
      variables: {
        input: {
          talentId,
          comment,
          healthStatus
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.setHealthStatusTalent,
      successNotificationMessage: 'The health status was set.',
      onSuccessAction: () => {
        emitEvent(TALENT_UPDATED, { talentId })
        hideModal()
      }
    })
  }

  return (
    <Modal withForm onClose={hideModal} open size='small'>
      <Modal.Title>Health Status</Modal.Title>

      <Form<SetHealthStatusForm> onSubmit={handleSubmit}>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>Set talent health status</Typography>
          </Container>
          <Form.Select
            label='Health Status'
            placeholder='Select health status'
            required
            width='full'
            name='healthStatus'
            options={HEALTH_STATUS_OPTIONS}
            data-testid='set-health-status-modal-select'
          />

          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            name='comment'
            label='Comment'
            placeholder='Please specify a reason'
            validate={isMaxLength}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            Set Health Status
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default SetHealthStatusModal
