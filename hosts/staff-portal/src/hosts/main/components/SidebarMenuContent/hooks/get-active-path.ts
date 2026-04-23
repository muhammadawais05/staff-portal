import { useLocation } from '@staff-portal/navigation'
import { useMemo } from 'react'

import { MainMenuFragment } from '../../SidebarMenu/data/get-main-menu'
import { getActiveMenuItemPath } from '../../../utils/menu-utils'

export const useGetActivePath = (mainMenu: MainMenuFragment[]) => {
  const location = useLocation()

  return useMemo(
    () => getActiveMenuItemPath(mainMenu, location),
    [mainMenu, location]
  )
}
