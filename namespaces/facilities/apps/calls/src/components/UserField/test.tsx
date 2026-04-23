import React, { ComponentProps } from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useUpdateCallCounterparty } from './data'
import UserField from '.'

jest.unmock('@staff-portal/editable')
jest.mock('./components/UserFieldAutocomplete/data', () => ({
  __esModule: true,
  useGetUserFieldAutocomplete: () => ({
    getUsers: () => {},
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
}))

jest.mock('./data', () => ({
  __esModule: true,
  useGetCallCounterpartyNameValue: () => () => ({
    request: jest.fn(),
    data: 'some fullName',
    loading: false,
    called: false
  }),
  useUpdateCallCounterparty: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof UserField>) =>
  render(
    <TestWrapper>
      <UserField {...props} />
    </TestWrapper>
  )

describe('UserField', () => {
  describe('rendering', () => {
    beforeEach(() => {
      const mockuseUpdateCallCounterparty =
        useUpdateCallCounterparty as jest.Mock

      mockuseUpdateCallCounterparty.mockReturnValue([() => {}])
    })

    it('renders with "NO_VALUE"', () => {
      arrangeTest({
        callId: 'someCallId',
        initialValue: ''
      })

      expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('renders with full name', () => {
      arrangeTest({
        callId: 'someCallId',
        initialValue: 'some fullName'
      })

      expect(screen.getByText('some fullName')).toBeInTheDocument()
    })

    it('renders a link if profileUrl present', () => {
      arrangeTest({
        callId: 'someCallId',
        initialValue: 'some fullName',
        profileUrl: 'wwww.random.profile'
      })

      expect(screen.getByText('some fullName').closest('a')).toHaveAttribute(
        'href',
        'wwww.random.profile'
      )
    })
  })

  describe('on submit', () => {
    it('calls UpdateCallCounterparty with purposeId', async () => {
      const mockuseUpdateCallCounterparty =
        useUpdateCallCounterparty as jest.Mock
      const mutationCallMock = jest.fn().mockReturnValue(() => ({
        data: {
          updateCallCounterparty: true
        }
      }))

      mockuseUpdateCallCounterparty.mockReturnValue([mutationCallMock])

      arrangeTest({
        callId: 'someCallId',
        initialValue: 'some fullName'
      })
      fireEvent.click(
        screen.getByTestId('EditableField-toggle-button-fullName')
      )

      fireEvent.click(screen.getByTestId('users-autocomplete'))
      fireEvent.click(screen.getByText(/someName#2/i))

      await act(() => Promise.resolve())

      expect(mutationCallMock).toHaveBeenCalledTimes(1)
      expect(mutationCallMock).toHaveBeenCalledWith({
        variables: {
          input: {
            callId: 'someCallId',
            counterpartyId: 'someNameId#2'
          }
        }
      })
    })
  })
})
