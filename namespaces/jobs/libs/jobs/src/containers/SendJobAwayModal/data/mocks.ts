import { Scalars } from '@staff-portal/graphql/staff'

export const matchingCallsMock: {
  id: string
  scheduledAt: Scalars['Time']
  organizer: {
    fullName: string
  }
}[] = [
  {
    id: 'meeting-1',
    scheduledAt: '2021-11-18T20:00:00+03:00',
    organizer: {
      fullName: 'Yvette Harber'
    }
  },
  {
    id: 'meeting-2',
    scheduledAt: '2021-11-18T19:30:00+03:00',
    organizer: {
      fullName: 'Tracy Schuppe'
    }
  },
  {
    id: 'meeting-3',
    scheduledAt: '2021-11-18T19:00:00+03:00',
    organizer: {
      fullName: 'Adah Gutkowski'
    }
  }
]

export const feedbackReasonsMock = [
  {
    id: 'feedbackReasons-1',
    name: 'Client budget is too small',
    nameForRole: 'Client budget is too small',
    group: {
      id: 'feedbackReasonsGroup-1',
      name: 'Client has budget restrictions'
    }
  },
  {
    id: 'feedbackReasons-2',
    name: "Client doesn't accept our T&M business model",
    nameForRole: "Client doesn't accept our T&M business model",
    group: {
      id: 'feedbackReasonsGroup-2',
      name: 'Toptal prerequisites not met'
    }
  },
  {
    id: 'feedbackReasons-3',
    name: 'Client failed to sign our STA or has other contract/Legal issues',
    nameForRole:
      'Client failed to sign our STA or has other contract/Legal issues',
    group: {
      id: 'feedbackReasonsGroup-3',
      name: 'Toptal prerequisites not met'
    }
  },
  {
    id: 'feedbackReasons-4',
    name: 'Client has Billing/Deposit issues',
    nameForRole: 'Client has Billing/Deposit issues',
    group: {
      id: 'feedbackReasonsGroup-4',
      name: 'Toptal prerequisites not met'
    }
  }
]
