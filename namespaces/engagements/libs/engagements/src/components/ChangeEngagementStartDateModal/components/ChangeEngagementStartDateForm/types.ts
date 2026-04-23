import { Scalars } from '@staff-portal/graphql/staff'

export type FormValues = {
  comment: string
  startDate: Scalars['Date'] | null
  timeZoneName: string
}
