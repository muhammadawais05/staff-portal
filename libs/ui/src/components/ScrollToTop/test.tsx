import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from '@staff-portal/navigation'

import ScrollToTop from './ScrollToTop'

const arrangeTest = (initialEntries: string[]) => {
  window.scrollTo = jest.fn()

  const history = createMemoryHistory({ initialEntries })

  return {
    history,
    renderResult: render(
      <Router history={history}>
        <ScrollToTop />
      </Router>
    )
  }
}

describe('ScrollToTop', () => {
  it('should scroll up after each location pathname change', async () => {
    const { history } = arrangeTest(['/test-path-1'])

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    history.push('/test-path-2')
    expect(window.scrollTo).toHaveBeenCalledTimes(2)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
  })

  it('should NOT scroll up after any location search param change other than `page`', async () => {
    const PATHNAME = '/test-path'
    const { history } = arrangeTest([PATHNAME])

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    history.push(`${PATHNAME}?filter=sales`)
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    history.push(`${PATHNAME}?page=2`)
    expect(window.scrollTo).toHaveBeenCalledTimes(2)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
  })
})
