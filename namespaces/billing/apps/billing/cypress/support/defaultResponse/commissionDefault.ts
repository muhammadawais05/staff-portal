import { pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'

export const role = {
  id: 'VjEtU3RhZmYtMTc3Mzk5Nw',
  fullName: 'Deena Priest',
  webResource: {
    text: 'Deena Priest',
    url: 'https://staging.toptal.net/platform/staff/staff/1773997',
    __typename: 'Link'
  },
  __typename: 'Staff'
}

export default {
  GetCommission: {
    data: {
      node: fixtures.MockGetCommission
    }
  },
  GetClientClaimerUpdate: {
    data: fixtures.MockGetClientClaimerUpdate
  },
  SetUpdateClientClaimer: {
    data: {
      updateClientClaimer: {
        success: true,
        errors: [],
        client: {
          id: 'VjEtQ2xpZW50LTUxMTg2MA',
          claimer: role,
          __typename: 'Client'
        },
        nextActionPerformable: true,
        __typename: 'UpdateClientClaimerPayload'
      }
    }
  },
  ChangeRoleReferrer: {
    data: {
      changeRoleReferrer: {
        roleOrClient: role,
        __typename: 'ChangeRoleReferrerPayload',
        success: true,
        errors: [],
        notice: null
      }
    }
  },
  ResetRoleReferrer: {
    data: {
      resetRoleReferrer: {
        role: role,
        __typename: 'ResetRoleReferrerPayload',
        success: true,
        errors: [],
        notice: null
      }
    }
  },
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
  GetClientBusinessTypeUpdate: {
    data: {
      node: pick(fixtures.MockClient, ['id', 'businessType', '__typename'])
    }
  },
  SetUpdateClientBusinessType: {
    data: {
      updateClientBusinessType: {
        success: true,
        errors: [],
        __typename: 'UpdateClientBusinessTypePayload'
      }
    }
  }
}
