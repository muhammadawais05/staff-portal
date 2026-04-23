import { ColorType } from '@toptal/picasso'
import {
  TalentAllocatedHoursAvailability,
  Maybe
} from '@staff-portal/graphql/staff'
import { getRoleTypeText } from '@staff-portal/facilities'

import {
  TALENT_AVAILABILITY_STATUS_MAPPING,
  TALENT_AVAILABILITY_STATUS_COMPACT_MAPPING,
  TALENT_AVAILABILITY_COLOR_MAPPING
} from '../'
import { AvailabilityStatusMode } from '../../types'

type TalentAvailabilityData = {
  type: string
  roleTitle: string
  allocatedHoursAvailability?: Maybe<TalentAllocatedHoursAvailability>
  availableHours: number
  allocatedHours?: Maybe<number>
  allocatedHoursConfirmedAt?: Maybe<string>
}

const buildAvailabilityStatusText = (parts: Maybe<string | undefined>[]) =>
  parts.filter(Boolean).join(' ')

export const getTalentAvailabilityStatusSettings = (
  talentAvailability: Omit<TalentAvailabilityData, 'availableHours'> & {
    availableHours?: number | null
  },
  mode: AvailabilityStatusMode = 'default',
  options?: {
    hideAllocatedHours?: boolean
    hideRoleName?: boolean
  }
) => {
  const { type, roleTitle, allocatedHours, allocatedHoursAvailability } =
    talentAvailability
  const { hideAllocatedHours = false, hideRoleName = false } = options || {}

  const availableHours = talentAvailability.availableHours ?? 0
  const allocatedHoursValue = hideAllocatedHours
    ? ''
    : mode === 'compact'
    ? `/${allocatedHours}`
    : ` / ${allocatedHours}`

  const roleName = !hideRoleName
    ? getRoleTypeText(type, { roleTitle })
    : undefined
  const availabilityStatus = allocatedHoursAvailability
    ? TALENT_AVAILABILITY_STATUS_MAPPING[allocatedHoursAvailability]
    : null
  const compactAvailabilityStatus = allocatedHoursAvailability
    ? TALENT_AVAILABILITY_STATUS_COMPACT_MAPPING[allocatedHoursAvailability]
    : null

  const compactStatusText = buildAvailabilityStatusText([
    compactAvailabilityStatus,
    `(${availableHours}${allocatedHoursValue})`
  ])
  const compactStatusTextTooltip = buildAvailabilityStatusText([
    roleName,
    compactAvailabilityStatus,
    `(${availableHours}${allocatedHoursValue})`
  ])
  const defaultStatusText = buildAvailabilityStatusText([
    roleName,
    availabilityStatus,
    `(${availableHours}${allocatedHoursValue} hours)`
  ])

  const availabilityStatusColor: ColorType = allocatedHoursAvailability
    ? TALENT_AVAILABILITY_COLOR_MAPPING[allocatedHoursAvailability]
    : 'inherit'

  const statusTextMap: Record<AvailabilityStatusMode, string> = {
    default: defaultStatusText,
    detailed: defaultStatusText,
    compact: compactStatusText
  }

  return {
    text: statusTextMap[mode],
    tooltipText: mode === 'compact' ? compactStatusTextTooltip : null,
    color: availabilityStatusColor
  }
}
