import React, { ReactNode } from 'react'
import { Typography, Tooltip } from '@toptal/picasso'
import { capitalize } from '@toptal/picasso/utils'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { useUserTimeZone } from '@staff-portal/current-user'
import {
  ASSIGNMENT_ARCHIVE_REASONS,
  SpecialistAssignmentArchivingFragment,
  SpecialistAssignmentFragment
} from '@staff-portal/talents-screening-specialists'

const findArchivingReasonOption = (reason: string) =>
  ASSIGNMENT_ARCHIVE_REASONS.find(
    option => option.value === reason.toUpperCase()
  )

const TooltipMessage = ({
  archiving,
  assigneeName
}: {
  archiving: SpecialistAssignmentArchivingFragment
  assigneeName?: string
}) => {
  const reason = archiving.reason
  const reasonOption = findArchivingReasonOption(reason)
  const formattedArchivingReason = reasonOption
    ? reasonOption.text
    : capitalize(reason.replace(/_/g, ' '))
  const formattedArchiver = reasonOption ? assigneeName : 'System'
  const formattedTime = parseAndFormatDate(archiving.createdAt, {
    timeZone: useUserTimeZone()
  })

  return (
    <>
      <Typography invert>
        Archiving reason: {formattedArchivingReason}
      </Typography>
      <Typography invert>Archived by: {formattedArchiver}</Typography>
      <Typography invert>Archived on: {formattedTime}</Typography>
    </>
  )
}

const StatusContentWrapper = ({
  specialistAssignment,
  children
}: {
  specialistAssignment?: SpecialistAssignmentFragment | null
  children?: ReactNode
}) => {
  const archiving = specialistAssignment?.archiving
  const assignee = specialistAssignment?.assignee
  const tooltipMessage = archiving && (
    <TooltipMessage archiving={archiving} assigneeName={assignee?.fullName} />
  )

  return (
    <Tooltip content={tooltipMessage} disableListeners={!tooltipMessage}>
      <span>{children}</span>
    </Tooltip>
  )
}

export default StatusContentWrapper
