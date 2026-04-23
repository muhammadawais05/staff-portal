import React, { useMemo, useState } from 'react'
import { Button, Container, Typography, Radio } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { useNotifications, capitalize } from '@toptal/picasso/utils'
import { navigateExternallyTo } from '@staff-portal/navigation'
import { ContactType } from '@staff-portal/graphql/staff'

import { CallableClientContactFragment } from '../../../../data/callable-client-fragment/callable-client-fragment.staff.gql.types'

interface Props {
  calleeName?: string
  contacts: CallableClientContactFragment[]
  startCallForContact: (contact: CallableClientContactFragment) => Promise<void>
  hideModal?: () => void
  onCompleted?: Function
}

const getContactTypeName = (type: ContactType) =>
  type === ContactType.SKYPE ? 'skype' : 'phone'

const CallViaSkypeModal = ({
  calleeName,
  contacts,
  startCallForContact,
  hideModal,
  onCompleted
}: Props) => {
  const { showError } = useNotifications()
  const [isLoading, setLoading] = useState(false)
  const primaryContact = contacts.find(({ primary }) => primary) || contacts[0]
  const [selectedContactId, setSelectedContactId] = useState(primaryContact.id)

  const prioritizePrimaryContact = (itemA: CallableClientContactFragment) =>
    itemA.primary ? -1 : 0
  const uniquePrimaryFirstContacts = useMemo(
    () =>
      contacts
        .reduce((contactList, contact) => {
          if (!contactList.find(item => item.value === contact.value)) {
            contactList.push(contact)
          }

          return contactList
        }, [] as CallableClientContactFragment[])
        .sort(prioritizePrimaryContact),
    [contacts]
  )

  const onStartCall = async () => {
    const selectedContact = contacts.find(({ id }) => id === selectedContactId)

    if (!selectedContact) {
      throw new Error('Unable to detect selected contact.')
    }

    setLoading(true)
    try {
      await startCallForContact(selectedContact)
      navigateExternallyTo(`skype:${selectedContact.value}`)
      onCompleted?.()
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message)
      }
    }

    setLoading(false)
    hideModal?.()
  }

  return (
    <Modal onClose={hideModal} open>
      <Modal.Title>Reminder: Time To Call</Modal.Title>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Time to call <strong>"{calleeName}"</strong>. Please make sure that
            you are in quiet place with good connection.
          </Typography>
        </Container>
        <Container>
          {uniquePrimaryFirstContacts.length === 1 && (
            <Typography size='medium'>
              Call <strong>"{calleeName}"</strong> by using{' '}
              {getContactTypeName(uniquePrimaryFirstContacts[0].type)} (
              {uniquePrimaryFirstContacts[0].value}).
            </Typography>
          )}

          {uniquePrimaryFirstContacts.length > 1 && (
            <>
              <Container bottom='medium'>
                <Typography size='medium'>
                  Call <strong>"{calleeName}"</strong> by using the following
                  contact details:
                </Typography>
              </Container>
              <hr />
              <Container top='medium'>
                <Radio.Group
                  name='selectedContact'
                  onChange={event => setSelectedContactId(event.target.value)}
                  value={selectedContactId}
                >
                  {uniquePrimaryFirstContacts.map(({ id, value, type }) => (
                    <Container key={id} bottom='small'>
                      <Radio
                        label={`${capitalize(
                          getContactTypeName(type)
                        )} (${value})`}
                        value={id}
                        titleCase={false}
                      />
                    </Container>
                  ))}
                </Radio.Group>
              </Container>
            </>
          )}
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={isLoading}
          variant='secondary'
          onClick={() => hideModal?.()}
        >
          Cancel
        </Button>
        <Button loading={isLoading} onClick={onStartCall} variant='positive'>
          Call Company
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default CallViaSkypeModal
