import { ActionItem } from '../../../utils'

export const getActionsDropdownItemKey = ({ key, label }: ActionItem) =>
  key || label.replace(/\s/g, '')
