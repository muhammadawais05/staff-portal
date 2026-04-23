import { SortOption, SortOrder } from '@staff-portal/filters'
import { StaffOrderField } from '@staff-portal/graphql/staff'

const getSortOptions = (): SortOption[] => [
  {
    text: 'Application Date',
    value: StaffOrderField.CREATED_AT,
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Last Login',
    value: StaffOrderField.LAST_LOGIN
  },
  {
    text: 'Last Edited',
    value: StaffOrderField.LAST_EDITED
  },
  {
    text: 'Name',
    value: StaffOrderField.NAME
  }
]

export default getSortOptions
