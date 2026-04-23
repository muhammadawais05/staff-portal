import { Flag } from '@staff-portal/graphql/staff'

export const getFlagsResponse = (flags: Partial<Flag>[] = []) => ({
  data: {
    flags: {
      nodes: [
        {
          id: 'VjEtRmxhZy05MDA1Mg',
          title: '3D Renderer',
          __typename: 'Flag'
        },
        ...flags
      ],
      __typename: 'FlagConnection'
    }
  }
})
