import React from 'react'
import { Page } from '@toptal/picasso'
import { SidebarMenuLabel } from '@staff-portal/ui'

const JobCardsMenu = () => {
  const title = 'Talent'

  return (
    <Page.Sidebar>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item key={title} selected>
          <SidebarMenuLabel label={title} />
        </Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  )
}

export default JobCardsMenu
