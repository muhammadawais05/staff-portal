import { Scalars } from '@staff-portal/graphql/staff'

export type DatePickerValue =
  | Scalars['Time']
  | [Scalars['Time'], Scalars['Time']]
  | null
