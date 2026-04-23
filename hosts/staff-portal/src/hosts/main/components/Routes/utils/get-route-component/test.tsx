import { render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode, Suspense } from 'react'
import { RoutePath } from '@staff-portal/routes'
import { TestWrapper } from '@staff-portal/test-utils'

import { getRouteComponent } from './get-route-component'

jest.mock('../../../../config', () => ({
  RoutesMapping: {
    '/dashboard': <div data-testid='dashboard' />,
    '/email_messages': <div data-testid='email-message-list' />
  }
}))

jest.mock('../../../../pages/Overview/Overview', () => ({
  __esModule: true,
  default: () => <div data-testid='dashboard' />
}))

jest.mock('@staff-portal/communication-tracking-app', () => ({
  ...jest.requireActual('@staff-portal/communication-tracking-app'),
  EmailMessageList: () => <div data-testid='email-message-list' />
}))

const arrangeTest = (children: ReactNode) =>
  render(
    <TestWrapper>
      <Suspense fallback={<div />}>{children}</Suspense>
    </TestWrapper>
  )

describe('getRouteComponent', () => {
  it('throws error when the path is empty', () => {
    expect(() => getRouteComponent(undefined)).toThrow(
      'Empty path is not allowed!'
    )
  })

  it('works with string path', async () => {
    const content = getRouteComponent(RoutePath.Dashboard)

    arrangeTest(content)

    expect(await screen.findByTestId('dashboard')).toBeInTheDocument()
  })

  it('works with multiple paths', async () => {
    const content = getRouteComponent([
      RoutePath.EmailMessages,
      RoutePath.RoleEmailMessages
    ])

    arrangeTest(content)

    expect(await screen.findByTestId('email-message-list')).toBeInTheDocument()
  })
})
