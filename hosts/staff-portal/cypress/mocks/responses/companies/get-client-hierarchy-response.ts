export const getClientHierarchyResponse = () => ({
  data: {
    node: {
      id: 'VjEtQ2xpZW50LTMwNzc1Mw',
      fullName: 'Beahan, Klocko and Larson',
      hierarchy: {
        clients: {
          nodes: [
            {
              id: 'VjEtQ2xpZW50LTMwNzc1Mw',
              badLead: false,
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/companies/1425847',
                text: 'Beahan, Klocko and Larson',
                __typename: 'Link'
              },
              parent: null,
              children: {
                nodes: [
                  { id: 'VjEtQ2xpZW50LTQ4MjE4OA', __typename: 'Client' },
                  { id: 'VjEtQ2xpZW50LTQ4OTQxOA', __typename: 'Client' }
                ],
                __typename: 'ClientChildrenConnection'
              },
              __typename: 'Client'
            },
            {
              id: 'VjEtQ2xpZW50LTQ4MjE4OA',
              badLead: false,
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/companies/2271542',
                text: 'Huel-Schuster PW',
                __typename: 'Link'
              },
              parent: { id: 'VjEtQ2xpZW50LTMwNzc1Mw', __typename: 'Client' },
              children: {
                nodes: [{ id: 'VjEtQ2xpZW50LTQ4OTQxOA', __typename: 'Client' }],
                __typename: 'ClientChildrenConnection'
              },
              __typename: 'Client'
            },
            {
              id: 'VjEtQ2xpZW50LTQ4OTQxOA',
              badLead: false,
              webResource: {
                url: 'https://staging.toptal.net/platform/staff/companies/2307084',
                text: 'Rau, Daniel and Dicki',
                __typename: 'Link'
              },
              parent: { id: 'VjEtQ2xpZW50LTQ4MjE4OA', __typename: 'Client' },
              children: { nodes: [], __typename: 'ClientChildrenConnection' },
              __typename: 'Client'
            }
          ],
          __typename: 'ClientHierarchyClientsConnection'
        },
        __typename: 'ClientHierarchy'
      },
      __typename: 'Client'
    }
  }
})
