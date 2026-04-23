import React from 'react'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { LinkWrapper } from '@staff-portal/ui'
import {
  getDateDistanceFromNow,
  parseAndFormatDate,
  getTimeZoneText
} from '@staff-portal/date-time-utils'
import { TaskCardLayoutContentItem } from '@staff-portal/tasks'
import { PhoneLink } from '@staff-portal/communication'
import { joinTruthy } from '@staff-portal/utils'
import { SkypeField } from '@staff-portal/role-profile'

import { TaskTalentFragment } from '../../../../data'
import { TalentContentField } from '../../../../types'
import { getTalentSpecializations } from '../get-talent-specializations/get-talent-specializations'
import { getTalentLastResume } from '../get-talent-last-resume/get-talent-last-resume'

// eslint-disable-next-line complexity
export const getTalentContentMapping = (
  {
    id,
    email,
    profile,
    joinedAt,
    contacts,
    skype,
    additionalSkypeIds,
    legalName,
    cityDescription,
    locationV2,
    citizenship,
    primarySkill,
    inactivityRejectionDeadlines,
    specializationApplications,
    timeZone: talentTimeZone,
    reapplicationDate,
    linkedinUrl,
    availableHours,
    allocatedHoursConfirmedAt,
    breaks,
    applications,
    invoices,
    disputedInvoices,
    webResource: { url }
  }: TaskTalentFragment,
  timeZone?: string
): Record<
  TalentContentField,
  Omit<TaskCardLayoutContentItem, 'key'> | null | undefined
> => {
  const primaryContact = contacts.nodes.find(({ primary }) => primary)
  const inactivityRejectionDate = inactivityRejectionDeadlines?.nodes[0]?.date

  return {
    [TalentContentField.INVOICES]: invoices && {
      label: 'Invoices',
      value: (
        <LinkWrapper
          wrapWhen={Boolean(invoices.webResource.url)}
          href={invoices.webResource.url as string}
          target='_blank'
        >
          {invoices.totalCount}
        </LinkWrapper>
      )
    },
    [TalentContentField.DISPUTED_INVOICES]: disputedInvoices && {
      label: 'Disputed invoices',
      value: (
        <LinkWrapper
          wrapWhen={Boolean(disputedInvoices.webResource.url)}
          href={disputedInvoices.webResource.url as string}
          target='_blank'
        >
          {disputedInvoices.totalCount}
        </LinkWrapper>
      )
    },
    [TalentContentField.AVAILABILITY]: {
      label: 'Availability',
      value: (
        <TypographyOverflow size='inherit' color='inherit'>
          <>
            {availableHours} hr/week
            {allocatedHoursConfirmedAt && (
              <Typography as='span' color='dark-grey'>
                {' '}
                {getDateDistanceFromNow(
                  allocatedHoursConfirmedAt
                ).toLowerCase()}
              </Typography>
            )}
          </>
        </TypographyOverflow>
      )
    },
    [TalentContentField.BREAKS]: {
      label: 'Breaks',
      value: breaks?.totalCount ?? 0
    },
    [TalentContentField.APPLICATIONS]: {
      label: 'Applications',
      value: (
        <LinkWrapper wrapWhen={Boolean(url)} href={`${url}#job_applications`}>
          {applications?.totalCount ?? 0} active
        </LinkWrapper>
      )
    },
    [TalentContentField.EMAIL]: {
      label: 'Email',
      value: email && (
        <Link href={`mailto:${email}`}>
          <TypographyOverflow color='inherit'>{email}</TypographyOverflow>
        </Link>
      )
    },
    [TalentContentField.GITHUB]: {
      label: 'GitHub',
      value: profile?.github && (
        <LinkWrapper
          wrapWhen={Boolean(profile.github.url)}
          href={profile.github.url as string}
          target='_blank'
        >
          <TypographyOverflow color='inherit'>
            {profile.github.text || NO_VALUE}
          </TypographyOverflow>
        </LinkWrapper>
      )
    },
    [TalentContentField.PHONE]: {
      label: 'Phone',
      value: primaryContact && (
        <PhoneLink
          roleId={id}
          phoneContactId={primaryContact.id}
          phoneContactValue={primaryContact.value}
        />
      )
    },
    [TalentContentField.JOINED]: {
      label: 'Joined',
      value: parseAndFormatDate(joinedAt, { timeZone })
    },
    [TalentContentField.SKYPE_ID]: {
      label: 'Skype ID',
      value: skype && (
        <SkypeField
          size='inherit'
          skypeId={skype}
          additionalSkypeIds={additionalSkypeIds?.nodes}
        />
      )
    },
    [TalentContentField.LEGAL_NAME]: {
      label: 'Legal Name',
      value: legalName
    },
    [TalentContentField.CURRENT_LOCATION]: {
      label: 'Current Location',
      value: joinTruthy([cityDescription, locationV2?.countryName]) || undefined
    },
    [TalentContentField.CITIZENSHIP]: {
      label: 'Citizenship',
      value: citizenship?.name
    },
    [TalentContentField.PRIMARY_SKILL]: {
      label: 'Primary Skill',
      value: primarySkill?.title
    },
    [TalentContentField.INACTIVITY_REJECT]: {
      label: 'Inactivity Reject',
      value:
        inactivityRejectionDate && parseAndFormatDate(inactivityRejectionDate)
    },
    [TalentContentField.SPECIALIZATIONS]: {
      label: 'Specializations',
      value: getTalentSpecializations({ specializationApplications })
    },
    [TalentContentField.RESUME]: {
      label: 'Resume',
      value: getTalentLastResume(profile)
    },
    [TalentContentField.TIMEZONE]: {
      label: 'Time Zone',
      value: getTimeZoneText(talentTimeZone)
    },
    [TalentContentField.REAPPLICATION]: {
      label: 'Reapplication',
      value: reapplicationDate && parseAndFormatDate(reapplicationDate)
    },
    [TalentContentField.LINKEDIN]: {
      label: 'LinkedIn',
      value: linkedinUrl && (
        <Link href={linkedinUrl} target='_blank'>
          <TypographyOverflow color='inherit'>{linkedinUrl}</TypographyOverflow>
        </Link>
      )
    }
  }
}
