import { LeadSource } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

const LEAD_SOURCES = [
  LeadSource.OUTBOUND,
  LeadSource.INBOUND,
  LeadSource.EVENT,
  LeadSource.PARTNER
]

export const LEAD_SOURCE_ITEMS = LEAD_SOURCES.map(item => ({
  text: titleize(item),
  value: item
}))
