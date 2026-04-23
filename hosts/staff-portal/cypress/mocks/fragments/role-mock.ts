import { Role } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { emailTemplateEdgesMock } from '~integration/mocks/fragments/email-template-edge-mock'
import { locationMock } from '~integration/mocks/fragments/location-mock'
import { webResourceMock } from '~integration/mocks/fragments/web-resource-mock'

type RoleMock = Role & { __typename: string }

export const roleMock = (node?: Partial<RoleMock>): RoleMock => ({
  __typename: 'Talent',
  id: 'VjEtVGFsZW50LTY1NjUxMA',
  associatedRoles: {
    nodes: [],
    totalCount: 0
  },
  availableForMeeting: true,
  communicationTrackingToken: '123',
  contacts: {
    nodes: [],
    totalCount: 0
  },
  email: 'example@example.com',
  emailMessaging: {
    id: 'VjEtVGFsZW50LTY1NjUxMA',
    defaultSendTo: {} as Role,
    emailTemplates: {
      edges: emailTemplateEdgesMock(5)
    },
    fullName: 'Full Name',
    ofacProhibited: false,
    operations: {
      sendEmailTo: hiddenOperationMock()
    },
    optionsSendTo: {
      nodes: [],
      totalCount: 0
    },
    roleType: 'Developer'
  },
  fullName: 'Full Name',
  ipLocation: locationMock(),
  location: locationMock(),
  ofacProhibited: false,
  operations: {
    addRoleFlag: hiddenOperationMock(),
    changeRoleReferrer: hiddenOperationMock(),
    createMeeting: hiddenOperationMock(),
    downloadRolePaymentHistory: hiddenOperationMock(),
    loginAs: hiddenOperationMock(),
    resetRoleReferrer: hiddenOperationMock(),
    updateBillingNotes: hiddenOperationMock(),
    updateRoleOfacStatus: hiddenOperationMock(),
    updateRolePhoto: hiddenOperationMock(),
    callRole: hiddenOperationMock()
  },
  ownedOperationalIssues: {
    nodes: [],
    totalCount: 0
  },
  scheduledMeetings: {
    nodes: []
  },
  type: 'Developer',
  unresolvedOwnedOperationalIssuesCount: 0,
  userLegacyId: 1,
  paymentOptions: {
    nodes: []
  },
  roleTitle: 'Developer',
  unallocatedMemorandumConnection: {
    nodes: [],
    ...webResourceMock()
  },
  unallocatedMemorandums: {
    nodes: [],
    ...webResourceMock()
  },
  ...node
})
