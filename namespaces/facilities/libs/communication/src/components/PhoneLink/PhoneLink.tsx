import React, { ReactNode } from 'react'

import { PhoneLinkContent } from '../PhoneLinkContent'
import { useCallContactWithOperationCheck } from '../../hooks/use-call-contact-with-operation-check/use-call-contact-with-operation-check'

interface Props {
  roleId: string
  phoneContactId: string
  phoneContactValue?: string
  renderPhoneContact?: () => ReactNode
  'aria-label'?: string
  contactSourceId?: string
}

/**
 * Used to call via TopCall widget using contact entity
 * mutation is: callContact
 *
 * @param roleId - entity id (eg client id \ talent id etc)
 * @param phoneContactId - contact entity id (eg client.contact.id)
 * @param phoneContactValue - string number to call
 * @param -
 *
 * @param phoneContactValue - it is always a string value that is also passed to the mutation
 * @param renderPhoneContact - it is a react node that will override string value to display to user
 *
 * To call via skype use `SkypeLink` component (no mutation),
 * to call via TopCall widget to role use `RolePhoneLink` component (mutation: callRole),
 * to call via string numbers without contact entity use `ClientPhoneLink` component (mutation: callClient),
 * to call via raw string number without any corresponding entity use `StartCallLink` component (mutation: startCall)
 */
const PhoneLink = ({
  roleId,
  phoneContactId,
  phoneContactValue,
  renderPhoneContact,
  'aria-label': ariaLabel,
  contactSourceId
}: Props) => {
  const { loading, callContact } = useCallContactWithOperationCheck({
    roleId,
    phoneContactId,
    contactSourceId
  })

  return (
    <PhoneLinkContent
      phoneContactValue={phoneContactValue}
      aria-label={ariaLabel}
      renderPhoneContact={renderPhoneContact}
      onClick={callContact}
      loading={loading}
    />
  )
}

export default PhoneLink
