import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { TOPTAL_TITLE } from '@staff-portal/config'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  useDependenciesRegistry,
  DependencyInjector
} from '@staff-portal/dependency-injector'

import { STATUS_MESSAGES_COMPONENT } from './dependencies'
import ContentWrapper from './ContentWrapper'

describe('ContentWrapper', () => {
  const arrangeTest = (title: string, statusMessage = 'status message') => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const registry = useDependenciesRegistry()

    registry.set(STATUS_MESSAGES_COMPONENT, () => <>{statusMessage}</>)

    return render(
      <MemoryRouter>
        <TestWrapper>
          <DependencyInjector registry={registry}>
            <ContentWrapper title={title}>test content</ContentWrapper>
          </DependencyInjector>
        </TestWrapper>
      </MemoryRouter>
    )
  }

  it('changes page title on mount', () => {
    const TEST_TITLE = 'new page title'

    arrangeTest(TEST_TITLE)

    expect(document.title).toBe(`${TEST_TITLE} - ${TOPTAL_TITLE}`)
  })

  it('resets page title on unmount', () => {
    const TEST_TITLE = 'reset page title'

    const { unmount } = arrangeTest(TEST_TITLE)

    unmount()

    expect(document.title).toEqual(TOPTAL_TITLE)
  })

  it('shows injected status messages when it renders', async () => {
    const TEST_STATUS_MESSAGE_TEXT = 'status message (287ry24)'
    const TEST_TITLE = 'test title'

    arrangeTest(TEST_TITLE, TEST_STATUS_MESSAGE_TEXT)

    expect(
      await screen.findByText(TEST_STATUS_MESSAGE_TEXT)
    ).toBeInTheDocument()
  })
})
