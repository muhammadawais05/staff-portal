import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import { CandidateSendingStepAttributes } from '../../types'
import { DoNotSendEmailSenderValue } from '../../constants'

const adjustPitchStepFormValues = ({
  billRateText,
  ccAdditional,
  ccExternal,
  ccSuggested,
  contactDetailsText,
  customClosing,
  pitchText,
  senderId,
  showBillRate,
  showContactDetails,
  showCustomClosing,
  showScheduleInterview,
  title,
  to,
  ...restStepAttributes
}: NonNullable<
  CandidateSendingStepAttributes<NewEngagementWizardStep.PITCH>
>) => {
  const cc = [
    ...(ccSuggested ?? []),
    ...(ccAdditional
      ?.map(({ value }) => value)
      .filter((value): value is string => !!value) ?? [])
  ]
  const externalCc = ccExternal?.length
    ? ccExternal
        .map(({ value }) => value)
        .filter((value): value is string => !!value)
    : undefined

  return {
    ...restStepAttributes,
    noEmail: senderId === DoNotSendEmailSenderValue,
    ...(senderId !== DoNotSendEmailSenderValue && {
      cc: cc.length ? cc : undefined,
      externalCc: externalCc?.length ? externalCc : undefined,
      contactId: to,
      title,
      senderId,
      pitchText,
      showBillRate,
      ...(showBillRate && { billRateText }),
      showContactDetails,
      ...(showContactDetails && { contactDetailsText }),
      showCustomClosing,
      ...(showCustomClosing && { customClosing }),
      showScheduleInterview
    })
  }
}

export default adjustPitchStepFormValues
