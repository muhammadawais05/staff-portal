import React from 'react'
import { render } from '@testing-library/react'
import { useField } from '@toptal/picasso-forms'

import { ExpirationTypeInputs } from './ExpirationTypeInputs'

jest.mock('@toptal/picasso-forms', () => ({
  __esModule: true,
  Form: {
    NumberInput: () => <>NumberInput</>
  },
  useField: jest.fn()
}))
jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  FormDatePickerWrapper: () => <>DatePicker</>
}))

const arrangeTest = () => render(<ExpirationTypeInputs />)

describe('ExpirationTypeInputs', () => {
  const mockedUseField = useField as jest.Mock

  it('renders `DatePicker` input', () => {
    mockedUseField.mockImplementationOnce(() => ({
      input: { value: 'BY_DATE' }
    }))
    const { container } = arrangeTest()

    expect(container.textContent).toContain('DatePicker')
  })

  it('renders `NumberInput` input', () => {
    mockedUseField.mockImplementationOnce(() => ({
      input: { value: 'BY_AMOUNT' }
    }))
    const { container } = arrangeTest()

    expect(container.textContent).toContain('NumberInput')
  })
})
