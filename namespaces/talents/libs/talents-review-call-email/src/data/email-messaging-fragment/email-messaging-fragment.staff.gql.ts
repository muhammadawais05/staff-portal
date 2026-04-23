import { gql } from '@staff-portal/data-layer-service'

const REVIEW_CALL_BOOKING_OBJECT_FRAGMENT = gql`
  fragment ReviewCallBookingObjectFragment on BookingObject {
    ... on BookingPage {
      id
      slug
    }
    ... on MasterBookingPageConfiguration {
      id
      name
    }
  }
`

export const EMAIL_MESSAGING_ACTIVATION_STEP_FRAGMENT = gql`
  fragment EmailMessagingActivationStepFragment on EmailMessagingActivationStep {
    fullName
    ofacStatus
    ofacProhibited
    emailPreview {
      html
    }
    emailTemplateRendered {
      subject
      body
    }
    emailTemplate {
      id
      name
      rawTemplate
    }
    emailCarbonCopyOptions {
      nodes {
        default
        label
        role {
          id
          fullName
          email
        }
      }
    }
    defaultBookingObject {
      ...ReviewCallBookingObjectFragment
    }
  }

  ${REVIEW_CALL_BOOKING_OBJECT_FRAGMENT}
`
