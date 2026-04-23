import {
  Maybe,
  NewEngagementWizardStep,
  TalentPitchInput
} from '@staff-portal/graphql/staff'
import { formatAmount } from '@staff-portal/string'

import {
  PitchStepEmailContextFragment,
  PitchStepTalentFragment,
  PitchStepIntroductionEmailFragment,
  PitchStepJobFragment,
  PitchStepNewEngagementFragment,
  PitchStepTalentPitchFragment
} from '../../../../data/get-pitch-step-data'
import { CandidateSendingStepAttributes } from '../../../../types'
import { DoNotSendEmailSenderValue } from '../../../../constants'

type InitialValuesData = {
  defaultPitchShowScheduleInterview: Maybe<boolean> | undefined
  engagementId: Maybe<string>
  introductionEmail:
    | Maybe<
        PitchStepEmailContextFragment['introductionEmail'] &
          PitchStepIntroductionEmailFragment
      >
    | undefined
  job: Maybe<PitchStepJobFragment> | undefined
  newEngagement: Maybe<PitchStepNewEngagementFragment> | undefined
  pitchEmailMessaging:
    | Maybe<PitchStepEmailContextFragment['pitchEmailMessaging']>
    | undefined
  talent: Maybe<PitchStepTalentFragment> | undefined
  talentPitch: Maybe<PitchStepTalentPitchFragment> | undefined
  pitchData?: TalentPitchInput | null
}

const getFormattedBillRate = ({
  type,
  rate,
  suffix
}: {
  type: string
  rate?: Maybe<string>
  suffix?: string
}) =>
  rate
    ? `${type} Rate: ${formatAmount(rate, 2)}${suffix ? `/${suffix}\n` : ''}`
    : ''

const getSenderId = ({
  engagementId,
  job,
  introductionEmail
}: Pick<InitialValuesData, 'engagementId' | 'job' | 'introductionEmail'>) => {
  if (engagementId) {
    return introductionEmail?.sender?.id ?? DoNotSendEmailSenderValue
  }

  if (job?.toptalProjects || job?.client?.enterprise) {
    return DoNotSendEmailSenderValue
  }

  return job?.claimer?.id ?? DoNotSendEmailSenderValue
}

const getCcSuggested = ({
  engagementId,
  introductionEmail,
  pitchEmailMessaging
}: Pick<
  InitialValuesData,
  'engagementId' | 'introductionEmail' | 'pitchEmailMessaging'
>) => {
  if (engagementId) {
    return introductionEmail?.carbonCopies ?? []
  }

  return pitchEmailMessaging?.emailCarbonCopyOptions.nodes
    .filter(({ default: isDefaultValue }) => isDefaultValue)
    .map(({ role }) => role.email)
}

const getCcAdditional = ({
  engagementId,
  introductionEmail,
  pitchEmailMessaging
}: Pick<
  InitialValuesData,
  'engagementId' | 'introductionEmail' | 'pitchEmailMessaging'
>) => {
  if (!engagementId) {
    return []
  }

  return introductionEmail?.carbonCopies
    .filter(ccEmail =>
      pitchEmailMessaging?.emailCarbonCopyOptions.nodes.every(
        ({ role }) => ccEmail !== role.email
      )
    )
    .map(value => ({ value, text: value }))
}

const getCcExternal = ({
  introductionEmail
}: Pick<InitialValuesData, 'introductionEmail'>) =>
  introductionEmail?.externalCarbonCopies.map(value => ({
    value,
    text: value
  })) ?? []

const getPitchText = ({
  talentPitch
}: Pick<InitialValuesData, 'talentPitch'>) => talentPitch?.pitchText ?? ''

const getContactDetailsText = ({ talent }: Pick<InitialValuesData, 'talent'>) =>
  'Profile: {{profile_link}}\n\n' +
  'Email: {{email_link}}\n' +
  (talent?.phoneNumber ? `Phone: ${talent.phoneNumber}\n` : '')

const getBillRateText = ({
  newEngagement
}: Pick<InitialValuesData, 'newEngagement'>) =>
  getFormattedBillRate({
    type: 'Hourly',
    rate: newEngagement?.companyHourlyRate,
    suffix: 'hour'
  }) +
  getFormattedBillRate({
    type: 'Part-Time',
    rate: newEngagement?.companyPartTimeRate,
    suffix: 'week'
  }) +
  getFormattedBillRate({
    type: 'Full-Time',
    rate: newEngagement?.companyFullTimeRate,
    suffix: 'week'
  })

const getInitialValues = ({
  defaultPitchShowScheduleInterview,
  engagementId,
  introductionEmail,
  job,
  newEngagement,
  pitchEmailMessaging,
  talent,
  talentPitch,
  pitchData
}: InitialValuesData): CandidateSendingStepAttributes<NewEngagementWizardStep.PITCH> => {
  const senderId = getSenderId({
    engagementId,
    job,
    introductionEmail
  })

  const title = pitchEmailMessaging?.defaultEmailTitle ?? undefined

  const to = pitchEmailMessaging?.defaultSendTo?.id

  const ccSuggested = getCcSuggested({
    engagementId,
    introductionEmail,
    pitchEmailMessaging
  })
  const ccAdditional = getCcAdditional({
    engagementId,
    introductionEmail,
    pitchEmailMessaging
  })
  const ccExternal = getCcExternal({ introductionEmail })

  const pitchText = getPitchText({
    talentPitch
  })

  const showScheduleInterview = defaultPitchShowScheduleInterview

  const showContactDetails = introductionEmail?.showContactDetails ?? true
  const contactDetailsText = getContactDetailsText({ talent })

  const showBillRate = introductionEmail?.showBillRate ?? true
  const billRateText = getBillRateText({ newEngagement })

  const showCustomClosing = introductionEmail?.showCustomClosing ?? true
  const customClosing = introductionEmail?.customClosing ?? ''

  return {
    senderId,

    title,

    to,

    ccSuggested,
    ccAdditional,
    ccExternal,

    pitchText,

    showScheduleInterview,

    showContactDetails,
    contactDetailsText,

    showBillRate,
    billRateText,

    showCustomClosing,
    customClosing,

    pitchData
  }
}

export default getInitialValues
