import { Button, ButtonProps } from '@toptal/picasso'
import React from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { ContactType } from '@staff-portal/graphql/staff'
import {
  ContactCompanyPayload,
  SendEmailActionItem
} from '@staff-portal/communication-send-email'

import SkypeButton from './components/SkypeButton'
import PhoneButton from './components/PhoneButton'
import CreateConferenceButton from './components/CreateConferenceButton'
import ContactClientModal from './components/ContactClientModal'
import { useGetLazyClientContact } from './data/get-client-contact/get-client-contact.staff.gql'
import { ContactMethodFragment } from './data/get-client-contact'

const FETCH_CLIENT_CONTACT_ERROR = "Unable to fetch the client's contact."

const makeContactOptions = ({
  clientId,
  playbookTemplateId,
  preselectedEmailTemplateId,
  contactUserId,
  contactMethods,
  onCompleted
}: {
  clientId: string
  contactUserId: string
  contactMethods: ContactMethodFragment[]
  playbookTemplateId?: string
  preselectedEmailTemplateId?: string
  onCompleted?: (data?: ContactCompanyPayload) => void
}) => {
  const skype = contactMethods.find(({ type }) => type === ContactType.SKYPE)
  const phone = contactMethods.find(({ type }) => type === ContactType.PHONE)

  const contactOptions = [
    {
      key: 'email',
      label: 'Email',
      button: (
        <SendEmailActionItem
          nodeId={clientId}
          preselectedEmailTemplateId={preselectedEmailTemplateId}
          skipOperationCheck
          componentType='button'
          onCompleted={onCompleted}
        />
      )
    }
  ]

  if (skype) {
    contactOptions.push({
      key: 'skype',
      label: 'Skype',
      button: <SkypeButton skypeId={skype.value} />
    })
  }

  if (phone) {
    contactOptions.push({
      key: 'phone',
      label: 'Phone number',
      button: (
        <PhoneButton contactUserId={contactUserId} contactMethod={phone} />
      )
    })
  }

  contactOptions.push({
    key: 'conference',
    label: 'Conference',
    button: (
      <CreateConferenceButton
        contactUserId={contactUserId}
        playbookTemplateId={playbookTemplateId}
        onSuccess={onCompleted}
      />
    )
  })

  return contactOptions
}

export type Props = Omit<ButtonProps, 'loading' | 'onClick'> & {
  clientId: string
  playbookTemplateId?: string
  preselectedEmailTemplateId?: string
  onCompleted?: (data?: ContactCompanyPayload) => void
}

const ContactClientButton = ({
  clientId,
  playbookTemplateId,
  preselectedEmailTemplateId,
  children,
  onCompleted,
  ...restProps
}: Props) => {
  const { showError } = useNotifications()
  const { showModal, hideModal, isOpen } = useModal()

  const {
    getData: getClientContact,
    data: clientContact,
    loading
  } = useGetLazyClientContact({
    clientId,
    onCompleted: ({ node }) => {
      if (!node) {
        showError(FETCH_CLIENT_CONTACT_ERROR)
      }
    },
    onError: () => {
      showError(FETCH_CLIENT_CONTACT_ERROR)
    }
  })

  const handleCompleted = (data?: ContactCompanyPayload) => {
    hideModal()
    onCompleted?.(data)
  }

  return (
    <>
      <Button
        {...restProps}
        data-testid='contact-client-button'
        loading={loading}
        onClick={() => {
          showModal()
          getClientContact()
        }}
      >
        {children}
      </Button>
      {isOpen && clientContact && (
        <ContactClientModal
          onClose={hideModal}
          contactOptions={makeContactOptions({
            clientId,
            playbookTemplateId,
            preselectedEmailTemplateId,
            contactUserId: clientContact.id,
            contactMethods: clientContact.contacts.nodes,
            onCompleted: handleCompleted
          })}
        />
      )}
    </>
  )
}

export default ContactClientButton
