import { Option } from '@toptal/picasso/Select'

import { StaffUserFragment } from '../../data'
import { getOptionsWithSelectedOptionDisabled } from '../index'

interface Props {
  staffOptions: Option[]
  currentValue: Partial<StaffUserFragment> | undefined | null
  isSelectedOptionDisabled?: boolean
}

export const getStaffSelectOptions = ({
  staffOptions,
  currentValue,
  isSelectedOptionDisabled = false
}: Props) => {
  if (!staffOptions.length) {
    return staffOptions
  }

  const assignee = {
    text: currentValue?.fullName || '',
    value: currentValue?.id || ''
  }
  const staffIds = staffOptions.map(({ value: val }) => val)
  const assigneeAvailable = assignee.value && staffIds.includes(assignee.value)

  const options = !assigneeAvailable
    ? [assignee, ...staffOptions]
    : staffOptions || []

  return isSelectedOptionDisabled || !assigneeAvailable
    ? getOptionsWithSelectedOptionDisabled({
        options,
        selectedValue: assignee.value
      })
    : options
}
