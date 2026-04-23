import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getPendoVisitorResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        createdAt: '2012-07-20T20:39:27+04:00',
        jobTitle: '',
        teams: {
          nodes: [
            {
              name: 'CTO Team',
              __typename: 'Team'
            }
          ],
          __typename: 'TeamConnection'
        },
        fullName: 'Alexander Danilenko',
        roleTitle: 'Staff',
        email: 'alex-3d51048235c9d1a8@toptal.io',
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }
})
