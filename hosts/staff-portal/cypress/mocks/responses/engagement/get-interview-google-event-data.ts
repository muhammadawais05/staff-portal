import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind,
  InterviewType
} from '@staff-portal/graphql/staff'

export const getInterviewGoogleEventData = () => ({
  data: {
    node: {
      __typename: 'Interview',
      id: encodeEntityId('123', 'Interview'),
      initiator: InterviewInitiator.INTERVIEWER,
      interviewType: InterviewType.GENERAL,
      kind: InterviewKind.EXTERNAL,
      communication: InterviewCommunicationType.BLUEJEANS,
      lockVersion: 5,
      schedulingComment: '',
      disableCompanyNotifications: false,
      preferredDuration: null,
      availableContacts: {
        nodes: [
          {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTMwMzI0OTU',
            webResource: {
              text: 'Doreatha Pollich',
              url: 'https://staging.toptal.net/platform/staff/company_representatives/3032495',
              __typename: 'Link'
            },
            __typename: 'CompanyRepresentative',
            fullName: 'Doreatha Pollich'
          }
        ],
        __typename: 'RoleOrClientConnection'
      },
      interviewContacts: {
        edges: [
          {
            main: true,
            node: {
              id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTMwMzI0OTU',
              webResource: {
                text: 'Doreatha Pollich',
                url: 'https://staging.toptal.net/platform/staff/company_representatives/3032495',
                __typename: 'Link'
              },
              __typename: 'CompanyRepresentative',
              fullName: 'Doreatha Pollich'
            },
            __typename: 'InterviewContactEdge'
          }
        ],
        __typename: 'InterviewContactsConnection'
      },
      timeZone: {
        name: '(UTC-05:00) America - New York',
        value: 'America/New_York',
        __typename: 'TimeZone'
      },
      engagement: {
        id: 'VjEtRW5nYWdlbWVudC0yOTAwNTI',
        job: {
          id: 'VjEtSm9iLTI3MzA3OA',
          title: 'Senior  Finance Expert (273078)',
          claimer: {
            id: 'VjEtU3RhZmYtMjk5MjcyNQ',
            fullName: 'Agustín Lipsich',
            phoneNumber: '+5491159609072',
            email: 'agus-4c2d7685afef6974@toptal.io',
            skype: 'agustin.lipsich',
            __typename: 'Staff'
          },
          __typename: 'Job'
        },
        client: {
          id: 'VjEtQ2xpZW50LTU5MTU2OA',
          fullName: 'Parker, Heidenreich and Connelly',
          enterprise: false,
          timeZone: {
            name: '(UTC-05:00) America - New York',
            value: 'America/New_York',
            __typename: 'TimeZone'
          },
          contact: {
            id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTMwMzI0OTU',
            phoneNumber: '+17025571727',
            __typename: 'CompanyRepresentative'
          },
          emailCarbonCopyOptions: {
            nodes: [
              {
                default: false,
                label: 'Sales Claimer',
                role: {
                  id: 'VjEtU3RhZmYtMjY1NDQ1Mw',
                  email: 'dan.-37b50af0e7820cc4@toptal.io',
                  fullName: 'Dan Carr',
                  __typename: 'Staff'
                },
                __typename: 'EmailCarbonCopyOption'
              }
            ],
            __typename: 'EmailCarbonCopyOptionConnection'
          },
          __typename: 'Client'
        },
        talent: {
          id: 'VjEtVGFsZW50LTEzNDY3NDk',
          fullName: 'Danyell Walker',
          skype: 'danyell_walker1264169',
          phoneNumber: '+919899791372',
          toptalEmail: 'same-a89d93ebd2b17ec7@toptal.io',
          __typename: 'Talent'
        },
        __typename: 'Engagement'
      },
      googleCalendarEvent: {
        attendees: ['same-a89d93ebd2b17ec7@toptal.io'],
        description: 'Interview with Danyell Walker for Senior  Finance Expert',
        summary:
          'Toptal Interview with Danyell Walker for Senior  Finance Expert (273078)',
        __typename: 'GoogleCalendarEvent'
      }
    }
  }
})
