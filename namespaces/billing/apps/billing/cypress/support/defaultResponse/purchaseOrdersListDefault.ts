import fixtures from '@staff-portal/billing/src/_fixtures'

export default {
  GetExperiments: {
    data: {
      experiments: {
        poLines: { enabled: false }
      }
    }
  },
  GetPurchaseOrdersList: {
    data: fixtures.MockGetPurchaseOrdersList
  },
  QueryAutocomplete: {
    data: {
      autocomplete: {
        edges: [
          {
            key: '123',
            entityType: 'company',
            label: 'Prohaska, Abbott and Hoppe',
            labelHighlight:
              'Prohaska, {{strong}}A{{/strong}}bbott {{strong}}a{{/strong}}nd Hoppe',
            node: {
              __typename: 'Client',
              id: 'VjEtQ2xpZW50LTMzODEyOA',
              companyLegacyId: 1545223,
              roleType: 'Company'
            },
            nodeTypes: ['top_level_company'],
            __typename: 'AutocompleteEdge'
          }
        ],
        __typename: 'AutocompleteConnection'
      }
    }
  },
  SetCreatePurchaseOrder: {
    data: {
      createPurchaseOrder: {
        purchaseOrder: {
          id: 'VjEtUHVyY2hhc2VPcmRlci0yMTAx',
          __typename: 'PurchaseOrder'
        },
        notice: null,
        success: true,
        errors: [],
        __typename: 'CreatePurchaseOrderPayload'
      }
    }
  }
}
