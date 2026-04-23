import { Investigation } from '@staff-portal/graphql/staff'

export type CustomRequirements = {
  backgroundCheck?: boolean | null
  drugTest?: boolean | null
  timeTrackingTools?: boolean | null
}

export type TalentInvestigation = Pick<
  Investigation,
  'id' | 'startedAt' | 'resolvedAt'
>

export type { AvailabilityStatusMode } from './availability-status-mode'

export interface AvailabilityRequestInitialJobData {
  jobId: string
  client: {
    id: string
    fullName: string
  }
}

export enum TabsCountersScope {
  TalentProfile = 'TalentProfile'
}
