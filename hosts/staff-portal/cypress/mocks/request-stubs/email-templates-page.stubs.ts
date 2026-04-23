import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  getEmailContactsResponse,
  getPendoVisitorResponse,
  getTeamsWithEmailTrackingResponse
} from '../responses'

export const emailTemplatesPageStubs = {
  GetUnfilledCallsCount: {
    data: {
      viewer: {
        calls: {
          totalCount: 0,
          __typename: 'CallsConnection'
        },
        __typename: 'Viewer'
      }
    }
  },
  TouchCounter: {
    data: {
      touchCounter: {
        success: true,
        errors: [],
        __typename: 'TouchCounterPayload',
        counter: {
          name: 'talent_applicants',
          total: 10000,
          unread: 0,
          __typename: 'Counter'
        }
      }
    }
  },
  GetEmailTemplatesList: {
    data: {
      operations: {
        createEmailTemplate: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'QueryOperations'
      },
      emailTemplates: {
        nodes: [
          {
            id: encodeEntityId('123', 'EmailTemplate'),
            name: 'Deletion Request Duplicate - Permaban',
            role: {
              id: encodeEntityId('123', 'Staff'),
              fullName: 'Zaira Angelo',
              webResource: {
                text: 'Zaira Angelo',
                url: 'https://staging.toptal.net/platform/staff/staff/1535831',
                __typename: 'Link'
              },
              __typename: 'Staff'
            },
            private: false,
            topscreenClient: null,
            targetRole: {
              title: 'Talent',
              value: 'Talent',
              __typename: 'EmailTemplateTargetRole'
            },
            operations: {
              copyEmailTemplate: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              destroyEmailTemplate: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              updateEmailTemplate: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'EmailTemplateOperations'
            },
            __typename: 'EmailTemplate'
          }
        ],
        totalCount: 2
      }
    }
  },
  GetEmailTemplateTargetRoles: {
    data: {
      emailTemplateTargetRoles: {
        nodes: [
          {
            title: 'Developer',
            value: 'Developer',
            __typename: 'EmailTemplateTargetRole'
          },
          {
            title: 'Designer',
            value: 'Designer',
            __typename: 'EmailTemplateTargetRole'
          },
          {
            title: 'Finance Expert',
            value: 'FinanceExpert',
            __typename: 'EmailTemplateTargetRole'
          },
          {
            title: 'Project Manager',
            value: 'ProjectManager',
            __typename: 'EmailTemplateTargetRole'
          },
          {
            title: 'Product Manager',
            value: 'ProductManager',
            __typename: 'EmailTemplateTargetRole'
          }
        ]
      }
    }
  },
  GetPendoVisitor: getPendoVisitorResponse(),
  GetEmailContacts: getEmailContactsResponse(),
  GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse()
}
