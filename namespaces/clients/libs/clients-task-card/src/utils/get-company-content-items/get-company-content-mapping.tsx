import React from 'react'
import {
  Container,
  QuestionMark16,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { ContactType } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'
import { getTwitterProfileURL } from '@staff-portal/utils'
import {
  getTimeZoneText,
  parseAndFormatDate,
  parseAndFormatDateTime
} from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import { SkypeLink, PhoneLink } from '@staff-portal/communication'
import { TaskCardLayoutContentItem } from '@staff-portal/tasks'
import { ApplicationInfoField } from '@staff-portal/facilities'
import { findContact } from '@staff-portal/contacts'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import { CompanyContentField } from '../../enums'
import { getCompanyLastLogin } from './get-company-last-login'
import { getCompanyNpsScore } from './get-company-nps-score'

// eslint-disable-next-line complexity
export const getCompanyContentMapping = (
  {
    id,
    contact,
    referrer,
    email,
    applicationInfo,
    claimer,
    timeZone: companyTimeZone,
    createdAt,
    claimableSince,
    country,
    businessType,
    twitter,
    website,
    promotions,
    lastAnsweredPromotion,
    reviewStatus,
    representatives,
    billingVerifiedAt
  }: TaskCardCompanyFragment,
  timeZone?: string
): Record<
  CompanyContentField,
  Omit<TaskCardLayoutContentItem, 'key'> | null | undefined
> => {
  const skype = contact
    ? findContact(contact.contacts, ContactType.SKYPE)
    : undefined
  const phone = contact
    ? findContact(contact.contacts, ContactType.PHONE)
    : undefined
  const lastLogin = getCompanyLastLogin(representatives, timeZone)
  const twitterLink = getTwitterProfileURL(twitter as string)

  return {
    [CompanyContentField.CONTACT]: {
      label: 'Contact',
      value: (
        <LinkWrapper
          wrapWhen={Boolean(contact?.webResource.url)}
          href={contact?.webResource.url as string}
          target='_blank'
        >
          <TypographyOverflow color='inherit'>
            {contact?.fullName}
          </TypographyOverflow>
        </LinkWrapper>
      )
    },
    [CompanyContentField.REFERRER]: {
      label: 'Referrer',
      value: referrer && (
        <LinkWrapper
          wrapWhen={Boolean(referrer.webResource.url)}
          href={referrer.webResource.url as string}
          target='_blank'
        >
          <TypographyOverflow color='inherit'>
            {referrer.fullName}
          </TypographyOverflow>
        </LinkWrapper>
      )
    },
    [CompanyContentField.EMAIL]: {
      label: 'Email',
      value: email && (
        <Link href={`mailto:${email}`}>
          <TypographyOverflow color='inherit'>{email}</TypographyOverflow>
        </Link>
      )
    },
    [CompanyContentField.ORIGIN]: {
      label: 'Origin',
      value: applicationInfo?.webResource.url && (
        <ApplicationInfoField entityId={id} />
      )
    },
    [CompanyContentField.PHONE]: {
      label: 'Phone',
      value: phone && contact && (
        <PhoneLink
          roleId={contact.id}
          phoneContactId={phone.id}
          phoneContactValue={phone.value}
        />
      )
    },
    [CompanyContentField.CLAIMER]: {
      label: 'Sales Claimer',
      value: claimer && (
        <LinkWrapper
          target='_blank'
          wrapWhen={Boolean(claimer.webResource.url)}
          href={claimer.webResource.url as string}
        >
          <TypographyOverflow color='inherit'>
            {claimer.fullName}
          </TypographyOverflow>
        </LinkWrapper>
      )
    },
    [CompanyContentField.SKYPE]: {
      label: 'Skype ID',
      value: skype && <SkypeLink skypeId={skype.value} />
    },
    [CompanyContentField.APPLIED]: {
      label: 'Applied',
      value: parseAndFormatDate(createdAt, { timeZone })
    },
    [CompanyContentField.TIMEZONE]: {
      label: 'Time Zone',
      value: getTimeZoneText(companyTimeZone)
    },
    [CompanyContentField.CLAIMABLE_SINCE]: {
      label: 'Claimable Since',
      value:
        claimableSince && parseAndFormatDateTime(claimableSince, { timeZone })
    },
    [CompanyContentField.COUNTRY]: {
      label: 'Country',
      value: country?.name
    },
    [CompanyContentField.BILLING_VERIFIED]: {
      label: 'Billing Verified',
      value:
        billingVerifiedAt && parseAndFormatDate(billingVerifiedAt, { timeZone })
    },
    [CompanyContentField.LAST_LOGIN]: {
      label: 'Last Login',
      value: lastLogin && (
        <Container flex alignItems='center'>
          <TypographyOverflow inline>{lastLogin.value}</TypographyOverflow>
          <Tooltip content={lastLogin.tooltip} interactive>
            <Container flex left='xsmall'>
              <QuestionMark16 color='dark-grey' />
            </Container>
          </Tooltip>
        </Container>
      )
    },
    [CompanyContentField.NPS_SCORE]: {
      label: 'NPS Score',
      value: getCompanyNpsScore({ promotions, lastAnsweredPromotion })
    },
    [CompanyContentField.WEBSITE]: {
      label: 'Website',
      value: website && (
        <Link target='_blank' href={website}>
          <TypographyOverflow color='inherit'>{website}</TypographyOverflow>
        </Link>
      )
    },
    [CompanyContentField.BUSINESS_TYPE]: {
      label: 'Business Type',
      value: businessType
    },
    [CompanyContentField.REVIEW_STATUS]: {
      label: 'Review Status',
      value: reviewStatus && titleize(reviewStatus)
    },
    [CompanyContentField.SOCIAL_PROFILE]: {
      label: 'Social Profile',
      value: twitter && (
        <Link target='_blank' href={twitterLink}>
          <TypographyOverflow color='inherit'>{`@${twitter}`}</TypographyOverflow>
        </Link>
      )
    }
  }
}
