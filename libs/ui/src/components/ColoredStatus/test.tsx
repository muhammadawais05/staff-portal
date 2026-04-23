import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ColoredStatus from './ColoredStatus'

// TODO avoid using non-mocked component https://toptal-core.atlassian.net/browse/SPB-2314
jest.mock('@toptal/picasso/TypographyOverflow', () =>
  jest.requireActual('@toptal/picasso/TypographyOverflow')
)

describe('ColoredStatus', () => {
  it('renders a plain status', () => {
    const { container } = render(
      <TestWrapper>
        <ColoredStatus status='Hello' color='red' />
      </TestWrapper>
    )

    expect(container.innerHTML).toContain('red')
    expect(container.innerHTML).toContain('semibold')
    expect(container.textContent).toContain('Hello')
  })

  it('renders a status with a tooltip and icon', () => {
    const { container } = render(
      <TestWrapper>
        <ColoredStatus
          status='Hello'
          color='green'
          tooltipContent="I'm a tooltip"
          tooltipIcon={<>TOOLTIP ICON</>}
        />
      </TestWrapper>
    )

    expect(container.innerHTML).toContain('TOOLTIP ICON')
    expect(container.innerHTML).toContain('green')
    expect(container.innerHTML).toContain('semibold')
    expect(container.textContent).toContain('Hello')
  })

  it('does not render an icon if there is no a tooltip', () => {
    const { container } = render(
      <TestWrapper>
        <ColoredStatus
          status='Hello'
          color='green'
          tooltipIcon={<>TOOLTIP ICON</>}
        />
      </TestWrapper>
    )

    expect(container.innerHTML).not.toContain('TOOLTIP ICON')
  })
})
