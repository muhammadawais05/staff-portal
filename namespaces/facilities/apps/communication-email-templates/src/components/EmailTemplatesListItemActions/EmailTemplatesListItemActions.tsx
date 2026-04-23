import React, { useCallback } from 'react'
import {
  Button,
  Container,
  Copy16,
  Pencil16,
  Trash16,
  Tooltip,
  Eye16
} from '@toptal/picasso'
import { isOperationHidden, Operation } from '@staff-portal/operations'
import { WrapWithTooltip } from '@staff-portal/ui'
import { useModal } from '@staff-portal/modals-service'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useNavigate } from '@staff-portal/navigation'
import {
  getEmailTemplateCreatePath,
  getEmailTemplateEditPath,
  getEmailTemplatePath
} from '@staff-portal/routes'

import DestroyEmailTemplateModal from '../DestroyEmailTemplateModal'
import { EmailTemplatesListFragment } from '../../data/use-get-email-templates-list/get-email-templates-list.staff.gql.types'

interface Props {
  emailTemplate: EmailTemplatesListFragment
}

const EmailTemplatesListItemActions = ({ emailTemplate }: Props) => {
  const {
    id,
    name,
    operations: { destroyEmailTemplate, copyEmailTemplate, updateEmailTemplate }
  } = emailTemplate

  const decodedId = decodeEntityId(id).id
  const navigate = useNavigate()

  const { showModal: showDestroyEmailTemplateModal } = useModal(
    DestroyEmailTemplateModal,
    { emailTemplateId: id, emailTemplateTitle: name }
  )

  const handleCopyClick = useCallback(
    () => navigate(getEmailTemplateCreatePath(decodedId)),
    [decodedId]
  )

  const handleShowClick = useCallback(
    () => navigate(getEmailTemplatePath(decodedId)),
    [decodedId]
  )

  const handleEditClick = useCallback(
    () => navigate(getEmailTemplateEditPath(decodedId)),
    [decodedId]
  )

  return (
    <Container flex>
      <Operation
        operation={copyEmailTemplate}
        render={disabled => (
          <Container right='xsmall'>
            <WrapWithTooltip content='Copy' enableTooltip={!disabled}>
              <Button.Circular
                disabled={disabled}
                variant='flat'
                data-testid='email-templates-list-item-copy-button'
                icon={<Copy16 />}
                onClick={handleCopyClick}
              />
            </WrapWithTooltip>
          </Container>
        )}
      />
      {isOperationHidden(updateEmailTemplate) && (
        <Container right='xsmall'>
          <Tooltip content='Show'>
            <Button.Circular
              variant='flat'
              data-testid='email-templates-list-item-show-button'
              icon={<Eye16 />}
              onClick={handleShowClick}
            />
          </Tooltip>
        </Container>
      )}
      <Operation
        operation={updateEmailTemplate}
        render={disabled => (
          <Container right='xsmall'>
            <WrapWithTooltip content='Edit' enableTooltip={!disabled}>
              <Button.Circular
                disabled={disabled}
                variant='flat'
                data-testid='email-templates-list-item-edit-button'
                icon={<Pencil16 />}
                onClick={handleEditClick}
              />
            </WrapWithTooltip>
          </Container>
        )}
      />
      <Operation
        operation={destroyEmailTemplate}
        render={disabled => (
          <WrapWithTooltip content='Delete' enableTooltip={!disabled}>
            <Button.Circular
              variant='flat'
              disabled={disabled}
              data-testid='email-templates-list-item-delete-button'
              onClick={showDestroyEmailTemplateModal}
              icon={<Trash16 />}
            />
          </WrapWithTooltip>
        )}
      />
    </Container>
  )
}

export default EmailTemplatesListItemActions
