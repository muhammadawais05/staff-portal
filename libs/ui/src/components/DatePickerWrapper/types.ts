import { Scalars } from '@staff-portal/graphql/staff'

export type DatePickerValue =
  | Scalars['Date']
  | [Scalars['Date'], Scalars['Date']]
  | null
