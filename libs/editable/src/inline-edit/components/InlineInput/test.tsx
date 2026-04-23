import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import InlineInput from './InlineInput'

const INPUT_VALUE = 'some value'

const arrangeTest = (required?: boolean) => {
  const onBlurHandler = jest.fn()
  const onChangeHandler = jest.fn()
  const onErrorHandler = jest.fn()
  const onResetHandler = jest.fn()

  return {
    renderResult: render(
      <TestWrapper>
        <InlineInput
          error={false}
          required={required}
          value={INPUT_VALUE}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onReset={onResetHandler}
          onError={onErrorHandler}
        />
      </TestWrapper>
    ),
    onChangeHandler,
    onErrorHandler,
    onResetHandler
  }
}

describe('InlineInput component', () => {
  it('default render', () => {
    const {
      renderResult: { container }
    } = arrangeTest()

    const editableInputNode = container.querySelector('input')

    // the editable input should be in the document
    expect(editableInputNode).toBeTruthy()

    if (editableInputNode) {
      // the editable input should have value set
      // eslint-disable-next-line jest/no-conditional-expect
      expect(editableInputNode.value).toBe(INPUT_VALUE)
    }
  })

  it('onReset should be called if escape is pressed', () => {
    const required = true
    const {
      onErrorHandler,
      onChangeHandler,
      onResetHandler,
      renderResult: { container }
    } = arrangeTest(required)

    const editableInputNode = container.querySelector('input')

    expect(editableInputNode).toBeTruthy()

    if (editableInputNode) {
      // fire escape button for this test
      fireEvent.keyDown(editableInputNode, { key: 'Escape', code: 27 })

      // if escape button is presses this should happen:
      // - change handler should not be called
      // - error handler should not be called
      // - reset handler should be called
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onChangeHandler).not.toHaveBeenCalled()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onErrorHandler).not.toHaveBeenCalled()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onResetHandler).toHaveBeenCalled()
    }
  })

  it('onChange should be called if enter is pressed', () => {
    const {
      onChangeHandler,
      onErrorHandler,
      onResetHandler,
      renderResult: { container }
    } = arrangeTest()

    const editableInputNode = container.querySelector('input')

    expect(editableInputNode).toBeTruthy()

    if (editableInputNode) {
      // fire enter button for this test
      fireEvent.keyDown(editableInputNode, { key: 'Enter', code: 13 })

      // if enter button is presses this should happen:
      // - change handler should be called
      // - error handler should not be called
      // - reset handler should not be called
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onChangeHandler).toHaveBeenCalled()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onErrorHandler).not.toHaveBeenCalled()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onResetHandler).not.toHaveBeenCalled()
    }
  })

  it('onChange should not be called if enter is pressed and value is empty and required', () => {
    const required = true

    const {
      onChangeHandler,
      onErrorHandler,
      onResetHandler,
      renderResult: { container }
    } = arrangeTest(required)

    const inputNode = container.querySelector('input')

    expect(inputNode).toBeTruthy()

    if (inputNode) {
      // change input value to be empty
      fireEvent.change(inputNode, { target: { value: '' } })

      // trigger enter key press
      fireEvent.keyDown(inputNode, { key: 'Enter', code: 13 })

      // in this case only error handler should be called because value is required
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onChangeHandler).not.toHaveBeenCalled()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onResetHandler).not.toHaveBeenCalled()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onErrorHandler).toHaveBeenCalled()
    }
  })
})
