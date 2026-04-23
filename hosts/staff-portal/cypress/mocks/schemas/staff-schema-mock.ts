import { Resolvers } from '@staff-portal/graphql/staff'

import { menuMock, viewerMock, operationalIssuesMock, jobsMock } from '../index'
import { clientOperationsMock } from '../fragments'
import { resolveNodeTypes } from '~integration/utils'
import { WithTypename } from '~integration/types'

const staffSchemaMock: Resolvers = {
  ClientOperations: clientOperationsMock(),
  Node: {
    __resolveType: (obj, _context, info) => resolveNodeTypes(obj, info)
  },
  UserError: {
    __resolveType: () => 'StandardUserError' as const
  },
  InterviewContact: {
    __resolveType: () => 'CompanyRepresentative'
  },
  RoleOrClient: {
    __resolveType: () => 'CompanyRepresentative'
  },
  Role: {
    __resolveType: () => 'Staff' || 'CompanyRepresentative'
  },
  Subject: {
    __resolveType: () => 'Client'
  },
  ActivityOrNote: {
    __resolveType: _parent => {
      if ((_parent as unknown as WithTypename<{}>).__typename === 'Note') {
        return 'Note'
      }

      return 'Activity'
    }
  },
  Query: {
    menus: menuMock,
    viewer: viewerMock,
    operationalIssues: operationalIssuesMock,
    jobs: jobsMock
  }
}

export { staffSchemaMock }
