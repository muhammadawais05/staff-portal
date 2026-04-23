import type { HashTabConfig } from '@staff-portal/routes'

import { getActiveTabIndex } from './utils'

const LEGACY_MODAL_HASH = '#modal=/legacy'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  extractModalHash: () => LEGACY_MODAL_HASH
}))

const getTabsConfigMock = (): HashTabConfig[] => [
  {
    label: '',
    node: null,
    tabHash: 'tab-one' as HashTabConfig['tabHash']
  },
  {
    label: '',
    node: null,
    tabHash: 'tab-two' as HashTabConfig['tabHash']
  }
]

describe('getActiveTabIndex', () => {
  it('is 0 for the blank hash', () => {
    const tabsConfig = getTabsConfigMock()

    expect(getActiveTabIndex('', tabsConfig)).toBe(0)
  })

  it('is 0 for the random hash', () => {
    const tabsConfig = getTabsConfigMock()

    expect(getActiveTabIndex('#random', tabsConfig)).toBe(0)
  })

  it('returns index of existing tab', () => {
    const tabsConfig = getTabsConfigMock()

    expect(getActiveTabIndex('#tab-two', tabsConfig)).toBe(1)
  })

  describe('when tab hash is followed by #modal', () => {
    it('returns expected tab index', () => {
      const tabsConfig = getTabsConfigMock()

      expect(
        getActiveTabIndex(`#tab-two${LEGACY_MODAL_HASH}`, tabsConfig)
      ).toBe(1)
    })
  })
})
