import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Typography, List, Container } from '@toptal/picasso'
import { PhoneLink, SkypeLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { findContact } from '@staff-portal/contacts'
import { NO_VALUE } from '@staff-portal/config'
import { useSendEmailModal } from '@staff-portal/communication-send-email'

import { GetClientContactsQuery } from '../../data/get-client-contacts'
import {
  ClaimClientEnterpriseDocument,
  ClaimClientEnterpriseMutation
} from '../../data/claim-client-enterprise'

interface Props {
  data?: GetClientContactsQuery['node']
  hideModal: () => void
  clientId: string
}

const ClaimClientEnterpriseForm = ({ data, hideModal, clientId }: Props) => {
  const { showModal: showSendEmailModal } = useSendEmailModal()
  const { loading, handleSubmit } = useModalFormChangeHandler({
    mutationDocument: ClaimClientEnterpriseDocument,
    mutationResultOptions: {
      mutationResult: 'claimClientEnterprise',
      onSuccessAction: response => {
        const emailTemplate = (
          response as ClaimClientEnterpriseMutation['claimClientEnterprise']
        )?.emailTemplate

        if (emailTemplate?.id) {
          showSendEmailModal({
            nodeId: clientId,
            preselectedEmailTemplateId: emailTemplate.id
          })
        }

        hideModal()
      },
      successNotificationMessage: 'Your call was successfully logged.',
      successMessageEmitOptions: {
        type: CLIENT_UPDATED,
        payload: { companyId: clientId }
      }
    }
  })

  const { contact } = data || {}
  const skype = contact
    ? findContact(contact.contacts, ContactType.SKYPE)
    : undefined
  const phone = contact
    ? findContact(contact.contacts, ContactType.PHONE)
    : undefined

  return (
    <ModalForm
      title={`Notice: Claiming Enterprise Lead ${data?.fullName || ''}`}
      onSubmit={variables => handleSubmit({ ...variables, clientId })}
    >
      <Modal.Content>
        <Container bottom='small'>
          <Typography
            size='medium'
            data-testid='claim-client-enterprise-text-message'
          >
            Please call immediately and proceed with the handoff to the
            Enterprise Team.
          </Typography>
        </Container>
        <Container bottom='small'>
          <Typography
            size='medium'
            data-testid='claim-client-enterprise-text-objectives'
          >
            Objectives for your call with this prospect include:
          </Typography>
        </Container>
        <Container bottom='small'>
          <List variant='ordered'>
            <List.Item>
              Confirm best email to contact them (perhaps they signed up with
              personal / business and should switch).
            </List.Item>
            <List.Item>
              Confirm this is for Enterprise (vs personal project or vs a
              company that is too small for Enterprise).
            </List.Item>
            <List.Item>Manually get Q&A Survey responses.</List.Item>
            <List.Item>
              Ask what dates/times would work best for our Enterprise Team to
              contact them
            </List.Item>
          </List>
        </Container>
        <Typography
          size='medium'
          data-testid='claim-client-enterprise-text-reach'
        >
          You can reach {contact?.fullName} via:
        </Typography>
        <Container flex>
          <Container right='xsmall'>
            <Typography size='medium'>Phone:</Typography>
          </Container>
          <Typography size='medium'>
            {phone && contact ? (
              <PhoneLink
                roleId={contact.id}
                phoneContactId={phone.id}
                phoneContactValue={phone.value}
              />
            ) : (
              NO_VALUE
            )}
          </Typography>
        </Container>
        <Container flex>
          <Container right='xsmall'>
            <Typography size='medium'>Skype:</Typography>
          </Container>

          {skype ? (
            <SkypeLink skypeId={skype.value} weight='semibold' size='medium' />
          ) : (
            <Typography size='medium'>{NO_VALUE}</Typography>
          )}
        </Container>
        <Container top='small'>
          <Form.Checkbox
            name='successfulCall'
            label='I was able to get in touch with them'
          />
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>Confirm Call</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ClaimClientEnterpriseForm
