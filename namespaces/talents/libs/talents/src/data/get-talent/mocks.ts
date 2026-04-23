import { MockedResponse } from '@staff-portal/data-layer-service'

import { GET_TALENT } from './get-talent.staff.gql'
import {
  TalentFragment,
  GetTalentQueryVariables
} from './get-talent.staff.gql.types'

export const createTalentFragmentMock = ({
  id = 'VjEtVGFsZW50LTE4NTc0NTU',
  fullName = 'Jon Doe',
  suspended = false,
  type = 'ProjectManager',
  resumeUrl = 'https://domain.com/default/resume/url',
  casesUrl = 'https://domain.com/default/cases/url',
  sendToJobUrl = 'https://domain.com/send-to-job-url',
  profileEditorUrl = 'https://domain.com/profile-editor-url',
  emailMessagesUrl = 'https://domain.com/email-messages-url',
  referralsUrl = 'https://domain.com/referrals-url',
  gdprReportUrl = null,
  emailMessaging
}: Partial<TalentFragment>) => ({
  __typename: 'Talent',
  id,
  fullName,
  suspended,
  type,
  resumeUrl,
  casesUrl,
  sendToJobUrl,
  profileEditorUrl,
  emailMessagesUrl,
  referralsUrl,
  historyLink: {
    url: 'test link',
    __typename: 'Link'
  },
  contacts: {
    nodes: [],
    __typename: 'ContactConnection'
  },
  gdprReportUrl,
  payments: {
    totalCount: 0,
    __typename: 'TalentPaymentConnection'
  },
  otherVerticals: {
    nodes: [],
    __typename: 'TalentVerticalsConnection'
  },
  emailMessaging,
  operations: {
    updateTalentProfile: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    convertTalent: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    convertOnboardingTalent: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    removeTalent: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    reactivateTalent: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    processGdprRemovalTalent: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    setHealthStatusTalent: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    importTalentContract: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    resumeTalentApplication: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    restoreTalentActivation: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    removePaymentHold: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    createTalentAvailabilityRequest: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    createTalentInfraction: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    downloadRolePaymentHistory: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    createPaymentHold: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    applyTalentToAnotherVertical: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    pauseTalent: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    resetRejectedTalentApplication: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    restoreOnboardingTalent: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    convertToSourcingFlow: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    loginAs: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    passOnboardingTalentPrescreening: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    downloadTalentIpHistory: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    resumeTalent: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'OperationsConnection'
  },
  specializationApplications: {
    totalCount: 1,
    nodes: [
      {
        id: '234',
        operations: {
          id: '234',
          rejectSpecializationApplication: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          }
        }
      }
    ]
  }
})

export const createGetTalentMock = (
  talentFragment: Partial<TalentFragment>,
  { talentId }: Partial<GetTalentQueryVariables> = {
    talentId: 'VjEtVGFsZW50LTE4NTc0NTU'
  }
): MockedResponse => ({
  request: {
    query: GET_TALENT,
    variables: {
      talentId
    }
  },
  result: {
    data: {
      node: createTalentFragmentMock({ ...talentFragment, id: talentId })
    }
  }
})

export const createGetTalentFailedMock = ({
  talentId = 'VjEtVGFsZW50LTE4NTc0NTU'
}: Partial<GetTalentQueryVariables>): MockedResponse => ({
  request: {
    query: GET_TALENT,
    variables: { talentId }
  },
  error: new Error('Mocked Error')
})
