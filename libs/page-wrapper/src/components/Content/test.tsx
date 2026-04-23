import React from 'react'
import { render } from '@testing-library/react'
import { TOPTAL_TITLE } from '@staff-portal/config'
import { TestWrapper } from '@staff-portal/test-utils'

import Content from '.'

describe('Content component', () => {
  it('should change page title renders and it should reset title on unmount', async () => {
    const TEST_TITLE = 'test title'

    const { unmount } = render(
      <TestWrapper>
        <Content title={TEST_TITLE}>test content</Content>
      </TestWrapper>
    )

    expect(document.title).toBe(`${TEST_TITLE} - ${TOPTAL_TITLE}`)

    unmount()

    expect(document.title).toEqual(TOPTAL_TITLE)
  })

  it('should render react element as title if browser title specified', async () => {
    const TEST_TITLE = <div>test title</div>
    const BROWSER_TITLE = 'test title'

    const { unmount } = render(
      <TestWrapper>
        <Content title={TEST_TITLE} browserTitle={BROWSER_TITLE}>
          test content
        </Content>
      </TestWrapper>
    )

    expect(document.title).toBe(`${BROWSER_TITLE} - ${TOPTAL_TITLE}`)

    unmount()
  })

  it('should throw error if title is react element, but browser title is not specified', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error')

    consoleErrorSpy.mockImplementation(() => {})

    const TEST_TITLE = <div>test title</div>

    const renderProblemComponent = () =>
      render(
        <TestWrapper>
          <Content title={TEST_TITLE}>test content</Content>
        </TestWrapper>
      )

    expect(renderProblemComponent).toThrow(
      'Content component title should be either type of string or browserTitle prop should be specified'
    )

    consoleErrorSpy.mockRestore()
  })

  it('should change browser tab title and it should reset title on unmount', async () => {
    const TEST_TITLE = 'test title'
    const BROWSER_TITLE = 'test tab title'

    const { unmount, findByText } = render(
      <TestWrapper>
        <Content browserTitle={BROWSER_TITLE} title={TEST_TITLE}>
          test content
        </Content>
      </TestWrapper>
    )

    expect(document.title).toBe(`${BROWSER_TITLE} - ${TOPTAL_TITLE}`)
    expect(await findByText(TEST_TITLE)).toBeInTheDocument()

    unmount()
    expect(document.title).toEqual(TOPTAL_TITLE)
  })
})
