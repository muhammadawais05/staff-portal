import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SelectOption } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import InlineSelect from './InlineSelect'

const arrangeTest = ({
  required,
  value,
  options = []
}: {
  required?: boolean
  value?: string | number
  options?: SelectOption[]
}) => {
  const onBlurHandler = jest.fn()
  const onChangeHandler = jest.fn()
  const onErrorHandler = jest.fn()
  const onResetHandler = jest.fn()

  return {
    renderResult: render(
      <TestWrapper>
        <InlineSelect
          error={false}
          required={required}
          value={value}
          options={options}
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

describe('InlineSelect component', () => {
  it('renders select input with default value', () => {
    const options: SelectOption[] = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' }
    ]

    arrangeTest({ options, value: options[1].value })

    const editableInputNode = document.querySelector(
      'input'
    ) as HTMLInputElement

    // the editable input should be in the document
    expect(editableInputNode).toBeTruthy()
    // the default value should be set (in this case it's the text)
    expect(editableInputNode.value).toBe(options[1].text)
  })

  it('displays all options', () => {
    const options: SelectOption[] = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' },
      { text: 'Diana', value: '789' }
    ]

    arrangeTest({ options, value: options[1].value })

    const editableInputNode = document.querySelector(
      'input'
    ) as HTMLInputElement

    fireEvent.click(editableInputNode)
    expect(screen.getByText(options[0].text)).toBeInTheDocument()
    expect(screen.getByText(options[1].text)).toBeInTheDocument()
    expect(screen.getByText(options[2].text)).toBeInTheDocument()
  })

  it('onChange should be called when an option is selected', async () => {
    const options: SelectOption[] = [
      { text: 'John', value: '123' },
      { text: 'Robert', value: '456' },
      { text: 'Diana', value: '789' }
    ]

    const { onChangeHandler } = arrangeTest({
      options,
      value: options[1].value
    })

    const editableInputNode = document.querySelector(
      'input'
    ) as HTMLInputElement

    fireEvent.click(editableInputNode)
    fireEvent.click(screen.getByText(options[2].text))

    expect(onChangeHandler).toHaveBeenCalledWith(options[2].value)
  })
})
