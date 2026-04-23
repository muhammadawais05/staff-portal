import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'

export const getTalentResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      type: 'Developer',
      suspended: false,
      resumeUrl: 'https://staging.toptal.net/resume/internal/3012798',
      casesUrl: 'https://staging.toptal.net/platform/staff/roles/3012798/cases',
      sendToJobUrl: null,
      profileEditorUrl:
        'https://talent.toptal.net/profile/VjEtUHJvZmlsZS0xNTM4NDI5',
      emailMessagesUrl:
        'https://staging.toptal.net/platform/staff/talents/3012798/email_messages',
      referralsUrl:
        'https://staging.toptal.net/platform/staff/talents/3012798/referrals',
      applicationManualRestorationAvailable: false,
      eligibleForAutomaticRestore: true,
      paymentsHoldDescription: null,
      contacts: {
        nodes: [],
        __typename: 'ContactConnection'
      },
      gdprReportUrl:
        'https://staging.toptal.net/platform/gdpr_report?user_id=2919047',
      historyLink: {
        url: '/platform/staff/talents/3012798/performed_actions/recent',
        __typename: 'Link'
      },
      payments: {
        totalCount: 0,
        __typename: 'TalentPaymentConnection'
      },
      otherVerticals: {
        nodes: [],
        __typename: 'VerticalConnection'
      },
      operations: getTalentOperations(),
      emailMessaging: {
        id: 'VjEtRW1haWxNZXNzYWdpbmdSb2xlLTMwMTI3OTg',
        operations: {
          sendEmailTo: enabledOperationMock(),
          __typename: 'EmailMessagingOperation'
        },
        __typename: 'EmailMessagingRole'
      },
      specializationApplications: {
        nodes: [],
        __typename: 'SpecializationApplicationConnection'
      },
      screeningRoleSteps: {
        nodes: [],
        __typename: 'TalentScreeningRoleStepConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
