import { gql } from '@staff-portal/data-layer-service'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

export const SCHEDULE_INTERVIEW_FRAGMENT = gql`
  fragment ScheduleInterviewFragment on Interview {
    id
    initiator: initiatorV2
    interviewType
    kind
    communication: communicationV2
    lockVersion
    schedulingComment
    disableCompanyNotifications
    preferredDuration
    availableContacts {
      ...ScheduleInterviewAvailableContactsFragment
    }
    interviewContacts: interviewContactsV3 {
      ...ScheduleInterviewInterviewContactsFragment
    }
    timeZone: timeZoneV2 {
      name
      value
    }
  }

  fragment ScheduleInterviewAvailableContactsFragment on RoleOrClientConnection {
    nodes {
      ...RoleOrClientFragment
    }
  }

  fragment ScheduleInterviewInterviewContactsFragment on InterviewContactsConnection {
    edges {
      main
      node {
        ...RoleOrClientFragment
      }
    }
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
`
