import React, { ComponentProps } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetUserFieldAutocomplete } from '../UserFieldAutocomplete/data'
import UserFieldEditor from '.'

jest.mock('../UserFieldAutocomplete/data', () => ({
  __esModule: true,
  useGetUserFieldAutocomplete: jest.fn()
}))

jest.mock('@toptal/picasso-forms', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof UserFieldEditor>) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <Form
        onSubmit={() => {}}
        initialValues={{
          fullName: props.value
        }}
      >
        <UserFieldEditor {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('UserFieldEditor', () => {
  describe('rendering', () => {
    it('renders autocomplete input', () => {
      const mockuseGetUserFieldAutocomplete =
        useGetUserFieldAutocomplete as jest.Mock

      mockuseGetUserFieldAutocomplete.mockReturnValue({
        getUsers: () => {},
        loading: false,
        data: []
      })

      arrangeTest({
        value: 'someName',
        name: 'fullName',
        disabled: false,
        onBlur: jest.fn(),
        onChange: jest.fn(),
        options: undefined
      })

      expect(screen.getByTestId('users-autocomplete')).toBeInTheDocument()
    })
  })

  describe('on submit', () => {
    it('calls form change', () => {
      const mockuseGetUserFieldAutocomplete =
        useGetUserFieldAutocomplete as jest.Mock
      const getUsers = jest.fn()

      mockuseGetUserFieldAutocomplete.mockReturnValue({
        getUsers,
        loading: false,
        data: [
          {
            label: 'someName#2',
            node: {
              id: 'someNameId#2'
            }
          },
          {
            label: 'someName#3',
            node: {
              id: 'someNameId#3'
            }
          }
        ]
      })

      const mockUseForm = useForm as jest.Mock
      const onChangeForm = jest.fn()

      mockUseForm.mockReturnValue({
        change: onChangeForm
      })
      const onChange = jest.fn()

      arrangeTest({
        value: 'someName',
        name: 'fullName',
        disabled: false,
        onBlur: jest.fn(),
        onChange,
        options: undefined
      })
      fireEvent.click(screen.getByTestId('users-autocomplete'))
      fireEvent.click(screen.getByText(/someName#2/i))

      expect(onChangeForm).toHaveBeenCalledTimes(1)
      expect(onChangeForm).toHaveBeenCalledWith('fullName', 'someNameId#2')
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })
})
