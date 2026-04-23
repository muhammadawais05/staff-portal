import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobsToggleButton from '.'

const arrangeTest = (
  props: Omit<ComponentProps<typeof JobsToggleButton>, 'handleClick'>
) =>
  render(
    <TestWrapper>
      <JobsToggleButton handleClick={jest.fn()} {...props} />
    </TestWrapper>
  )

describe('JobsToggleButton', () => {
  describe('when there are jobs', () => {
    describe('when section is expanded', () => {
      it('renders a button to hide jobs', () => {
        arrangeTest({
          totalCount: 5,
          isExpanded: true
        })

        expect(screen.getByTestId('JobsToggleButton')).toHaveTextContent(
          'Hide Jobs'
        )
      })
    })

    describe('when section is collapsed', () => {
      it('renders a button to show jobs', () => {
        arrangeTest({
          totalCount: 5,
          isExpanded: false
        })

        expect(screen.getByTestId('JobsToggleButton')).toHaveTextContent(
          'Show Jobs (5)'
        )
      })
    })
  })

  describe('when there are no jobs', () => {
    it('renders a disabled button', () => {
      arrangeTest({
        totalCount: 0,
        isExpanded: false
      })

      expect(screen.getByTestId('JobsToggleButton')).toHaveTextContent(
        'Show Jobs (0)'
      )
      expect(screen.getByTestId('JobsToggleButton')).toBeDisabled()
    })
  })
})
