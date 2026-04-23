import { gql, useGetData } from '@staff-portal/data-layer-service'

import { GetUserMenuDocument } from './get-user-menu.staff.gql.types'

export const GET_USER_MENU = gql`
  query GetUserMenu {
    menus {
      userMenu {
        label
        path
      }
    }
  }
`

export const useGetUserMenu = () =>
  useGetData(GetUserMenuDocument, 'menus')(undefined, {
    throwOnError: true,
    fetchPolicy: 'cache-first'
  })
