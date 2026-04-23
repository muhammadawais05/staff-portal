import React from 'react'
import { ClientPhoneLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'

import { FieldHelper } from './field-helper'

export const billingPhoneField: FieldHelper = ({
  company: { billingPhone, id: clientId }
}) => [
  'Billing Phone',
  billingPhone && (
    <ClientPhoneLink
      clientId={clientId}
      destination={billingPhone}
      contactType={ContactType.PHONE}
    />
  )
]
