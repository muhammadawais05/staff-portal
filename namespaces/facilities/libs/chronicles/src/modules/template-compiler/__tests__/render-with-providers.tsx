import React from 'react'
import { render } from '@testing-library/react'
import { RouteContext } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'

const identicalPath = (path: string) => ({ url: path })

const renderWithProviders = (node: (string | JSX.Element)[]) =>
  render(
    <RouteContext.Provider value={identicalPath}>
      <TestWrapper>{node}</TestWrapper>
    </RouteContext.Provider>
  )

export default renderWithProviders
