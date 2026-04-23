import { Maybe } from '@staff-portal/graphql/staff'

import { CallRequestStatus } from '../enums'

export const DEFAULT_STATUS_COLOR = 'red'
export const CLAIMED_STATUS_COLOR = 'green'

const getStatusColor = (status?: Maybe<string>) =>
  status === CallRequestStatus.CLAIMED
    ? CLAIMED_STATUS_COLOR
    : DEFAULT_STATUS_COLOR

export default getStatusColor
