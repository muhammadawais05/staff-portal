import pluralize from 'pluralize'
import { ColorType } from '@toptal/picasso'
import { NegotiationStatus } from '@staff-portal/graphql/staff'
import { NEGOTIATION_STATUS_TEXT_MAPPING } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyOverviewFragment } from '../../AccountOverviewSection/data/company-overview-fragment.staff.gql.types'

const NEGOTIATION_STATUS_COLOR_MAPPING: Record<NegotiationStatus, ColorType> = {
  [NegotiationStatus.SIGNED]: 'green',
  [NegotiationStatus.WAITING_ON_TOPTAL]: 'red',
  [NegotiationStatus.WAITING_ON_CLIENT]: 'yellow',
  [NegotiationStatus.FINISHED_NOT_SIGNED]: 'green'
}

export const getCompanyNegotiationStatusColor = (
  status: NegotiationStatus | undefined
) => (status ? NEGOTIATION_STATUS_COLOR_MAPPING[status] : 'dark-grey')

export const getCompanyNegotiationStatusText = (
  value: Partial<CompanyOverviewFragment['currentNegotiation']>
) => {
  const { status, negotiationDays, rounds } = value || {}

  if (!status) {
    return NO_VALUE
  }

  const statusText = NEGOTIATION_STATUS_TEXT_MAPPING[status]

  if (typeof negotiationDays === 'number' && rounds) {
    return `${statusText} (round: #${rounds}, ${negotiationDays} ${pluralize(
      'day',
      negotiationDays
    )})`
  }

  return statusText
}
