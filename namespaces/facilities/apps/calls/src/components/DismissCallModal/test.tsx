import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DismissCallModal from '.'

const arrangeTest = (props: ComponentProps<typeof DismissCallModal>) =>
  render(
    <TestWrapper>
      <DismissCallModal {...props} />
    </TestWrapper>
  )

describe('DismissCallModal', () => {
  describe('when user dismisses', () => {
    it('calls onSubmit', () => {
      const onSubmit = jest.fn()
      const hideModal = jest.fn()

      arrangeTest({
        onSubmit,
        hideModal,
        loading: false
      })

      fireEvent.click(screen.getByTestId('dismiss-button'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('does not calls onSubmit when loading', () => {
      const onSubmit = jest.fn()
      const hideModal = jest.fn()

      arrangeTest({
        onSubmit,
        hideModal,
        loading: true
      })

      fireEvent.click(screen.getByTestId('dismiss-button'))

      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe('when user close modal', () => {
    it('calls hideModal', () => {
      const onSubmit = jest.fn()
      const hideModal = jest.fn()

      arrangeTest({
        onSubmit,
        hideModal,
        loading: false
      })

      fireEvent.click(screen.getByTestId('dismiss-cancel-button'))

      expect(hideModal).toHaveBeenCalledTimes(1)
    })
  })
})
