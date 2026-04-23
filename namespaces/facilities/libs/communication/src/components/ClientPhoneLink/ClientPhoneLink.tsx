import { ContactType } from '@staff-portal/graphql/staff'
import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'

import { PhoneLinkContent } from '../PhoneLinkContent'
import { useProceedTopcall } from '../../hooks/use-proceed-topcall'
import { useCallClient } from '../../hooks/use-call-client'
import { ERROR_MESSAGE } from '../../messages'

export interface Props {
  clientId: string
  destination?: string
  contactType: ContactType
}

/**
 * Used to call via TopCall widget to specific clients
 * mutation is: callClient
 *
 * @param {string} clientId - client id
 * @param {string} destination - string number to call
 * @param {ContactType} contactType - type of the call (eg ContactType.PHONE)
 *
 * To call via skype use `SkypeLink` component (no mutation),
 * to call via TopCall widget to role use `RolePhoneLink` component (mutation: callRole),
 * to call via contact entity use `PhoneLink` component (mutation: callContact),
 * to call via raw string number without any corresponding entity use `StartCallLink` component (mutation: startCall)
 */
const ClientPhoneLink = ({ clientId, destination, contactType }: Props) => {
  const { showError } = useNotifications()
  const { proceedTopcall } = useProceedTopcall()
  const [callClient, { loading }] = useCallClient({
    onError: () => {
      showError(ERROR_MESSAGE)
    },
    onCompleted: data => {
      if (!data?.callClient) {
        return
      }

      proceedTopcall(data?.callClient)
    }
  })

  const onClick = () => {
    if (destination) {
      callClient({
        variables: {
          input: { clientId, destination, contactType }
        }
      })
    }
  }

  return (
    <PhoneLinkContent
      phoneContactValue={destination}
      onClick={onClick}
      loading={loading}
    />
  )
}

export default ClientPhoneLink
