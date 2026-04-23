import { SpecializationApplicationRejectionReasonValue } from '@staff-portal/graphql/staff'
import { REJECTION_REASON_MAPPING } from '@staff-portal/talents'

export const getReasonOrCommentText = ({
  comment,
  reason
}: {
  comment?: string | null
  reason: SpecializationApplicationRejectionReasonValue
}) => {
  if (
    reason === SpecializationApplicationRejectionReasonValue.OTHER &&
    comment !== 'Other'
  ) {
    return `Comment: ${comment}`
  }

  const reasonText = REJECTION_REASON_MAPPING[reason] || ''

  return reasonText && `Reason: ${reasonText}.`
}
