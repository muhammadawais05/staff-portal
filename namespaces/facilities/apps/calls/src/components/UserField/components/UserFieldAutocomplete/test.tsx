import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetUserFieldAutocomplete } from './data'
import UserFieldAutocomplete from '.'

jest.mock('./data', () => ({
  __esModule: true,
  useGetUserFieldAutocomplete: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof UserFieldAutocomplete>) => {
  return render(
    <TestWrapper>
      <UserFieldAutocomplete {...props} />
    </TestWrapper>
  )
}

describe('UserFieldAutocomplete', () => {
  describe('on select', () => {
    it('calls onSelect with id', () => {
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

      const onSelect = jest.fn()

      arrangeTest({
        onSelect
      })
      fireEvent.click(screen.getByTestId('users-autocomplete'))
      fireEvent.click(screen.getByText(/someName#2/i))

      expect(onSelect).toHaveBeenCalledTimes(1)
      expect(onSelect).toHaveBeenCalledWith({ id: 'someNameId#2' })
    })
  })
})
