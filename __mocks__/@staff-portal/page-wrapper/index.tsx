import React, { FC } from 'react'

// mock out the error boundary in tests
jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  PageContentErrorBoundary: (({ children }) => <>{children}</>) as FC
}))

export { default } from '@staff-portal/page-wrapper'
export * from '@staff-portal/page-wrapper'
