import React from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { TypographyOverflow } from '@toptal/picasso'
import { RolePhoneLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'

type Props = {
  staffId: string
  twilioNumber?: string | null
}

const TwilioNumber = ({ staffId, twilioNumber }: Props) => {
  const user = useGetCurrentUser()

  if (!user || !twilioNumber) {
    return null
  }

  if (user.id === staffId) {
    return <TypographyOverflow>{twilioNumber}</TypographyOverflow>
  }

  return (
    <RolePhoneLink
      roleId={staffId}
      destination={twilioNumber}
      contactType={ContactType.PHONE}
    />
  )
}

export default TwilioNumber
