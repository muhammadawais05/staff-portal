import { SortOption, SortOrder } from '@staff-portal/filters'
import { SourcingRequestOrderField } from '@staff-portal/graphql/staff'

export const getSortOptions = (): SortOption[] => [
  {
    text: 'Creation Time',
    value: SourcingRequestOrderField.CREATED_AT,
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Claim Time',
    value: SourcingRequestOrderField.CLAIMED_AT,
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Title',
    value: SourcingRequestOrderField.TITLE,
    defaultSort: SortOrder.ASC
  }
]
