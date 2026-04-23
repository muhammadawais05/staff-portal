import fixtures from '@staff-portal/billing/src/_fixtures'

import basePageQueries from './basePageQueries'

export default {
  ...basePageQueries,
  QueryAutocomplete: {
    data: {
      autocomplete: {
        __typename: 'AutocompleteConnection',
        edges: [
          {
            __typename: 'AutocompleteEdge',
            key: '123',
            entityType: 'company',
            label: 'Top level company',
            labelHighlight: '{{strong}}Top{{/strong}} level company',
            node: {
              __typename: 'Client',
              id: 'VjEtVGFsZW50LTE2ODM5MTM=',
              roleType: 'Staff',
              companyLegacyId: 'VjEtQ29tcGFueS0xMjM0NDI5'
            },
            nodeTypes: ['top_level_company']
          }
        ]
      }
    }
  },
  GetMemorandumsList: {
    data: {
      memorandums: fixtures.MockMemorandums
    }
  },
  GetMemorandumListHeader: {
    data: {
      operations: fixtures.MockOperations
    }
  },
  GetMemorandumCategories: {
    data: {
      memorandumCategories: fixtures.MockMemorandumCategories
    }
  },
  SetAddMemorandumToRole: {
    data: {
      addMemorandumToRole: {
        __typename: 'AddMemorandumToRolePayload',
        errors: [],
        commercialDocument: {
          __typename: 'Invoice',
          id: 'VjEtSW52b2ljZS0zODA2MDA'
        },
        success: true
      }
    }
  }
}
