import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '../../hidden-operation-mock'

export const getPitchStepDataResponse = () => ({
  data: {
    operations: {
      buildTalentPitch: hiddenOperationMock()
    },
    newEngagementWizard: {
      defaultPitchShowScheduleInterview: false,
      introductionEmail: {
        customClosing: null,
        sender: null,
        showBillRate: null,
        showContactDetails: null,
        showCustomClosing: null,
        __typename: 'EngagementIntroductionEmail',
        carbonCopies: [],
        externalCarbonCopies: []
      },
      draftStakeholder: {
        id: encodeEntityId('123', 'Staff'),
        __typename: 'Staff'
      },
      newEngagement: {
        companyHourlyRate: '85.0',
        companyPartTimeRate: '1700.0',
        companyFullTimeRate: '3400.0',
        cumulativeStatus: 'pending',
        resumeUrl:
          'https://platform-57257-spt-2610-temporary-enable-feedback.toptal.rocks/resume/obfuscated_slug_1699997',
        talentHourlyRate: '60.0',
        trialLength: 3,
        __typename: 'NewEngagement'
      },
      job: {
        id: encodeEntityId('123', 'Job'),
        client: {
          id: encodeEntityId('123', 'Client'),
          clientPartner: {
            id: encodeEntityId('123', 'Staff'),
            fullName: 'Prashanth Modi',
            webResource: {
              text: 'Prashanth Modi',
              url: 'https://platform-57257-spt-2610-temporary-enable-feedback.toptal.rocks/platform/staff/staff/1619763',
              __typename: 'Link'
            },
            __typename: 'Staff'
          },
          enterprise: true,
          webResource: {
            url: 'https://platform-57257-spt-2610-temporary-enable-feedback.toptal.rocks/platform/staff/companies/2590196',
            text: 'Kautzer, Torphy and Jewess',
            __typename: 'Link'
          },
          __typename: 'Client'
        },
        claimer: {
          id: encodeEntityId('124', 'Staff'),
          fullName: 'Ricardo Wynter',
          __typename: 'Staff'
        },
        toptalProjects: false,
        webResource: {
          text: 'Principal Digital Imaging Developer (290624)',
          url: 'https://platform-57257-spt-2610-temporary-enable-feedback.toptal.rocks/platform/staff/jobs/290624',
          __typename: 'Link'
        },
        __typename: 'Job'
      },
      talent: {
        id: encodeEntityId('123', 'Talent'),
        fullName: 'Valrie McCullough',
        type: 'Developer',
        phoneNumber: '+923025181384',
        photo: null,
        resumeUrl:
          'https://platform-57257-spt-2610-temporary-enable-feedback.toptal.rocks/resume/obfuscated_slug_1699997',
        locationV2: {
          country: {
            id: 'VjEtQ291bnRyeS0xNjc',
            name: 'Pakistan',
            __typename: 'Country'
          },
          cityName: 'Rawalpindi',
          __typename: 'Location'
        },
        topSkillTitle: 'Full-stack Web Developer',
        webResource: {
          text: 'Valrie McCullough',
          url: 'https://platform-57257-spt-2610-temporary-enable-feedback.toptal.rocks/platform/staff/talents/2881562',
          __typename: 'Link'
        },
        __typename: 'Talent'
      },
      talentPitch: {
        id: encodeEntityId('123', 'TalentPitch'),
        pitchText: 'This part was obfuscated, some content was here.',
        __typename: 'TalentPitch'
      },
      pitchEmailMessaging: {
        claimerSignOff: 'claimer sign off info',
        clientPartnerSignOff: 'client partner sign off info',
        __typename: 'EmailMessagingNewEngagementWizardPitch',
        defaultEmailBody:
          '\n{{ pitch_text_with_spaces }}\n{{ talent_card_with_spaces }}\n\n\n',
        defaultEmailTitle:
          'Please schedule an interview with Valrie McCullough',
        defaultSendTo: {
          id: encodeEntityId('123', 'CompanyRepresentative'),
          fullName: 'Walter Reynolds',
          __typename: 'CompanyRepresentative'
        },
        emailTemplate: {
          id: 'VjEtRW1haWxUZW1wbGF0ZS0xMjI4NDQ',
          name: 'Introducing talent to company',
          __typename: 'EmailTemplate'
        },
        emailCarbonCopyOptions: {
          nodes: [
            {
              label: 'Client Partner',
              default: true,
              role: {
                id: encodeEntityId('123', 'Staff'),
                fullName: 'Prashanth Modi',
                email: 'pras-b61bf1777ec16129@toptal.io',
                __typename: 'Staff'
              },
              __typename: 'EmailCarbonCopyOption'
            }
          ],
          __typename: 'EmailCarbonCopyOptionConnection'
        },
        optionsSendTo: {
          nodes: [
            {
              id: encodeEntityId('123', 'CompanyRepresentative'),
              fullName: 'Walter Reynolds',
              email: 'kchr-eeaa8cb9d0b27042@toptal.io',
              contacts: {
                nodes: [
                  {
                    id: encodeEntityId('123', 'Contact'),
                    value: 'kchr-eeaa8cb9d0b27042@toptal.io',
                    __typename: 'Contact'
                  }
                ],
                __typename: 'ContactConnection'
              },
              __typename: 'CompanyRepresentative'
            }
          ],
          __typename: 'EmailMessagingOptionsSendToConnection'
        }
      },
      __typename: 'NewEngagementWizard'
    }
  }
})
