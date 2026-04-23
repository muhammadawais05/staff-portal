import React from 'react'
import {
  Button,
  Container,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { titleize } from '@staff-portal/string'
import { Form, SubmissionErrors } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { FormErrors } from '@staff-portal/mutation-result-handlers'
import {
  OfacStatus,
  UpdateClientOfacStatusInput,
  UpdateRoleOfacStatusInput
} from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

import { useGetAssociatedRolesText } from '../../services'
import { AssociatedRole } from '../../../../types'
import { getOfacStatusOptions } from './utils'

export type ChangeOfacStatusFormValue = Pick<
  UpdateRoleOfacStatusInput & UpdateClientOfacStatusInput,
  'roleId' | 'clientId' | 'ofacStatus' | 'comment'
>

interface Props {
  handleSubmit: (
    input: ChangeOfacStatusFormValue
  ) => Promise<void | SubmissionErrors | FormErrors>
  initialValues: Partial<ChangeOfacStatusFormValue>
  fullName: string
  currentStatus: OfacStatus
  associatedRoles: Maybe<AssociatedRole[]>
  nodeType: string
  roleOrClientStatus: Maybe<string>
  submitting: boolean
  hideModal: () => void
}

const ChangeOFACStatusModalContent = ({
  handleSubmit,
  initialValues,
  fullName,
  currentStatus,
  associatedRoles,
  nodeType,
  roleOrClientStatus,
  submitting,
  hideModal
}: Props) => {
  const associatedRolesText = useGetAssociatedRolesText(associatedRoles)

  return (
    <ModalForm<ChangeOfacStatusFormValue>
      onSubmit={handleSubmit}
      title='Change OFAC status'
      initialValues={initialValues}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <TypographyOverflow
            lines={10}
            size='medium'
            data-testid='current-ofac-status'
          >
            The current OFAC status of {fullName} is:{' '}
            <Typography weight='semibold' as='span'>
              {titleize(currentStatus)}
            </Typography>
            . Are you sure you want to change it?
          </TypographyOverflow>
        </Container>

        {associatedRoles && associatedRoles.length > 0 && (
          <Container bottom='medium'>
            <Typography size='medium' data-testid='affected-roles'>
              The following roles of {fullName} will be affected:{' '}
              {associatedRolesText},{' '}
              {titleize(nodeType, { splitter: /([A-Z][a-z]*)/g })}
              {roleOrClientStatus ? ` - ${roleOrClientStatus}` : ''}.
            </Typography>
          </Container>
        )}

        <Form.Select
          label='New OFAC status'
          name='ofacStatus'
          required
          width='full'
          options={getOfacStatusOptions(currentStatus)}
          data-testid='ofac-status-select'
        />
        <Form.Input
          label='Comment'
          name='comment'
          placeholder='Please leave a comment'
          required
          multiline
          rows={4}
          width='full'
          data-testid='ofac-status-comment'
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={submitting} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='negative'
          data-testid='change-ofac-status-submit-button'
        >
          Change OFAC status
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ChangeOFACStatusModalContent
