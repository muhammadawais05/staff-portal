import { Investigation } from '@staff-portal/graphql/staff'

export type CurrentInvestigation = Pick<Investigation, 'id' | 'startedAt'>
