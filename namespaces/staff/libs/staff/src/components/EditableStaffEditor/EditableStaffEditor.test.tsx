import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'

import EditableStaffEditor from './EditableStaffEditor'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Select: jest.fn()
  }
}))

const defaultCurrentValue = {
  id: '2',
  fullName: 'Test User'
}

const defaultOptions = [
  { text: '1', value: '1' },
  { text: '2', value: '2' }
]

const arrangeTest = (props: ComponentProps<typeof EditableStaffEditor>) =>
  render(<EditableStaffEditor {...props} />)

const mockedSelect = Form.Select as unknown as jest.Mock
const commonProps = {
  name: 'test',
  disabled: false,
  onBlur: () => null,
  onChange: () => null
}

describe('EditableStaffEditor', () => {
  describe('when isSelectedOptionDisabled is true', () => {
    it('renders Select with disabled selected option', () => {
      mockedSelect.mockImplementation(jest.fn(() => null))
      const isSelectedOptionDisabled = true
      const value = '2'

      arrangeTest({
        value,
        isSelectedOptionDisabled,
        options: defaultOptions,
        currentValue: defaultCurrentValue,
        ...commonProps
      })

      expect(mockedSelect).toHaveBeenCalledTimes(1)
      expect(mockedSelect).toHaveBeenCalledWith(
        {
          ...commonProps,
          options: [
            {
              text: '1',
              value: '1'
            },
            {
              text: '2',
              value: '2',
              disabled: true
            }
          ],
          value,
          size: 'small',
          width: 'full'
        },
        {}
      )
    })
  })

  describe('when isSelectedOptionDisabled is false', () => {
    it('renders Select with all the enabled options', () => {
      mockedSelect.mockImplementation(jest.fn(() => null))
      const isSelectedOptionDisabled = false
      const value = '2'

      arrangeTest({
        value,
        isSelectedOptionDisabled,
        options: defaultOptions,
        currentValue: defaultCurrentValue,
        ...commonProps
      })

      expect(mockedSelect).toHaveBeenCalledTimes(1)
      expect(mockedSelect).toHaveBeenCalledWith(
        {
          ...commonProps,
          options: defaultOptions,
          value,
          size: 'small',
          width: 'full'
        },
        {}
      )
    })
  })
})
