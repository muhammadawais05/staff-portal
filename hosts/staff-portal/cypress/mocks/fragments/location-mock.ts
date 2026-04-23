import { Location } from '@staff-portal/graphql/staff'

export const locationMock = (node?: Partial<Location>): Location => ({
  cityName: 'New-York',
  ...node
})
