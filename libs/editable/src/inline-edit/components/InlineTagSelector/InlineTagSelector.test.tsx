import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import { TestWrapper } from '@staff-portal/test-utils'

import InlineTagSelector from './InlineTagSelector'

const arrangeTest = ({
  required,
  value,
  options = []
}: {
  required?: boolean
  value?: Item[]
  options?: Item[]
} = {}) => {
  const onChangeHandler = jest.fn()
  const onResetHandler = jest.fn()
  const setSelectedValuesHandler = jest.fn()

  return {
    renderResult: render(
      <TestWrapper>
        <Form onSubmit={onChangeHandler}>
          <InlineTagSelector
            name='test'
            error={false}
            required={required}
            value={value}
            options={options}
            onReset={onResetHandler}
            setSelectedValues={setSelectedValuesHandler}
          />
        </Form>
      </TestWrapper>
    ),
    onChangeHandler,
    setSelectedValuesHandler,
    onResetHandler
  }
}

describe('InlineTagSelector', () => {
  it('renders initial tags', () => {
    const options = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' }
    ]

    arrangeTest({ options, value: [options[1]] })

    expect(screen.getByText(options[0].text as string)).toBeInTheDocument()
    expect(screen.getByText(options[1].text as string)).toBeInTheDocument()
  })

  it('displays all options', () => {
    const options = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' },
      { text: 'Diana', value: '789' }
    ]

    arrangeTest({ options, value: [options[0]] })

    const editableInputNode = document.querySelector(
      'input'
    ) as HTMLInputElement

    fireEvent.click(editableInputNode)

    expect(screen.getByText(options[1].text)).toBeInTheDocument()
    expect(screen.getByText(options[2].text)).toBeInTheDocument()
  })

  it('calls setSelectedValues when an option is selected', () => {
    const options = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' },
      { text: 'Diana', value: '789' }
    ]

    const { setSelectedValuesHandler } = arrangeTest({
      options
    })

    const editableInputNode = document.querySelector(
      'input'
    ) as HTMLInputElement

    fireEvent.click(editableInputNode)
    fireEvent.click(screen.getByText(options[2].text))

    expect(setSelectedValuesHandler).toHaveBeenCalledWith([options[2]])
  })

  it('submits the form when submit button is clicked', async () => {
    const options = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' },
      { text: 'Diana', value: '789' }
    ]

    const { onChangeHandler } = arrangeTest({
      options,
      value: [options[2]]
    })

    const editableInputNode = document.querySelector(
      'input'
    ) as HTMLInputElement

    await act(async () => {
      fireEvent.click(editableInputNode)
      fireEvent.click(screen.getByText(options[2].text))
      fireEvent.click(screen.getByTestId('inline-tagselector-editor-submit'))
    })

    expect(onChangeHandler).toHaveBeenCalledWith(
      { test: [options[2]] },
      expect.anything(),
      expect.anything()
    )
  })

  it('calls onReset when reset button is clicked', () => {
    const options = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' },
      { text: 'Diana', value: '789' }
    ]

    const { onResetHandler } = arrangeTest({
      options
    })

    fireEvent.click(screen.getByTestId('inline-tagselector-editor-cancel'))

    expect(onResetHandler).toHaveBeenCalled()
  })
})
