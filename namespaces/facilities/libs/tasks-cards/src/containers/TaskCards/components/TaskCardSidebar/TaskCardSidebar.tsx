import React, { FunctionComponent } from 'react'
import { Page, PageSidebarProps, TypographyOverflow } from '@toptal/picasso'
import { SidebarItemProps } from '@toptal/picasso/SidebarItem'
import { SidebarMenuProps } from '@toptal/picasso/SidebarMenu'

import * as S from './styles'

export interface TaskCardSidebarItemProps extends SidebarItemProps {
  title: string
  subtitle?: string
}

const TaskCardSidebarItem = ({
  title,
  subtitle,
  ...rest
}: TaskCardSidebarItemProps) => {
  return (
    <Page.Sidebar.Item {...rest}>
      <div css={S.taskCardSidebarItemContent}>
        {/* TODO: replace when https://toptal-core.atlassian.net/browse/FX-562 is resolved */}
        <TypographyOverflow color='inherit' size='medium' as='span'>
          {title}
        </TypographyOverflow>
        {subtitle && (
          <TypographyOverflow
            forwardedAs='span'
            css={S.taskCardSidebarItemSubtitle}
          >
            {subtitle}
          </TypographyOverflow>
        )}
      </div>
    </Page.Sidebar.Item>
  )
}

export type TaskCardSidebarMenuProps = SidebarMenuProps
const TaskCardSidebarMenu = ({
  children,
  ...rest
}: TaskCardSidebarMenuProps) => {
  return (
    <Page.Sidebar.Menu css={S.sidebarMenu} {...rest}>
      {children}
    </Page.Sidebar.Menu>
  )
}

type TaskCardSidebarStaticProps = {
  Menu: typeof TaskCardSidebarMenu
  Item: typeof TaskCardSidebarItem
}
export type TaskCardSidebarProps = PageSidebarProps
// ToDo: This should be replaced with a custom component
// This is just an wrapper over the Sidebar.menu component
const TaskCardSidebar: FunctionComponent<TaskCardSidebarProps> &
  TaskCardSidebarStaticProps = ({ children, ...rest }) => (
  <Page.Sidebar {...rest} css={S.taskCardSidebar}>
    {children}
  </Page.Sidebar>
)

TaskCardSidebar.Menu = TaskCardSidebarMenu
TaskCardSidebar.Item = TaskCardSidebarItem

export default TaskCardSidebar
