import { EmailContext } from '@staff-portal/communication-send-email'

import { Contacts, ReviewCallEmailMessaging } from '../../types'
import { getBookingObject } from '../get-booking-object/get-booking-object'

export const convertToReviewCallEmailContext = (
  emailMessaging?: ReviewCallEmailMessaging,
  contacts?: Contacts
): EmailContext | undefined => {
  if (!emailMessaging) {
    return
  }

  const {
    id: emailMessagingId,
    fullName,
    defaultBookingObject,
    emailCarbonCopyOptions,
    ofacStatus,
    emailTemplate,
    emailTemplateRendered
  } = emailMessaging

  return {
    blankEmailTemplate: emailTemplate,
    renderedBlankEmailTemplate: emailTemplateRendered,
    emailCarbonCopyOptions,
    emailTemplates: {
      edges: emailTemplate
        ? [
            {
              node: emailTemplate,
              rendered: emailTemplateRendered
            }
          ]
        : []
    },
    roleType: 'Talent',
    defaultSendTo: { id: emailMessagingId },
    fullName,
    ofacStatus,
    defaultBookingObject: getBookingObject(defaultBookingObject),
    optionsSendTo: {
      nodes: contacts?.nodes?.length
        ? [
            {
              id: emailMessagingId,
              fullName,
              email: '',
              contacts,
              __typename: 'Talent'
            }
          ]
        : []
    },
    viewerPendingCommunications: {
      nodes: []
    }
  }
}
