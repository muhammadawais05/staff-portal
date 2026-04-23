import { Viewer } from '@staff-portal/graphql/staff'

export const getChromeResponse = (viewer?: Partial<Viewer>) => ({
  data: {
    viewer: {
      chameleonParticipantUuid: 'd4349a7c-7d90-440a-8b9f-9ecb654a0695',
      ...viewer,
      permits: {
        handleRoleMetrics: false,
        useQuicksearch: false,
        viewMyOperationalIssues: false,
        ...viewer?.permits,
        __typename: 'Permits'
      },
      availableTools: {
        salesTool: false,
        salesToolEscalations: false,
        ...viewer?.availableTools,
        __typename: 'ViewerAvailableTools'
      },
      __typename: 'Viewer'
    }
  }
})
