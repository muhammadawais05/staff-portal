import React, { ReactElement, ReactNode } from 'react'
import { Button } from '@toptal/picasso'

import useStartPhoneCall from './hooks/use-start-phone-call'

type Props = {
  children: ReactNode
  phoneNumber: string
}

/**
 * Used to call via TopCall widget using contact entity
 * mutation is: startCall
 *
 * @param phoneNumber - string number to call
 * @param -
 *
 * To call via skype use `SkypeLink` component (no mutation),
 * to call via TopCall widget to role use `RolePhoneLink` component (mutation: callRole),
 * to call via contact entity use `PhoneLink` component (mutation: callContact),
 * to call via string numbers without contact entity use `ClientPhoneLink` component (mutation: callClient)
 */
const StartCallLink = ({ phoneNumber, children }: Props): ReactElement => {
  const { loading, startPhoneCall } = useStartPhoneCall()

  return (
    <Button.Action
      loading={loading}
      onClick={() => startPhoneCall(phoneNumber)}
    >
      {children}
    </Button.Action>
  )
}

export default StartCallLink
