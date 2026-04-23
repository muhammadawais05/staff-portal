import {
  RescheduleEngagementBreakInput,
  Scalars,
  ScheduleEngagementBreakInput
} from '@staff-portal/graphql/staff'

import { EngagementBreakFragment } from '../EngagementBreaks/data/get-engagement-breaks'

export enum BreakType {
  MULTI,
  SINGLE
}

export type FormValues = {
  startDate?: Scalars['Time']
  endDate?: Scalars['Time']
  reasonId?: string
  comment?: string
  messageToClient?: string
}

export type EngagementBreakInitialValues = Pick<
  EngagementBreakFragment,
  'startDate' | 'endDate' | 'messageToClient'
>

export enum ScheduleType {
  CREATE,
  EDIT
}

export type CommonScheduleMutationsType = ScheduleEngagementBreakInput &
  RescheduleEngagementBreakInput
