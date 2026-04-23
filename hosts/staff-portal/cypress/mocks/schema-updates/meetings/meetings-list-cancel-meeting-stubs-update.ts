import {
  CancelMeetingPostActionName,
  Meeting,
  MeetingStatus,
  OfacStatus,
  StepType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { meetingsPageStubs } from '~integration/mocks/request-stubs'
import { getCancelMeetingOperationResponse } from '~integration/mocks/responses/meetings'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  emailMessagingEngagementClientMock,
  emailTemplateEdgeMock,
  meetingMock
} from '~integration/mocks/fragments'
import {
  getEmailContactsResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'

const updateMeetingsListCancelMeetingStubs = ({
  meetings,
  nextActionName
}: {
  meetings: Meeting[]
  nextActionName?: CancelMeetingPostActionName
}) =>
  cy.stubGraphQLRequests({
    ...meetingsPageStubs({
      meetings
    }),
    GetLazyOperation: getCancelMeetingOperationResponse(),
    GetGeneralEmailContext: {
      data: {
        staffNode: meetingMock({
          emailMessaging: emailMessagingEngagementClientMock()
        })
      }
    },
    GetEmailContacts: getEmailContactsResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetRescheduleBookingEmailContext: {
      data: {
        node: {
          __typename: 'Talent',
          id: encodeEntityId('123', 'Talent'),
          contacts: {
            nodes: []
          },
          emailMessagingBookingReschedule: {
            id: encodeEntityId('123', 'EmailMessagingTalentBooking'),
            defaultBookingObject: {
              id: '',
              name: 'booking object',
              title: 'title'
            },
            emailTemplate: emailTemplateEdgeMock().node,
            emailTemplateRendered: {
              body: 'body',
              subject: 'subject'
            },
            ofacStatus: OfacStatus.NORMAL,
            fullName: 'name',
            ofacProhibited: true,
            emailCarbonCopyOptions: {
              nodes: []
            }
          }
        }
      }
    },
    GetRescheduleReviewCallEmailContext: {
      data: {
        node: {
          __typename: 'Talent',
          id: encodeEntityId('123', 'Talent'),
          contacts: {
            nodes: []
          },
          activation: {
            id: encodeEntityId('123', 'Activation'),
            steps: {
              nodes: [
                {
                  id: encodeEntityId('123', 'ActivationStep'),
                  type: StepType.REVIEW_CALL,
                  emailMessagingReschedule: {
                    __typename: 'EmailMessagingActivationStep',
                    id: encodeEntityId('123', 'EmailMessagingActivationStep'),
                    defaultBookingObject: {
                      id: '',
                      name: 'booking object',
                      title: 'title'
                    },
                    emailTemplate: emailTemplateEdgeMock().node,
                    emailTemplateRendered: {
                      body: 'body',
                      subject: 'subject'
                    },
                    emailPreview: {
                      html: ''
                    },
                    ofacStatus: OfacStatus.NORMAL,
                    fullName: 'name',
                    ofacProhibited: true,
                    emailCarbonCopyOptions: {
                      nodes: []
                    }
                  },
                  __typename: 'ActivationStep'
                }
              ]
            },
            __typename: 'Activation'
          }
        }
      }
    },
    CancelMeeting: {
      data: {
        cancelMeeting: {
          meeting: meetingMock({
            status: MeetingStatus.CANCELLED
          }),
          nextActionName: nextActionName ?? null,
          cancelMeetingEmailTemplate: {
            id: encodeEntityId('123', 'EmailTemplate')
          },
          ...successMutationMock()
        }
      }
    }
  })

export default updateMeetingsListCancelMeetingStubs
