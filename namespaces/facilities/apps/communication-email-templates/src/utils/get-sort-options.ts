import { SortOption, SortOrder } from '@staff-portal/filters'
import { EmailTemplateOrderField } from '@staff-portal/graphql/staff'

export const getSortOptions = (): SortOption[] => [
  {
    text: 'Created by',
    value: EmailTemplateOrderField.ROLE_FULL_NAME.toLowerCase()
  },
  {
    text: 'Title',
    value: EmailTemplateOrderField.NAME.toLowerCase(),
    defaultSort: SortOrder.ASC
  }
]
