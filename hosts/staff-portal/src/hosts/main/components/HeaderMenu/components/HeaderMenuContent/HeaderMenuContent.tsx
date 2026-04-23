import React from 'react'
import { Menu } from '@toptal/picasso'
import { PLATFORM_API_URL } from '@staff-portal/config'
import { useNotifications } from '@toptal/picasso/utils'
import { getLogoutPath } from '@staff-portal/routes'
import { MenuLink } from '@staff-portal/ui'

import { useLogout } from './data/logout'
import PostLinkMenuItem from '../PostLinkMenuItem'
import ScreenersViewMenuItem from '../ScreenersViewMenuItem/ScreenersViewMenuItem'
import * as S from './styles'
import { useGetUserMenu } from './data/get-user-menu'

export interface Props {
  setOperationIsLoading: (isLoading: boolean) => void
}

const HeaderMenuContent = ({ setOperationIsLoading }: Props) => {
  const { showError } = useNotifications()
  const { data } = useGetUserMenu()
  const { logout } = useLogout({
    onRedirecting: () => setOperationIsLoading(true),
    onRedirectingComplete: () => setOperationIsLoading(false),
    onError: () => {
      showError('Error occurred during logout')
      setOperationIsLoading(false)
    }
  })

  if (!data) {
    return null
  }

  let menuItems = data.userMenu.map(item => {
    if (item.path === getLogoutPath()) {
      return (
        <Menu.Item
          onClick={logout}
          key={item.label}
          css={S.separator}
        >
          {item.label}
        </Menu.Item>
      )
    }

    if (item.path?.startsWith('/users/switch')) {
      return (
        <PostLinkMenuItem
          path={`${PLATFORM_API_URL}${item.path}`}
          label={item.label}
          key={item.label}
        />
      )
    }

    return (
      <Menu.Item
        key={item.label}
        as={MenuLink}
        href={`${PLATFORM_API_URL}${item.path}`}
      >
        {item.label}
      </Menu.Item>
    )
  })

  // Add link before Logout link
  const logoutLinkIndex = menuItems.length - 1

  menuItems = [
    ...menuItems.slice(0, logoutLinkIndex),
    <ScreenersViewMenuItem />,
    ...menuItems.slice(logoutLinkIndex)
  ]

  return <>{menuItems}</>
}

export default HeaderMenuContent
