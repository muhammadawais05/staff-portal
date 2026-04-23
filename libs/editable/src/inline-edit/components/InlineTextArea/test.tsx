import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import InlineTextArea, { InlineTextAreaProps } from './InlineTextArea'

const emptyHandlers = {
  onChange: () => null,
  onReset: () => null
}

const arrangeTest = (props: InlineTextAreaProps = emptyHandlers) =>
  render(
    <TestWrapper>
      <InlineTextArea {...props} value={props.value || 'default value'} />
    </TestWrapper>
  )

describe('InlineTextArea', () => {
  it('renders provided value (in textarea), Submit, and Cancel buttons', () => {
    const VALUE = 'Test Value dkd82d'

    arrangeTest({ value: VALUE, ...emptyHandlers })

    expect(
      screen.getByTestId('inline-textarea-editor-input')
    ).toHaveDisplayValue(VALUE)
    expect(
      screen.getByTestId('inline-textarea-editor-submit')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('inline-textarea-editor-cancel')
    ).toBeInTheDocument()
  })

  describe('when Submit button is pressed', () => {
    it('calls onChange', () => {
      const INPUT_VALUE = 'Test Value dhc72s'
      const ON_CHANGE = jest.fn()
      const ON_RESET = jest.fn()

      arrangeTest({ onChange: ON_CHANGE, onReset: ON_RESET })
      fireEvent.change(screen.getByTestId('inline-textarea-editor-input'), {
        target: { value: INPUT_VALUE }
      })
      fireEvent.click(screen.getByTestId('inline-textarea-editor-submit'))
      expect(ON_CHANGE).toHaveBeenCalledWith(INPUT_VALUE)
      expect(ON_RESET).not.toHaveBeenCalled()
    })
  })

  describe('when Cancel button is pressed', () => {
    it('calls onReset', () => {
      const ON_CHANGE = jest.fn()
      const ON_RESET = jest.fn()

      arrangeTest({ onChange: ON_CHANGE, onReset: ON_RESET })

      fireEvent.click(screen.getByTestId('inline-textarea-editor-cancel'))
      expect(ON_CHANGE).not.toHaveBeenCalled()
      expect(ON_RESET).toHaveBeenCalled()
    })
  })

  describe('when input is required and no value is entered', () => {
    it('disables the Submit button', () => {
      arrangeTest({ ...emptyHandlers, required: true })

      fireEvent.change(screen.getByTestId('inline-textarea-editor-input'), {
        target: { value: '' }
      })
      const submitButton = screen.getByTestId('inline-textarea-editor-submit')

      expect(submitButton).toBeDisabled()
    })
  })

  describe('when Escape key is pressed', () => {
    it('calls onReset', () => {
      const ON_CHANGE = jest.fn()
      const ON_RESET = jest.fn()

      arrangeTest({ onChange: ON_CHANGE, onReset: ON_RESET })

      fireEvent.keyDown(screen.getByTestId('inline-textarea-editor-input'), {
        key: 'Escape',
        code: 27
      })
      expect(ON_CHANGE).not.toHaveBeenCalled()
      expect(ON_RESET).toHaveBeenCalled()
    })
  })
})
