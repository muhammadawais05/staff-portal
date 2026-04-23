import {
  Staff,
  Permits,
  Counter,
  Tokens,
  CallsConnection,
  CallPurposesConnection,
  Viewer
} from '@staff-portal/graphql/staff'
import { createCurrentUserMock } from '@staff-portal/current-user/src/mocks'

import { createGetLensTokenMock } from '../utils'
import { permitsMock, callsMock, callPurposes } from './index'
import { countersMock } from './counters-mock'

const viewerMock = (viewer?: Partial<Viewer>) => ({
  maxEngagementTrialLength: 10,
  me: {
    ...createCurrentUserMock(),
    photo: {
      thumb: ''
    },
    teams: () => ({
      nodes: []
    }),
    contacts: () => ({
      nodes: [
        {
          id: 'VjEtQ29udGFjdC0xMTU0NzA1',
          value: 'alex-3d51048235c9d1a8@toptal.io'
        }
      ]
    }),
    roleTitle: 'test',
    staffPortalBetaEnabled: true,
    staffPortalEarlyAdopter: true
  } as unknown as Staff,
  permits: {
    ...permitsMock()
  } as unknown as Permits,
  calls: {
    ...callsMock()
  } as unknown as CallsConnection,
  callPurposes: {
    ...callPurposes()
  } as unknown as CallPurposesConnection,
  counters: {
    nodes: countersMock as unknown as Counter[]
  },
  availableTools: {
    salesTool: false,
    salesToolEscalations: false
  },
  playbookTasksCounters: {
    overdue: 137,
    pending: 137,
    today: 0
  },
  playbookTeams: {
    nodes: [],
    totalCount: 0
  },
  chameleonParticipantUuid: 'test-id',
  tokens: {
    // ...createGetRoleLensTokenMock(),
    ...createGetLensTokenMock()
  } as unknown as Tokens,
  statusMessages: {
    nodes: [],
    totalCount: 0
  },
  expiredCallTimers: {
    nodes: []
  },
  ...viewer
})

export default viewerMock
