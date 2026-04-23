import { render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import type { TooltipWrapperProps } from './components'
import AsyncTooltipWrapper from './AsyncTooltipWrapper'

jest.mock('./components', () => ({
  TooltipWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid='tooltip-wrapper'>{children}</div>
  )
}))

const arrangeTest = ({ enableTooltip }: { enableTooltip: boolean }) =>
  render(
    <TestWrapper>
      <AsyncTooltipWrapper
        enableTooltip={enableTooltip}
        {...({} as TooltipWrapperProps<undefined>)}
      >
        <span data-testid='children' />
      </AsyncTooltipWrapper>
    </TestWrapper>
  )

describe('AsyncTooltipWrapper', () => {
  describe('when enableTooltip is false', () => {
    it('does not render TooltipWrapper', () => {
      arrangeTest({
        enableTooltip: false
      })

      expect(screen.getByTestId('children')).toBeInTheDocument()
      expect(screen.queryByTestId('tooltip-wrapper')).not.toBeInTheDocument()
    })
  })

  describe('when enableTooltip is true', () => {
    it('renders TooltipWrapper', () => {
      arrangeTest({
        enableTooltip: true
      })

      expect(screen.getByTestId('children')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip-wrapper')).toBeInTheDocument()
    })
  })
})
