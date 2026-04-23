import React from 'react'
import { Form, useField, useForm } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Item } from '@toptal/picasso/TagSelector'

import TagInput from './TagInput'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn(),
  useField: jest.fn()
}))
const mockUseForm = useForm as jest.Mock
const mockUseField = useField as jest.Mock

const INPUT_NAME = 'tag-input'
const INPUT_LABEL = 'Label'

const arrangeTest = ({
  value,
  onChange
}: {
  value: Item[]
  onChange: () => void
}) => {
  mockUseForm.mockReturnValue({
    change: onChange
  })
  mockUseField.mockReturnValue({
    input: {
      value
    }
  })

  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <TagInput name={INPUT_NAME} label={INPUT_LABEL} />
      </Form>
    </TestWrapper>
  )
}

describe('TagInput', () => {
  it('updates form values on `enter` key press', () => {
    const onChange = jest.fn()

    arrangeTest({ value: [], onChange })

    fireEvent.change(screen.getByLabelText(INPUT_LABEL), {
      target: {
        value: '   Updated-value   '
      }
    })
    fireEvent.keyDown(screen.getByLabelText(INPUT_LABEL), {
      key: 'Enter',
      code: 13
    })

    expect(onChange).toHaveBeenCalledWith(INPUT_NAME, [
      {
        value: 'updated-value',
        text: 'Updated-value'
      }
    ])
  })

  describe('when new value is empty', () => {
    it('does not update form values on `enter` key press', () => {
      const onChange = jest.fn()

      arrangeTest({ value: [], onChange })

      fireEvent.change(screen.getByLabelText(INPUT_LABEL), {
        target: {
          value: ''
        }
      })
      fireEvent.keyDown(screen.getByLabelText(INPUT_LABEL), {
        key: 'Enter',
        code: 13
      })

      expect(onChange).toHaveBeenCalledTimes(0)
    })
  })

  describe('when new value is duplicated', () => {
    it.each(['some-value-1', '   Some-value-1   '])(
      'does not update form values on `enter` key press',
      newValue => {
        const onChange = jest.fn()

        arrangeTest({
          value: [
            {
              value: 'some-value-1',
              text: 'Some-text-1'
            },
            {
              value: 'some-value-2',
              text: 'Some-text-2'
            }
          ],
          onChange
        })

        fireEvent.change(screen.getByLabelText(INPUT_LABEL), {
          target: {
            value: newValue
          }
        })
        fireEvent.keyDown(screen.getByLabelText(INPUT_LABEL), {
          key: 'Enter',
          code: 13
        })

        expect(onChange).toHaveBeenCalledTimes(0)
      }
    )
  })
})
