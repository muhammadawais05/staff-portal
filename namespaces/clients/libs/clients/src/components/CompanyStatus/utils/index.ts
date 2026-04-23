import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { getInvestigationTooltip } from '@staff-portal/facilities'

import {
  COMPANY_STATUS_COLOR_MAPPING,
  COMPANY_STATUS_TEXT_MAPPING
} from '../../../config'
import { CompanyStatusInput } from '../types'

export const getCompanyVerboseStatus = (
  cumulativeStatus: ClientCumulativeStatus
) =>
  COMPANY_STATUS_TEXT_MAPPING[cumulativeStatus] ??
  titleize(cumulativeStatus, { capitalizeAllWords: false })

export const getCompanyStatusColor = ({
  investigations,
  cumulativeStatus
}: {
  cumulativeStatus: ClientCumulativeStatus
  investigations: CompanyStatusInput['investigations']
}) =>
  investigations?.nodes[0]?.startedAt
    ? 'red'
    : COMPANY_STATUS_COLOR_MAPPING[cumulativeStatus]

export const getCompanyTooltip = (
  investigations: CompanyStatusInput['investigations']
) => {
  const date = investigations?.nodes[0]?.startedAt

  return date ? getInvestigationTooltip(date) : undefined
}
