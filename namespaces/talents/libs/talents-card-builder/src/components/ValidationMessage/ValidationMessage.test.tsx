import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import ValidationMessage, { ValidationMessageProps } from './ValidationMessage'

const renderComponent = (
  props: Pick<
    ValidationMessageProps,
    'message' | 'requirementMeet' | 'hasErrors'
  >
) =>
  render(
    <TestWrapper>
      <ValidationMessage {...props} />
    </TestWrapper>
  )

describe('ValidationMessage', () => {
  const message = 'This is a message'

  it('renders the message', () => {
    renderComponent({
      message,
      hasErrors: false,
      requirementMeet: false
    })

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  describe('when requirements are meet', () => {
    it('renders green icon and black text', () => {
      renderComponent({
        message,
        hasErrors: false,
        requirementMeet: true
      })

      expect(screen.getByTestId('green-check-icon')).toBeInTheDocument()
      expect(screen.getByTestId('black-message')).toBeInTheDocument()
    })
  })

  describe('when error exists', () => {
    it('renders red icon and text', () => {
      renderComponent({
        message,
        hasErrors: true,
        requirementMeet: false
      })

      expect(screen.getByTestId('red-close-icon')).toBeInTheDocument()
      expect(screen.getByTestId('red-message')).toBeInTheDocument()
    })
  })

  describe('when no errors and no requirements are meet', () => {
    it('renders black icon and text', () => {
      renderComponent({
        message,
        hasErrors: false,
        requirementMeet: false
      })

      expect(screen.getByTestId('black-close-icon')).toBeInTheDocument()
      expect(screen.getByTestId('black-message')).toBeInTheDocument()
    })
  })
})
