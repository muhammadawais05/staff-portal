import { Operation, Scalars } from '@staff-portal/graphql/staff'

import { ActivationTypes } from './config'

export type Deadline = {
  id: string
  label: string
  date: Scalars['Time']
  operation: Operation
  type: ActivationTypes
}
