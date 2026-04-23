import { PromptModal } from '@staff-portal/modals-service'
import { Container, Typography, Alert } from '@toptal/picasso'
import React, { useCallback } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { InviteToLoginCompanyRepresentativeFragment } from '../../data'
import { InviteToLoginCompanyRepresentativeDocument } from './data'

export interface Props {
  contact: InviteToLoginCompanyRepresentativeFragment
  hideModal: () => void
}

const InviteToLoginModal = ({
  contact: { id, fullName, invitedToLoginAt, client },
  hideModal
}: Props) => {
  const user = useGetCurrentUser()

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: InviteToLoginCompanyRepresentativeDocument,
      mutationResultOptions: {
        onSuccessAction: hideModal,
        successNotificationMessage: `You've successfully invited ${fullName} to Login.`
      }
    })

  const handleSubmit = useCallback(
    () => handleMutationSubmit({ companyRepresentativeId: id }),
    [id, handleMutationSubmit]
  )

  return (
    <PromptModal
      open
      onClose={hideModal}
      onSubmit={handleSubmit}
      title={`Invite ${fullName} to Login`}
      submitText='Invite'
      loading={loading}
      operationVariables={{
        nodeId: id,
        nodeType: NodeType.COMPANY_REPRESENTATIVE,
        operationName: 'inviteToLoginCompanyRepresentative'
      }}
      message={
        <>
          <Typography size='medium'>
            {fullName} will get an email with the link to set their password.
          </Typography>
          <Typography size='medium'>
            Are you sure you want to send it?
          </Typography>

          {invitedToLoginAt && (
            <Container top='small' data-testid='invite-to-login-modal-warning'>
              <Typography size='medium'>
                <Typography as='span' weight='semibold' color='red'>
                  Warning:{' '}
                </Typography>
                Invitation to {fullName} has already been sent on{' '}
                {parseAndFormatDate(invitedToLoginAt, {
                  timeZone: user?.timeZone?.value
                })}
                .
              </Typography>
            </Container>
          )}
          {!client?.portalPermissionsEnabled && (
            <Container top='large' data-testid='invite-to-login-modal-alert'>
              <Alert>
                Warning: inviting this contact to login will also enable Client
                Portal access with Default permissions.
              </Alert>
            </Container>
          )}
        </>
      }
    />
  )
}

export default InviteToLoginModal
