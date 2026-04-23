import React, { ReactNode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { Editable, InlineInput } from '../../components'

const EDITABLE_VALUE = 'some text'

const arrangeTest = (viewer?: string | ReactNode) => {
  const onChangeHandler = jest.fn()

  return {
    onChangeHandler,
    renderResult: render(
      <TestWrapper>
        <Editable<string>
          editor={InlineInput}
          value={EDITABLE_VALUE}
          viewer={viewer}
          onChange={onChangeHandler}
        />
      </TestWrapper>
    )
  }
}

describe('Editable component', () => {
  it('should have viewer in the document', () => {
    const VIEWER_TEST_ID = 'viewer-test-id'
    const viewer = <div data-testid={VIEWER_TEST_ID} />

    const {
      renderResult: { getByTestId }
    } = arrangeTest(viewer)

    // test if viewer (in this case typography component) is in the document
    expect(getByTestId(VIEWER_TEST_ID)).toBeInTheDocument()
  })

  it('should switch in edit mode and onChange should be called', () => {
    const {
      onChangeHandler,
      renderResult: { container }
    } = arrangeTest()

    let editButtonNode = container.querySelector('button')

    if (editButtonNode) {
      // trigger edit button for switching in edit mode
      fireEvent.click(editButtonNode)

      editButtonNode = container.querySelector('button')
      let editableInputNode = container.querySelector('input')

      // edit button should be hidden in edit mode
      // eslint-disable-next-line jest/no-conditional-expect
      expect(editButtonNode).not.toBeTruthy()

      // editable input must be visible in edit mode
      // eslint-disable-next-line jest/no-conditional-expect
      expect(editableInputNode).toBeTruthy()

      // onChange should be called
      if (editableInputNode) {
        // trigger enter key for switching in view mode
        fireEvent.keyDown(editableInputNode, { key: 'Enter', code: 13 })

        // expect change handler to be called
        // eslint-disable-next-line jest/no-conditional-expect
        expect(onChangeHandler).toHaveBeenCalled()

        editButtonNode = container.querySelector('button')
        editableInputNode = container.querySelector('input')

        // edit button should be visible again
        // eslint-disable-next-line jest/no-conditional-expect
        expect(editButtonNode).toBeTruthy()

        // editable button should not be shown
        // eslint-disable-next-line jest/no-conditional-expect
        expect(editableInputNode).not.toBeTruthy()
      }
    }
  })
})
