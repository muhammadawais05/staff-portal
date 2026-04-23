import { Skill } from '@staff-portal/graphql/staff'

export const skillListMock = (node?: {}) =>
  ({
    activeExplicitJobsCount: 1,
    activeExplicitTalentsCount: 2,
    activeImplicitJobsCount: 3,
    activeImplicitTalentsCount: 4,
    category: {
      id: 'VjEtU2tpbGxDYXRlZ29yeS0yOQ',
      title: 'Other',
      vertical: {
        id: 'VjEtVmVydGljYWwtMQ',
        talentType: 'developer'
      }
    },
    id: 'VjEtU2tpbGwtMTU1MjI5',
    isIdentifier: false,
    isIdentifierUnmarkable: true,
    parent: null,
    ...node
  } as unknown as Skill)
