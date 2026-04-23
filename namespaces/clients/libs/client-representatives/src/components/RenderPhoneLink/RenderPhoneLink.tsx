import { ContactType, PhoneCategory } from '@staff-portal/graphql/staff'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { PhoneLink, ClientPhoneLink } from '@staff-portal/communication'
import React from 'react'

import { AdditionalPhoneCategory } from '../../types'

export interface Props {
  id: string
  value?: string
  phoneCategory?: PhoneCategory | AdditionalPhoneCategory | null
  companyRepresentativeId: string
  clientId?: string
}

export const RenderPhoneLink = ({
  phoneCategory,
  clientId,
  value,
  companyRepresentativeId,
  id
}: Props) => {
  if (!value) {
    return (
      <Typography size='medium' data-testid='PhoneContactViewItem-no-value'>
        {NO_VALUE}
      </Typography>
    )
  }

  if (phoneCategory === AdditionalPhoneCategory.BILLING) {
    if (!clientId) {
      throw new Error(`Phone link creation failed: clientId must not be empty`)
    }

    return (
      <ClientPhoneLink
        clientId={clientId}
        destination={value}
        contactType={ContactType.PHONE}
      />
    )
  }

  return (
    <PhoneLink
      roleId={companyRepresentativeId}
      phoneContactId={id}
      renderPhoneContact={() => (
        <Container as='span'>
          <TypographyOverflow size='medium' color='inherit'>
            {value}
          </TypographyOverflow>
        </Container>
      )}
    />
  )
}
