import React from 'react'
import { createMemoryHistory, Location } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import { Route, Router } from '@staff-portal/navigation'
import { CompanyTabUrlHash, HashTabConfig } from '@staff-portal/routes'

import useHashTabs from './use-hash-tabs'

const FIRST_TAB_CONFIG: HashTabConfig = {
  label: 'Basic Info',
  node: <div data-testid='first-tab-content' />,
  tabHash: CompanyTabUrlHash.BASIC_INFO
}
const SECOND_TAB_CONFIG: HashTabConfig = {
  label: 'Internal Data',
  node: <div data-testid='second-tab-content' />,
  tabHash: CompanyTabUrlHash.INTERNAL_DATA
}

const TAB_CONFIGS = [FIRST_TAB_CONFIG, SECOND_TAB_CONFIG]

const TestComponent = () => {
  const { handleTabChange, selectedTabContent } = useHashTabs([
    FIRST_TAB_CONFIG,
    SECOND_TAB_CONFIG
  ])

  return (
    <div>
      {TAB_CONFIGS.map(({ label, tabHash }, tabIndex) => (
        <button
          key={Array.isArray(tabHash) ? tabHash.join('|') : tabHash}
          onClick={() => handleTabChange(tabIndex)}
        >
          {label}
        </button>
      ))}
      {selectedTabContent}
    </div>
  )
}

const arrangeTest = (initialPath: string) => {
  const history = createMemoryHistory({ initialEntries: [initialPath] })
  const pushSpy = jest.spyOn(history, 'push')

  render(
    <Router history={history}>
      <Route path='testpath' exact>
        <TestComponent />
      </Route>
    </Router>
  )

  return {
    pushSpy
  }
}

describe('useHashTab', () => {
  it('shows default first tab, change tab and keep querystring', () => {
    const LOCATION = {
      pathname: 'testpath',
      search: '?filter=test',
      hash: '',
      state: undefined
    }

    const INITIAL_PATH = `${LOCATION.pathname}${LOCATION.search}`

    const { pushSpy } = arrangeTest(INITIAL_PATH)

    expect(screen.getByTestId('first-tab-content')).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: SECOND_TAB_CONFIG.label })
    )

    expect(pushSpy.mock.calls[0][0]).toStrictEqual({
      ...LOCATION,
      hash: SECOND_TAB_CONFIG.tabHash,
      key: (pushSpy.mock.calls[0][0] as Location).key
    })

    expect(screen.getByTestId('second-tab-content')).toBeInTheDocument()
  })
})
