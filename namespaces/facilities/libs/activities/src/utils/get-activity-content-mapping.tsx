import React from 'react'
import { ActivityType, ActivityOutcome } from '@staff-portal/graphql/staff'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import { ActivityContentField } from '../enums'
import { ActivityFragment } from '../data'
import {
  ACTIVITY_SUBTYPE_TEXT_MAPPING,
  ActivitySubtype,
  ACTIVITY_TYPE_TEXT_MAPPING,
  ACTIVITY_OUTCOME_TEXT_MAPPING
} from '../config'
import ActivityContacts from '../components/ActivityContacts'

export const getActivityContentMapping = (
  {
    type,
    subtype,
    outcome,
    duration,
    occurredAt,
    activityContactRoles: { nodes: contacts }
  }: ActivityFragment,
  timeZone?: string
) => ({
  [ActivityContentField.ACTIVITY_DATE]: {
    label: 'Activity Date',
    value: occurredAt ? parseAndFormatDate(occurredAt, { timeZone }) : undefined
  },
  [ActivityContentField.ACTIVITY_SUB_TYPE]: {
    label: 'Activity Sub Type',
    value: ACTIVITY_SUBTYPE_TEXT_MAPPING[subtype as ActivitySubtype]
  },
  [ActivityContentField.ACTIVITY_TYPE]: {
    label: 'Activity Type',
    value: ACTIVITY_TYPE_TEXT_MAPPING[type as ActivityType]
  },
  [ActivityContentField.CONTACT]: {
    label: contacts.length > 1 ? 'Contacts' : 'Contact',
    value:
      contacts.length > 0 ? <ActivityContacts contacts={contacts} /> : undefined
  },
  [ActivityContentField.OUTCOME]: {
    label: 'Outcome',
    value: ACTIVITY_OUTCOME_TEXT_MAPPING[outcome as ActivityOutcome]
  },
  [ActivityContentField.DURATION]: {
    label: 'Duration',
    value: duration ? `${duration} minutes` : undefined
  }
})
