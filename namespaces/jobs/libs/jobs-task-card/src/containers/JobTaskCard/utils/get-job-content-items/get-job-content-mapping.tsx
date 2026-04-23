import { TypographyOverflow } from '@toptal/picasso'
import { capitalize } from '@toptal/picasso/utils'
import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import {
  DEFAULT_DATE_FORMAT,
  getDateDistanceFromNow,
  parseAndFormatDate,
  parseAndFormatDateTime
} from '@staff-portal/date-time-utils'
import { dasherize } from '@staff-portal/string'
import { TaskCardLayoutContentItem } from '@staff-portal/tasks'
import { ESTIMATED_LENGTH_MAPPING } from '@staff-portal/jobs'

import { JobFragment } from '../../data'
import { JobContentField } from '../../enums'
import { getEndDate } from './get-end-date'
import { getLastBreak } from './get-last-break'
import { getTimeZonePreference } from './get-timezone-preference'

// eslint-disable-next-line complexity
export const getJobContentMapping = (
  {
    claimerOrHandoff: recruiter,
    originalJob,
    client: {
      fullName: companyName,
      webResource: { url: companyUrl },
      claimer
    },
    skillSets,
    postedAt,
    visibleAt,
    specialization,
    applications,
    timeZonePreference,
    hasPreferredHours,
    hoursOverlap,
    availabilityRequests,
    startDate,
    candidates,
    commitment,
    assigned,
    estimatedLength,
    currentEngagement,
    breaks
  }: JobFragment,
  timeZone?: string
): Record<
  JobContentField,
  Omit<TaskCardLayoutContentItem, 'key'> | null | undefined
> => ({
  [JobContentField.ORIGINAL_JOB]: originalJob && {
    label: 'Original Job',
    value: (
      <LinkWrapper
        wrapWhen={Boolean(originalJob.webResource.url)}
        href={originalJob.webResource.url as string}
        target='_blank'
      >
        <TypographyOverflow color='inherit'>
          {originalJob.webResource.text}
        </TypographyOverflow>
      </LinkWrapper>
    )
  },
  [JobContentField.COMPANY]: {
    label: 'Company',
    value: (
      <LinkWrapper
        wrapWhen={Boolean(companyUrl)}
        href={companyUrl as string}
        target='_blank'
      >
        <TypographyOverflow color='inherit'>{companyName}</TypographyOverflow>
      </LinkWrapper>
    )
  },
  [JobContentField.POSTED]: {
    label: 'Posted',
    value: postedAt && getDateDistanceFromNow(postedAt)
  },
  [JobContentField.SKILL_REG]: {
    label: 'Skill Req.',
    value: skillSets?.totalCount
  },
  [JobContentField.CLAIMED]: {
    label: 'Claimed',
    value:
      visibleAt &&
      parseAndFormatDateTime(visibleAt, {
        timeZone,
        dateFormat: DEFAULT_DATE_FORMAT
      })
  },
  [JobContentField.SPECIALIZATION]: {
    label: 'Specialization',
    value: specialization?.title
  },
  [JobContentField.APPLICANTS]: {
    label: 'Applicants',
    value: applications?.totalCount
  },
  [JobContentField.TIMEZONE]: {
    label: 'Time Zone',
    value: getTimeZonePreference(
      timeZonePreference,
      hasPreferredHours,
      hoursOverlap
    )
  },
  [JobContentField.AV_REQUESTS]: {
    label: 'Av. Requests',
    value: availabilityRequests?.totalCount
  },
  [JobContentField.DESIRED_START]: {
    label: 'Desired Start',
    value: startDate ? parseAndFormatDate(startDate) : 'Not specified'
  },
  [JobContentField.CANDIDATES]: {
    label: 'Candidates',
    value: candidates?.totalCount
  },
  [JobContentField.COMMITMENT]: {
    label: 'Commitment',
    value: commitment ? capitalize(dasherize(commitment)) : 'Not specified'
  },
  [JobContentField.ASSIGNED_TALENT]: {
    label: 'Assigned Talent',
    value: assigned?.totalCount
  },
  [JobContentField.ESTIMATED_LENGTH]: {
    label: 'Estimated Length',
    value: estimatedLength
      ? ESTIMATED_LENGTH_MAPPING[estimatedLength]
      : 'Not specified'
  },
  [JobContentField.JOB_START_DATE]: {
    label: 'Job Start Date',
    value:
      currentEngagement?.nodes[0]?.startDate &&
      parseAndFormatDate(currentEngagement.nodes[0].startDate)
  },
  [JobContentField.RECRUITER]: {
    label: 'Recruiter',
    value: recruiter && (
      <LinkWrapper
        wrapWhen={Boolean(recruiter.webResource.url)}
        href={recruiter.webResource.url as string}
        target='_blank'
      >
        <TypographyOverflow color='inherit'>
          {recruiter.fullName}
        </TypographyOverflow>
      </LinkWrapper>
    )
  },
  [JobContentField.JOB_END_DATE]: {
    label: 'Job End Date',
    value: currentEngagement && getEndDate(currentEngagement)
  },
  [JobContentField.SALES_CLAIMER]: {
    label: 'Sales Claimer',
    value: claimer && (
      <LinkWrapper
        wrapWhen={Boolean(claimer.webResource.url)}
        href={claimer.webResource.url as string}
        target='_blank'
      >
        <TypographyOverflow color='inherit'>
          {claimer.webResource.text}
        </TypographyOverflow>
      </LinkWrapper>
    )
  },
  [JobContentField.LAST_BREAK]: {
    label: 'Last Break',
    value: breaks?.nodes && getLastBreak(breaks, timeZone)
  }
})
