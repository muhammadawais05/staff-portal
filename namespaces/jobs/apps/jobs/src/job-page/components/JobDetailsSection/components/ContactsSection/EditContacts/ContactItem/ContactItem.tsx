import { Button, CloseMinor16, Container, Tooltip } from '@toptal/picasso'
import React, { useCallback } from 'react'
import { Operation } from '@staff-portal/operations'

import ContactDetails from '../ContactDetails'
import useRemoveContact from '../hooks/use-remove-contact'
import { GetJobContactsItemFragment } from '../../data/get-job-client-contacts.staff.gql.types'

export interface Props {
  jobId: string
  contact: GetJobContactsItemFragment
}

const ContactItem = ({ contact, jobId }: Props) => {
  const { removeLoading, handleContactRemove } = useRemoveContact({ jobId })
  const { id: contactId, fullName } = contact.node

  const handleIconClick = useCallback(() => {
    handleContactRemove(contactId)
  }, [handleContactRemove, contactId])

  return (
    <Container inline right='medium'>
      <Tooltip
        interactive
        maxWidth='none'
        content={<ContactDetails contact={contact} jobId={jobId} />}
        placement='top'
      >
        <Button.Action
          loading={removeLoading}
          data-testid='contact-item-action-button'
        >
          {fullName}
        </Button.Action>
      </Tooltip>

      {!removeLoading && (
        <Operation
          operation={contact.operations.removeJobContact}
          render={disabled => (
            <Button.Action
              onClick={handleIconClick}
              disabled={disabled}
              data-testid='ContactItem-remove-btn'
            >
              <CloseMinor16 />
            </Button.Action>
          )}
        />
      )}
    </Container>
  )
}

export default ContactItem
