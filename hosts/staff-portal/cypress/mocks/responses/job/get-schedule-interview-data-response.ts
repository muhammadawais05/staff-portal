import { Engagement } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'

export const getScheduleInterviewDataResponse = (
  engagement?: Partial<Engagement>
) => ({
  data: {
    node: {
      id: 'VjEtRW5nYWdlbWVudC0yOTMzNjI',
      job: {
        id: 'VjEtSm9iLTI2NjA2OA',
        title: 'Senior  Project Manager (266068)',
        claimer: {
          id: 'VjEtU3RhZmYtMjUxMTMxNg',
          fullName: 'Phillis Torp',
          phoneNumber: '+5493516631825',
          email: 'caro-7e8cd349713c264e@toptal.io',
          skype: null,
          __typename: 'Staff'
        },
        __typename: 'Job'
      },
      client: {
        id: 'VjEtQ2xpZW50LTQ5NjcwMg',
        fullName: 'Predovic-Zieme DK',
        enterprise: true,
        timeZone: {
          name: '(UTC+00:00) Europe - London',
          value: 'Europe/London',
          __typename: 'TimeZone'
        },
        contact: {
          id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzNDM2Mzg',
          phoneNumber: '+966552381400',
          __typename: 'CompanyRepresentative'
        },
        emailCarbonCopyOptions: {
          nodes: [
            {
              default: false,
              label: 'Additional contact',
              role: {
                id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzNDM2NDI',
                email: 'jon.-4fcbddba69b5c44b@toptal.io',
                fullName: 'Sueann Moore',
                __typename: 'CompanyRepresentative'
              },
              __typename: 'EmailCarbonCopyOption'
            },
            {
              default: false,
              label: 'Company Talent Director',
              role: {
                id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzNDM2Mzg',
                email: 'jami-87c9dd39a29ecc64@toptal.io',
                fullName: 'Erin Volkman',
                __typename: 'CompanyRepresentative'
              },
              __typename: 'EmailCarbonCopyOption'
            }
          ],
          __typename: 'EmailCarbonCopyOptionConnection'
        },
        __typename: 'Client'
      },
      talent: {
        id: 'VjEtVGFsZW50LTIwNjMxMjk',
        fullName: 'Roxana Roob',
        skype: 'roxana_roob1975846',
        phoneNumber: '+40722381589',
        toptalEmail: 'paul-fd05eea19554d917@toptal.io',
        __typename: 'Talent'
      },
      ...engagement,
      __typename: 'Engagement',
      newExternalInterview: {
        id: 'VjEtSW50ZXJ2aWV3LXZpcnR1YWxfZW5nYWdlbWVudF9pZD0yOTMzNjIma2luZD1leHRlcm5hbA',
        initiator: null,
        interviewType: null,
        kind: 'EXTERNAL',
        communication: null,
        lockVersion: 0,
        schedulingComment: null,
        disableCompanyNotifications: false,
        preferredDuration: null,
        availableContacts: {
          nodes: [
            {
              id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzNDM2Mzg',
              webResource: {
                text: 'Erin Volkman',
                url: 'https://staging.toptal.net/platform/staff/company_representatives/2343638',
                __typename: 'Link'
              },
              __typename: 'CompanyRepresentative',
              fullName: 'Erin Volkman'
            },
            {
              id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIzNDM2NDI',
              webResource: {
                text: 'Sueann Moore',
                url: 'https://staging.toptal.net/platform/staff/company_representatives/2343642',
                __typename: 'Link'
              },
              __typename: 'CompanyRepresentative',
              fullName: 'Sueann Moore'
            }
          ],
          __typename: 'RoleOrClientConnection'
        },
        interviewContacts: {
          edges: [],
          __typename: 'InterviewContactsConnection'
        },
        timeZone: null,
        __typename: 'Interview',
        operations: {
          scheduleSingleCommitInterview: enabledOperationMock(),
          __typename: 'InterviewOperations'
        }
      }
    },
    experiments: {}
  }
})
