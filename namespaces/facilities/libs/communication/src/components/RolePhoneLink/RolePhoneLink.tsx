import { ContactType } from '@staff-portal/graphql/staff'
import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'

import { PhoneLinkContent } from '../PhoneLinkContent'
import { useProceedTopcall } from '../../hooks/use-proceed-topcall'
import { ERROR_MESSAGE } from '../../messages'
import { useCallRole } from '../../hooks/use-call-role'

export interface Props {
  roleId: string
  destination?: string
  contactType: ContactType
}

/**
 * Used to call via TopCall widget to role
 * mutation is: callRole
 *
 * @param {string} roleId - role id
 * @param {string} destination - string number to call
 * @param {ContactType} contactType - type of the call (eg ContactType.PHONE)
 *
 * To call via skype use `SkypeLink` component (no mutation),
 * to call via TopCall widget to client use `ClientPhoneLink` component (mutation CallClient),
 * to call via contact entity use `PhoneLink` component (mutation: callContact),
 * to call via raw string number without any corresponding entity use `StartCallLink` component (mutation: startCall)
 */
const RolePhoneLink = ({ roleId, destination, contactType }: Props) => {
  const { showError } = useNotifications()
  const { proceedTopcall } = useProceedTopcall()
  const [callRole, { loading }] = useCallRole({
    onError: () => {
      showError(ERROR_MESSAGE)
    },
    onCompleted: data => {
      if (!data?.callRole) {
        return
      }

      proceedTopcall(data?.callRole)
    }
  })

  const onClick = () => {
    if (destination) {
      callRole({
        variables: {
          input: { roleId, destination, contactType }
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

export default RolePhoneLink
