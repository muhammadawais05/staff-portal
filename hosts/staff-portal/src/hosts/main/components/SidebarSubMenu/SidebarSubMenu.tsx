import { Page } from '@toptal/picasso'
import React, { memo, ComponentProps } from 'react'
import { MenuLink, SidebarMenuLabel } from '@staff-portal/ui'

import { getMainMenuCounter } from '../../utils/sidebar-menu'
import * as S from './styles'

type Props = {
  parentLabel: string
  activePath: string | null
  items: {
    label: string
    counter?: string | null
    path?: string | null
  }[]
  counters?: {
    name: string
    total: number
    unread: number
  }[]
  onMenuItemClick?: () => void
}

const SidebarSubMenu = ({
  parentLabel,
  items,
  activePath,
  counters,
  onMenuItemClick
}: Props) => (
  <Page.Sidebar.Menu css={S.subMenu}>
    {items.map(({ label, counter, path }) => {
      const menuLinkProps: Omit<ComponentProps<typeof MenuLink>, 'children'> = {
        href: path ?? '',
        inheritVisitedColor: false
      }

      return (
        <Page.Sidebar.Item
          key={label}
          testIds={{ header: `${parentLabel}: ${label}` }}
          selected={path === activePath}
          className='submenu-sidebar-item'
          style={{ marginRight: '1rem' }} // eslint-disable-line no-inline-styles/no-inline-styles
          as={MenuLink}
          onClick={onMenuItemClick}
          {...menuLinkProps}
        >
          <SidebarMenuLabel
            label={label}
            counter={getMainMenuCounter(counters, counter)}
          />
        </Page.Sidebar.Item>
      )
    })}
  </Page.Sidebar.Menu>
)

export default memo(SidebarSubMenu)
