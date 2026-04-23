import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CallMenuItem from '.'

const arrangeTest = (props: ComponentProps<typeof CallMenuItem>) =>
  render(
    <TestWrapper>
      <div data-testid='CallMenuItem-wrapper'>
        <CallMenuItem {...props} />
      </div>
    </TestWrapper>
  )

describe('CallMenuItem', () => {
  describe('renders', () => {
    it('displays menu item when show', () => {
      const onClick = jest.fn()

      arrangeTest({
        show: true,
        onClick,
        disabled: false,
        label: 'Some Label'
      })

      expect(screen.getByText('Some Label')).toBeInTheDocument()
    })

    it('does not display menu item when is not show', () => {
      const onClick = jest.fn()

      arrangeTest({
        show: false,
        onClick,
        disabled: false,
        label: 'some label'
      })

      expect(screen.getByTestId('CallMenuItem-wrapper').firstChild).toBeNull()
    })
  })

  describe('when user click', () => {
    it('calls onClick', () => {
      const onClick = jest.fn()

      arrangeTest({
        show: true,
        onClick,
        disabled: false,
        label: 'some label'
      })

      fireEvent.click(screen.getByTestId('call-menu-item'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
