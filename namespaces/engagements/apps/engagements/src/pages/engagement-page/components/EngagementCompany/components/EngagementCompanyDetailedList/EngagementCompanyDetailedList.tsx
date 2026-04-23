import React from 'react'
import { Link } from '@staff-portal/navigation'
import { ContactType } from '@staff-portal/graphql/staff'
import { PhoneLink, SkypeLink } from '@staff-portal/communication'
import { Typography } from '@toptal/picasso'
import { DetailedList as DL, TypographyOverflowLink } from '@staff-portal/ui'
import { findContact } from '@staff-portal/contacts'
import { NO_VALUE } from '@staff-portal/config'

import { EngagementClientFragment } from '../../data'
import BillingPhoneNumber from '../BillingPhoneNumber'

interface Props extends Partial<EngagementClientFragment> {
  labelColumnWidth?: number
}

const EngagementCompanyDetailedList = ({
  billingPhone,
  email,
  contact,
  timeZone,
  id: clientId,
  labelColumnWidth
}: Props) => {
  const phone = contact
    ? findContact(contact.contacts, ContactType.PHONE)
    : undefined

  const skype = contact
    ? findContact(contact.contacts, ContactType.SKYPE)
    : undefined

  return (
    <DL
      labelColumnWidth={labelColumnWidth}
      defaultValue={NO_VALUE}
      data-testid='engagement-company-detailed-list-items'
    >
      <DL.Row>
        <DL.Item label='Email'>
          <TypographyOverflowLink>
            <Link href={`mailto:${email}`}>{email}</Link>
          </TypographyOverflowLink>
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Phone'>
          <>
            {clientId && billingPhone && !phone && (
              <BillingPhoneNumber
                billingPhone={billingPhone}
                data-testid='billing-phone-number-link'
                clientId={clientId}
              />
            )}

            {phone && contact && (
              <TypographyOverflowLink
                tooltipContent={phone.value}
                data-testid='contact-phone-number-link'
              >
                <PhoneLink
                  roleId={contact.id}
                  phoneContactId={phone.id}
                  renderPhoneContact={() => (
                    <Typography size='medium' color='inherit'>
                      {phone.value}
                    </Typography>
                  )}
                />
              </TypographyOverflowLink>
            )}
          </>
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Skype'>
          {skype && <SkypeLink skypeId={skype.value} />}
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Time Zone' value={timeZone?.name} />
      </DL.Row>
    </DL>
  )
}

export default EngagementCompanyDetailedList
