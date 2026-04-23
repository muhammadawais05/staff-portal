import React from 'react'
import { Tabs } from '@toptal/picasso'
import { HashTabConfig } from '@staff-portal/routes'

interface TabsListProps {
  tabs: HashTabConfig[]
  activeTabNumber: number
  handleTabChange: (newActiveTab: number) => void
  'data-testid'?: string
}

/**
 * @deprecated use `NavigationTabsList` instead
 */
const TabsList = ({
  tabs,
  activeTabNumber,
  handleTabChange,
  'data-testid': dataTestId
}: TabsListProps) => {
  return (
    <Tabs
      value={activeTabNumber}
      onChange={(_: unknown, newTabIndex: number) =>
        handleTabChange(newTabIndex)
      }
      data-testid={dataTestId}
    >
      {tabs.map(({ label, tabHash, icon }) => (
        <Tabs.Tab
          key={Array.isArray(tabHash) ? tabHash.join('|') : tabHash}
          label={label}
          icon={icon}
        />
      ))}
    </Tabs>
  )
}

export default TabsList
