import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ResolutionToggleButton from '.'

const arrangeTest = (
  props: Omit<ComponentProps<typeof ResolutionToggleButton>, 'handleClick'>
) =>
  render(
    <TestWrapper>
      <ResolutionToggleButton handleClick={jest.fn()} {...props} />
    </TestWrapper>
  )

describe('ResolutionToggleButton', () => {
  describe('when section is expanded', () => {
    it('renders a button to hide resolution', () => {
      arrangeTest({
        isExpanded: true
      })

      expect(screen.getByTestId('ResolutionToggleButton')).toHaveTextContent(
        'Hide Resolution'
      )
    })
  })

  describe('when section is collapsed', () => {
    it('renders a button to show resolution', () => {
      arrangeTest({
        isExpanded: false
      })

      expect(screen.getByTestId('ResolutionToggleButton')).toHaveTextContent(
        'Show Resolution'
      )
    })
  })
})
