import React, { ReactNode } from 'react'
import * as Sentry from '@sentry/react'

import wrapWithPerformanceProfiler from '../wrap-with-performance-profiler'

const TestApp = () => <div />

describe('wrapWithPerformanceProfiler', () => {
  it('wraps provided application with sentry profiler', () => {
    const withProfilerSpy = jest
      .spyOn(Sentry, 'withProfiler')
      .mockImplementation(App => {
        const wrappedApp = (props: { children?: ReactNode }) => {
  return <App {...props} />
}

        wrappedApp.displayName = 'wrapped-app'

        return wrappedApp
      })

    const wrappedApp = wrapWithPerformanceProfiler(TestApp)

    expect(withProfilerSpy).toHaveBeenCalled()
    expect(wrappedApp.displayName).toBe('wrapped-app')
  })
})
