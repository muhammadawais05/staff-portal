import React from 'react'
import { PromptModal } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { ContactType } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'

import { PHONE_TYPES } from '../../constants'
import getDefaultContact from './services/get-default-contact/get-default-contact'
import { useCallContact } from '../../hooks/use-call-contact'
import CallViaSkypeModal from './components/CallViaSkypeModal/CallViaSkypeModal'
import {
  CallableClientContactFragment,
  CallableClientFragment
} from '../../data/callable-client-fragment/callable-client-fragment.staff.gql.types'

type Props = {
  client: CallableClientFragment
  onCompleted: () => void
  hideModal: () => void
}

const CallClientModal = ({ client, onCompleted, hideModal }: Props) => {
  const { showError } = useNotifications()

  const [callContact] = useCallContact({
    onError: () => showError('Unable to call contact.')
  })

  if (!client.contact) {
    // does not allowed to call, if there is no contact specified
    return null
  }

  const startCallForContact = async ({
    id: contactId
  }: CallableClientContactFragment) => {
    if (!client.contact) {
      // does not allowed to call, if there is no contact specified
      return
    }

    const result = await callContact({
      variables: {
        input: { roleId: client.contact.id, contactId }
      }
    })

    const callContactResult = result.data?.callContact

    if (callContactResult?.success) {
      return
    }

    const userErrors = callContactResult?.errors || []

    if (userErrors.length > 0) {
      throw new Error(concatMutationErrors(userErrors))
    }

    throw new Error('Unable to call contact.')
  }

  const calleeName = client.fullName
  const contacts = client.contact.contacts.nodes
  const defaultContact = getDefaultContact(contacts)

  if (defaultContact.type === ContactType.SKYPE) {
    return (
      <CallViaSkypeModal
        calleeName={calleeName}
        contacts={contacts}
        startCallForContact={startCallForContact}
        hideModal={hideModal}
        onCompleted={onCompleted}
      />
    )
  }

  const topCallIsEnabled = !defaultContact.external
  const phoneAndSkypeContacts = contacts.filter(
    ({ type }) => PHONE_TYPES.includes(type) || type === ContactType.SKYPE
  )

  if (!topCallIsEnabled) {
    return (
      <CallViaSkypeModal
        calleeName={calleeName}
        contacts={phoneAndSkypeContacts}
        startCallForContact={startCallForContact}
        hideModal={hideModal}
        onCompleted={onCompleted}
      />
    )
  }

  return (
    <PromptModal
      open
      onClose={hideModal}
      title={'Call ' + calleeName}
      message='Are you sure you want to start a call?'
      submitText='Start Call'
      onSubmit={async () => {
        try {
          await startCallForContact(defaultContact)
          onCompleted()
        } catch (error) {
          if (error instanceof Error) {
            showError(error.message)
          }
        }
      }}
    />
  )
}

export default CallClientModal
