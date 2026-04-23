import { FormValues } from '../../CandidateSendingFeedbackStepForm'
import getFilteredInternalFeedback from '../get-filtered-internal-feedback/get-filtered-internal-feedback'

export type Props = FormValues

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getIsFormDirty = ({ rejectedApplications, ...values }: Props) => {
  for (const [, value] of Object.entries(values)) {
    const { internalFeedback, feedback } = value

    if (feedback?.trim().length) {
      return true
    }

    const filteredInternalFeedback = getFilteredInternalFeedback({
      internalFeedback
    })

    if (filteredInternalFeedback?.length) {
      return true
    }
  }

  return false
}

export default getIsFormDirty
