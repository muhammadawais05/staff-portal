import React from 'react'
import { FieldWithTooltipOverIcon } from '@staff-portal/ui'
import { ClientPhoneLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'

export interface Props {
  billingPhone: string
  clientId: string
  'data-testid': string
}

const BillingPhoneNumber = ({
  billingPhone,
  'data-testid': dataTestId,
  clientId
}: Props) => {
  return (
    <FieldWithTooltipOverIcon
      inline={false}
      tooltip='Client has not set a contact number. Billing contact is provided here instead.'
      data-testid={dataTestId}
    >
      <ClientPhoneLink
        clientId={clientId}
        destination={billingPhone}
        contactType={ContactType.PHONE}
      />
    </FieldWithTooltipOverIcon>
  )
}

export default BillingPhoneNumber
