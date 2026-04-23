import { WithdrawFeedbackReasonFragment } from '../../../WithdrawAvailabilityRequestModal/data/get-withdraw-availability-request-reasons'

export const getDefaultComment = (
  reasons: WithdrawFeedbackReasonFragment[],
  selectedId: string
) => reasons.filter(({ id }) => id === selectedId)[0].defaultComment

export default getDefaultComment
