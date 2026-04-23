import { WithdrawFeedbackReasonFragment } from '../../../WithdrawAvailabilityRequestModal/data/get-withdraw-availability-request-reasons'

const getOptions = (reasons?: WithdrawFeedbackReasonFragment[]) =>
  reasons?.map(({ nameForRole, id }) => ({ text: nameForRole, value: id })) ||
  []

export default getOptions
