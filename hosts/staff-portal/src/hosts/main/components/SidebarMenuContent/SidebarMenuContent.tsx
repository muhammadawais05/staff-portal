import React, { memo, Ref, ComponentProps } from 'react'
import { useRefetchOnPathChange } from '@staff-portal/navigation'
import { MenuLink, SidebarMenuLabel } from '@staff-portal/ui'
import { Container, Page } from '@toptal/picasso'

import { getMainMenuCounter } from '../../utils/sidebar-menu'
import * as S from '../SidebarMenu/styles'
import SidebarSubMenu from '../SidebarSubMenu'
import { useGetCounters } from './data/get-counters'
import { useGetActivePath } from './hooks'

type MenuItem = { label: string; counter?: string | null; path?: string | null }
type Props = {
  isThreeColumnsLayout: boolean
  expanded: boolean
  mainMenu: (MenuItem & { items: MenuItem[] })[]
  onMenuItemClick?: () => void
}

const SidebarMenuContent = React.forwardRef(
  (
    { isThreeColumnsLayout, expanded, mainMenu, onMenuItemClick }: Props,
    ref: Ref<HTMLUListElement>
  ) => {
    const activePath = useGetActivePath(mainMenu)
    const { data: counters, refetch } = useGetCounters()

    useRefetchOnPathChange([refetch])

    return (
      <Container css={S.menuWrapper({ isThreeColumnsLayout, expanded })}>
        <Page.Sidebar.Menu css={S.menu({ isThreeColumnsLayout })} ref={ref}>
          {mainMenu.map(({ label, counter, path, items }) => {
            const isCollapsible = items.length > 0
            const isSelected = path === activePath
            const subMenu = (
              <SidebarSubMenu
                parentLabel={label}
                items={items}
                activePath={activePath}
                counters={counters}
                onMenuItemClick={onMenuItemClick}
              />
            )

            const menuLinkProps: Omit<
              ComponentProps<typeof MenuLink>,
              'children'
            > = {
              href: path ?? '',
              inheritVisitedColor: false
            }

            const menuItemAdditionalProps = isCollapsible
              ? { menu: subMenu }
              : { as: MenuLink, ...menuLinkProps }

            return (
              <Page.Sidebar.Item
                key={label}
                testIds={{
                  header: label
                }}
                collapsible={isCollapsible}
                selected={isSelected}
                style={{ marginRight: isCollapsible ? 0 : '1rem' }}
                onClick={onMenuItemClick}
                {...(menuItemAdditionalProps as unknown)}
              >
                <SidebarMenuLabel
                  label={label}
                  counter={getMainMenuCounter(counters, counter)}
                />
              </Page.Sidebar.Item>
            )
          })}
        </Page.Sidebar.Menu>
      </Container>
    )
  }
)

export default memo(SidebarMenuContent)
