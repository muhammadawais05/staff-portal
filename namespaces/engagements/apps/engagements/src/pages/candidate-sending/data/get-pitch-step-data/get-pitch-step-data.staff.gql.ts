import { gql } from '@staff-portal/data-layer-service'
import { ROLE_RECIPIENT_FRAGMENT } from '@staff-portal/communication-send-email'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetPitchStepData($attributes: NewEngagementWizardAttributes!) {
    operations {
      buildTalentPitch {
        ...OperationFragment
      }
    }

    newEngagementWizard(step: PITCH, attributes: $attributes) {
      ...PitchStepDataFragment
    }
  }

  fragment PitchStepDataFragment on NewEngagementWizard {
    defaultPitchShowScheduleInterview
    isPitchTextEnabled

    introductionEmail {
      ...PitchStepIntroductionEmailFragment
    }

    draftStakeholder {
      id
    }

    newEngagement {
      ...PitchStepNewEngagementFragment
    }

    job {
      ...PitchStepJobFragment
    }

    talent {
      ...PitchStepTalentFragment
    }

    talentPitch {
      ...PitchStepTalentPitchFragment
    }

    pitchEmailMessaging {
      ...PitchStepPitchEmailMessagingFragment
    }

    ...PitchStepEmailContextFragment
  }

  fragment PitchStepJobFragment on Job {
    id

    client {
      id
      clientPartner {
        id
        fullName

        ... on WebResource {
          ...WebResourceFragment
        }
      }
      enterprise
      webResource {
        url
        text
      }
    }

    claimer {
      id
      fullName
    }

    toptalProjects

    ...WebResourceFragment
  }

  fragment PitchStepIntroductionEmailFragment on EngagementIntroductionEmail {
    customClosing
    sender {
      id
    }
    showBillRate
    showContactDetails
    showCustomClosing
  }

  fragment PitchStepNewEngagementFragment on NewEngagement {
    companyHourlyRate
    companyPartTimeRate
    companyFullTimeRate
    cumulativeStatus
    resumeUrl
    talentHourlyRate
    trialLength
  }

  fragment PitchStepTalentFragment on Talent {
    id
    fullName
    type
    phoneNumber

    photo {
      default
    }

    resumeUrl

    locationV2 {
      country {
        id
        name
      }
      cityName
    }

    topSkillTitle

    ...WebResourceFragment
  }

  fragment PitchStepTalentPitchFragment on TalentPitch {
    id
    createdAt
    pitchText
  }

  fragment PitchStepPitchEmailMessagingFragment on EmailMessagingNewEngagementWizardPitch {
    claimerSignOff
    clientPartnerSignOff
  }

  fragment PitchStepEmailContextFragment on NewEngagementWizard {
    isPitchTextEnabled
    introductionEmail {
      carbonCopies
      externalCarbonCopies
    }
    pitchEmailMessaging {
      claimerSignOff
      clientPartnerSignOff
      defaultEmailBody
      defaultEmailTitle
      defaultSendTo {
        id
        fullName
      }
      emailTemplate {
        id
        name
      }
      emailCarbonCopyOptions {
        nodes {
          label
          default
          role {
            id
            fullName
            email
          }
        }
      }
      optionsSendTo {
        nodes {
          ...RoleRecipientFragment
        }
      }
    }
  }

  ${ROLE_RECIPIENT_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
