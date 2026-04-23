import { Investigation, InvestigationReason } from '@staff-portal/graphql/staff'

export const investigationsMock = (investigation?: Partial<Investigation>) => ({
  investigations: {
    totalCount: 1,
    nodes: [
      {
        id: 'VjEtSW52ZXN0aWdhdGlvbi0zODg5',
        clientSpecialistTeamAssignee: {
          id: 'VjEtU3RhZmYtMzMyOTI3',
          webResource: {
            text: 'Vera Perunicic Maticki',
            url: 'https://staging.toptal.net/platform/staff/staff/332927'
          }
        },
        comment: 'This part was obfuscated, some content was here.',
        reason: InvestigationReason.REPORTED_ISSUES,
        resolvedAt: '2021-07-13T18:22:47+03:00',
        startedAt: '2021-07-08T11:56:57+03:00',
        jobs: {
          totalCount: 0,
          nodes: []
        },
        ...investigation
      }
    ]
  }
})
