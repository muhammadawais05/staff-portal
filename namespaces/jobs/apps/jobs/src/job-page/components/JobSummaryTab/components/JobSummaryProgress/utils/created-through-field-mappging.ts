import { JobCreatedThrough } from '@staff-portal/graphql/staff'

export const CREATED_THROUGH_MAPPING = {
  [JobCreatedThrough.CLIENT_PORTAL]: 'Through Client Portal',
  [JobCreatedThrough.PLATFORM]: 'Directly in Platform',
  [JobCreatedThrough.ISR_CALL]: 'Call with ISR',
  [JobCreatedThrough.HEADSTART]: 'Headstart Experience'
}
