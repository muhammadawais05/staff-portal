import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getRoleMissingFlags = (nodeTypeName: 'Staff' | 'Talent') => ({
  data: {
    node: {
      id: encodeEntityId('124', 'FlagConnection'),
      missingFlags: {
        nodes: [
          {
            title: 'Type A Quality Talent',
            id: encodeEntityId('124', 'Flag'),
            color: null,
            token: 'type_a',
            __typename: 'Flag'
          }
        ],
        __typename: 'FlagConnection'
      },
      __typename: nodeTypeName
    },
    viewer: {
      permits: {
        createTalentInfractions: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    }
  }
})
