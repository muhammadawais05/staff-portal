import React from 'react'
import { render } from '@testing-library/react'
import { useField, Form } from '@toptal/picasso-forms'

import CustomSignerFields from './CustomSignerFields'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useField: jest.fn(),
  Form: {
    Input: jest.fn()
  }
}))

const useFieldMock = useField as jest.Mock
const FormInputMock = Form.Input as unknown as jest.Mock

describe('CustomSignerFields', () => {
  beforeEach(() => {
    FormInputMock.mockReturnValue(null)
  })

  it('subscribes to "customSigner" field', () => {
    const useFieldReturnValue = { input: {} }

    useFieldMock.mockReturnValue(useFieldReturnValue)

    render(<CustomSignerFields />)

    expect(useFieldMock).toHaveBeenCalledTimes(1)
    expect(useFieldMock).toHaveBeenCalledWith('customSigner')
  })

  describe('when "customSigner" field is "true"', () => {
    it('renders two inputs', () => {
      const useFieldReturnValue = { input: { value: 'true' } }

      useFieldMock.mockReturnValue(useFieldReturnValue)

      render(<CustomSignerFields />)

      expect(FormInputMock).toHaveBeenCalledTimes(2)
      expect(FormInputMock).toHaveBeenNthCalledWith(
        1,
        {
          name: 'signerFullName',
          label: 'Full Name:',
          required: true
        },
        {}
      )
      expect(FormInputMock).toHaveBeenNthCalledWith(
        2,
        {
          name: 'signerEmail',
          label: 'Email:',
          required: true
        },
        {}
      )
    })
  })

  describe('when "customSigner" field is not "true"', () => {
    it.each(['false', null, {}])('renders null', value => {
      const useFieldReturnValue = { input: { value } }

      useFieldMock.mockReturnValue(useFieldReturnValue)

      const { container } = render(<CustomSignerFields />)

      expect(container.firstChild).toBeNull()
      expect(FormInputMock).toHaveBeenCalledTimes(0)
    })
  })
})
