import { Staff } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const rolesV2Mock = () => ({
  nodes: [
    {
      id: encodeEntityId('1', 'Staff'),
      fullName: 'Amy Santiago',
      type: 'Staff',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/123456'
      }
    },
    {
      id: encodeEntityId('7', 'Staff'),
      fullName: 'Gina Linetti',
      type: 'Staff',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/123456'
      }
    },
    {
      id: encodeEntityId('2', 'Staff'),
      fullName: 'Jake Peralta',
      type: 'Staff',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/123456'
      }
    },
    {
      id: encodeEntityId('3', 'Staff'),
      fullName: 'Charles Boyle',
      type: 'Staff',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/123456'
      }
    },
    {
      id: encodeEntityId('4', 'Staff'),
      fullName: 'Raymond Holt',
      type: 'Staff',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/123456'
      }
    },
    {
      id: encodeEntityId('5', 'Staff'),
      fullName: 'Terry Jeffords',
      type: 'Staff',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/123456'
      }
    },
    {
      id: encodeEntityId('6', 'Staff'),
      fullName: 'Rosa Diaz',
      type: 'Staff',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/123456'
      }
    }
  ] as Staff[]
})
