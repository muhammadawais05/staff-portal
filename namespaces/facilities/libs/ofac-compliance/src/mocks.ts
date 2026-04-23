import {
  ClientCumulativeStatus,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'

import { CompanyStatusTextMapping, TalentStatusMapping } from './types'

export const companyStatusTextMappingMock = {
  [ClientCumulativeStatus.PENDING_TOS]: 'Pending TOS',
  [ClientCumulativeStatus.REJECTED]: 'Deleted',
  [ClientCumulativeStatus.SOURCED]: 'Sourced'
} as CompanyStatusTextMapping

export const talentStatusMappingMock = {
  [TalentCumulativeStatus.ACTIVE]: { text: 'Active', color: 'green' },
  [TalentCumulativeStatus.APPLIED]: { text: 'Applied', color: 'yellow' },
  [TalentCumulativeStatus.IN_ONBOARDING]: {
    text: 'In onboarding',
    color: 'yellow'
  }
} as TalentStatusMapping
