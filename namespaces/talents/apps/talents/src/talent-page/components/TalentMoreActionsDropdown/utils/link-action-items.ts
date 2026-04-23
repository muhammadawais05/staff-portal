import {
  ActionItemLink,
  ActionItemUrl,
  DropdownActionType
} from '@staff-portal/facilities'

export const linkActionItem = (
  label: string,
  url?: ActionItemUrl | null,
  newWindow?: boolean
): ActionItemLink => ({
  label,
  type: DropdownActionType.LINK,
  newWindow,
  url
})
