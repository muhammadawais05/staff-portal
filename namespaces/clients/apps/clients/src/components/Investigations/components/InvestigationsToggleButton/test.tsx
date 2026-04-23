import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import InvestigationsToggleButton from '.'

const arrangeTest = (
  props: Omit<ComponentProps<typeof InvestigationsToggleButton>, 'handleClick'>
) =>
  render(
    <TestWrapper>
      <InvestigationsToggleButton handleClick={jest.fn()} {...props} />
    </TestWrapper>
  )

describe('InvestigationsToggleButton', () => {
  describe('when there are investigations', () => {
    describe('when section is expanded', () => {
      it('renders a button to hide investigations', () => {
        arrangeTest({
          totalCount: 5,
          isExpanded: true
        })

        expect(
          screen.getByTestId('InvestigationsToggleButton')
        ).toHaveTextContent('Hide Investigations')
      })
    })

    describe('when section is collapsed', () => {
      it('renders a button to show investigations', () => {
        arrangeTest({
          totalCount: 5,
          isExpanded: false
        })

        expect(
          screen.getByTestId('InvestigationsToggleButton')
        ).toHaveTextContent('Show Investigations (5)')
      })
    })
  })

  describe('when there are no investigations', () => {
    it('renders a disabled button', () => {
      arrangeTest({
        totalCount: 0,
        isExpanded: false
      })

      expect(
        screen.getByTestId('InvestigationsToggleButton')
      ).toHaveTextContent('Show Investigations (0)')
      expect(screen.getByTestId('InvestigationsToggleButton')).toBeDisabled()
    })
  })
})
