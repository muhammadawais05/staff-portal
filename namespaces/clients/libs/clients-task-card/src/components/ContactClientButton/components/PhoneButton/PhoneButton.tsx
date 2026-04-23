import React from 'react'
import { Button } from '@toptal/picasso'
import { useCallContactWithOperationCheck } from '@staff-portal/communication'

import { ContactMethodFragment } from '../../data/get-client-contact'

export type Props = {
  contactUserId: string
  contactMethod: ContactMethodFragment
}

const PhoneButton = ({ contactUserId, contactMethod }: Props) => {
  const { loading, callContact } = useCallContactWithOperationCheck({
    roleId: contactUserId,
    phoneContactId: contactMethod.id
  })

  return (
    <Button loading={loading} onClick={callContact}>
      {contactMethod.value}
    </Button>
  )
}

export default PhoneButton
