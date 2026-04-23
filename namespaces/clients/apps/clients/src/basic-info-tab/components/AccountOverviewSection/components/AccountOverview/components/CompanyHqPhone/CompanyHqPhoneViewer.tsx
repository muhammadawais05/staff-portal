import React from 'react'
import { ContactType } from '@staff-portal/graphql/staff'
import { ClientPhoneLink } from '@staff-portal/communication'
import { NO_VALUE } from '@staff-portal/config'

type Props = {
  value?: string | null
  clientId: string
}

const CompanyHqPhoneViewer = ({ value, clientId }: Props) =>
  value ? (
    <ClientPhoneLink
      clientId={clientId}
      destination={value}
      contactType={ContactType.PHONE}
    />
  ) : (
    <>{NO_VALUE}</>
  )

export default CompanyHqPhoneViewer
