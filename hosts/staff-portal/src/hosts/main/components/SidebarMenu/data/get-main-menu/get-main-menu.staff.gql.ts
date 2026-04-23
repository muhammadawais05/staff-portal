
import {
  GENERAL_APP_QUERIES_BATCH_KEY,
  gql,
  useGetData
,BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetMainMenuDocument } from './get-main-menu.staff.gql.types'

export const GET_MAIN_MENU = gql`
  query GetMainMenu {
    menus {
      mainMenu {
        ...MainMenuFragment
      }
    }
  }

  fragment MainMenuItemFragment on MenuItem {
    label
    counter
    path
  }

  fragment MainMenuFragment on MenuItem {
    ...MainMenuItemFragment
    items {
      ...MainMenuItemFragment
    }
  }
`

export const useGetMainMenu = () =>
  useGetData(GetMainMenuDocument, 'menus')(undefined, {
    throwOnError: true,
    context: { [BATCH_KEY]: GENERAL_APP_QUERIES_BATCH_KEY }
  })
