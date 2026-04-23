import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from '@staff-portal/navigation'
import { HashTabConfig } from '@staff-portal/routes'

import { getActiveTabIndex } from './utils'

type UseHashTabReturnType = {
  enabledTabs: Record<number, boolean>
  activeTabNumber: number
  selectedTabContent: ReactNode
  handleTabChange: (newActiveTab: number) => void
  hash: string
}

/**
 * @deprecated use `NavigationTabsList` instead
 */
const useHashTabs = (tabsConfig: HashTabConfig[]): UseHashTabReturnType => {
  const history = useHistory()
  const location = useLocation()
  const [enabledTabs, setEnabledTabs] = useState<Record<number, boolean>>({})
  const [selectedTabContent, setSelectedTabContent] = useState<ReactNode>(null)
  const [activeTabNumber, setActiveTabNumber] = useState<number>(() =>
    getActiveTabIndex(location.hash, tabsConfig)
  )

  const { hash } = location

  const setTab = useCallback(
    (newTabIndex: number): HashTabConfig | undefined => {
      const tabConfig = tabsConfig[newTabIndex]

      setSelectedTabContent(tabConfig?.node ?? null)
      setActiveTabNumber(newTabIndex)

      return tabConfig
    },
    [tabsConfig]
  )

  useEffect(() => {
    if (!selectedTabContent) {
      return
    }

    setEnabledTabs(prevEnabled => ({ ...prevEnabled, [activeTabNumber]: true }))
  }, [selectedTabContent, activeTabNumber])

  useEffect(() => {
    if (!tabsConfig.length) {
      return
    }

    // This is needed to get the page content based on URL hash when page reloads
    const activeTabIndex = getActiveTabIndex(hash, tabsConfig)

    setTab(activeTabIndex)

    // Keeps compatibility with native browser history navigation
    return history.listen(({ hash: locationHash }) => {
      const newTabIndex = getActiveTabIndex(locationHash, tabsConfig)

      setTab(newTabIndex)
    })
  }, [hash, history, setTab, tabsConfig])

  const handleTabChange = useCallback(
    (newActiveTab: number) => {
      const tabConfig = setTab(newActiveTab)
      const tabHash = tabConfig?.tabHash

      history.push({
        ...location,
        hash: Array.isArray(tabHash) ? tabHash[0] : tabHash
      })
    },
    [history, location, setTab]
  )

  return {
    enabledTabs,
    activeTabNumber,
    selectedTabContent,
    handleTabChange,
    hash
  }
}

export default useHashTabs
