/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { MenuItem } from '@staff-portal/graphql/staff'

const menuMock = () => ({
  userMenu: [
    {
      label: 'Profile Settings',
      path: '/platform/staff/update_profile'
    }
  ] as MenuItem[],
  mainMenu: [
    {
      label: 'Test',
      counter: 'test',
      path: '/platform/staff/dashboard',
      items: []
    }
  ] as MenuItem[]
})

export default menuMock
