import { Button, ChevronRight16, Container, Page } from '@toptal/picasso'
import React, { memo, useCallback, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { ClickAwayListener } from '@toptal/picasso/utils'
import { WrapWithTooltip } from '@staff-portal/ui'

import SidebarMenuLoader from '../SidebarMenuLoader'
import SidebarMenuContent from '../SidebarMenuContent'
import { useGetMainMenu } from './data/get-main-menu'
import * as S from './styles'

export interface Props {
  isThreeColumnsLayout: boolean
}

const SidebarMenu = ({ isThreeColumnsLayout }: Props) => {
  const { data, loading } = useGetMainMenu()

  const { width: menuWidth, ref: menuRef } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 50,
    refreshOptions: {
      leading: false,
      trailing: true
    }
  })

  const [expanded, setExpanded] = useState(false)

  const closeMenu = () => setExpanded(false)

  const handleTooltipExpandedStateChange = useCallback(() => {
    if (expanded) {
      closeMenu()

      return
    }

    setExpanded(true)
  }, [expanded, setExpanded, closeMenu])

  const handleClickAway = useCallback(() => {
    if (!expanded) {
      return
    }

    handleTooltipExpandedStateChange()
  }, [expanded, handleTooltipExpandedStateChange])

  if (loading && !data) {
    return (
      <Container css={S.sidebarWrapper}>
        <Button.Circular
          css={S.sidebarCollapsibleButton({ isThreeColumnsLayout, expanded })}
          loading
          variant='flat'
        />

        <Page.Sidebar css={S.sidebar({ isThreeColumnsLayout })}>
          <Container css={S.menuWrapper({ isThreeColumnsLayout, expanded })}>
            <Page.Sidebar.Menu
              css={[
                S.menu({ isThreeColumnsLayout }),
                S.menuLoader({ isThreeColumnsLayout })
              ]}
            >
              {Array.from(Array(20).keys()).map(index => (
                <Page.Sidebar.Item key={index}>
                  <SidebarMenuLoader rows={1} />
                </Page.Sidebar.Item>
              ))}
            </Page.Sidebar.Menu>
          </Container>
        </Page.Sidebar>
      </Container>
    )
  }

  if (!data) {
    return null
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container css={S.sidebarWrapper}>
        <WrapWithTooltip
          // don't use `expanded` check here to not break transition for button
          enableTooltip={!menuWidth}
          placement='right'
          compact
          content='Click to expand.'
          interactive={false}
          withWrapper={false}
        >
          <Button.Circular
            css={S.sidebarCollapsibleButton({ isThreeColumnsLayout, expanded })}
            variant='primary'
            icon={<ChevronRight16 />}
            onClick={handleTooltipExpandedStateChange}
          />
        </WrapWithTooltip>

        <WrapWithTooltip
          enableTooltip={!expanded && !menuWidth}
          placement='right'
          followCursor
          compact
          content='Click gray area to expand.'
          interactive={false}
          withWrapper={false}
        >
          <Container
            css={S.sidebarSideArea({ isThreeColumnsLayout, expanded })}
            children={null}
            onClick={handleTooltipExpandedStateChange}
          />
        </WrapWithTooltip>

        <Page.Sidebar
          css={S.sidebar({ isThreeColumnsLayout })}
          data-testid='sidebar'
        >
          <SidebarMenuContent
            ref={menuRef}
            isThreeColumnsLayout={isThreeColumnsLayout}
            mainMenu={data.mainMenu}
            expanded={expanded}
            onMenuItemClick={handleTooltipExpandedStateChange}
          />
        </Page.Sidebar>
      </Container>
    </ClickAwayListener>
  )
}

export default memo(SidebarMenu)
