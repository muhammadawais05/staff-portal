import React, { ComponentProps } from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useUpdateCallPurpose } from './data'
import EditableCallPurposeCell from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./data', () => ({
  __esModule: true,
  useUpdateCallPurpose: jest.fn(),
  getCallPurposesOptionsHook: () => () => ({
    request: jest.fn(),
    data: [
      {
        name: 'name#1',
        id: 'nodeId#1',
        counterpartyType: 'CLIENT',
        viewOrder: 1
      }
    ],
    loading: false
  }),
  getCallValuesHook: () => () => ({
    request: jest.fn(),
    data: {
      purpose: 'somePurpose'
    },
    loading: false,
    called: false
  })
}))

const arrangeTest = (props: ComponentProps<typeof EditableCallPurposeCell>) =>
  render(
    <TestWrapper>
      <EditableCallPurposeCell {...props} />
    </TestWrapper>
  )

describe('EditableCallPurposeCell', () => {
  describe('rendering', () => {
    it('renders with "NO_VALUE"', () => {
      const mockUseUpdateCallPurpose = useUpdateCallPurpose as jest.Mock

      mockUseUpdateCallPurpose.mockReturnValue([() => {}])

      arrangeTest({
        customPurpose: '',
        purpose: '',
        callId: 'someCallId',
        counterparty: {
          phoneNumber: 'somePHoneNumber',
          roleId: 'roleId',
          roleType: 'roleType',
          fullName: 'full name'
        }
      })

      expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('renders with purpose', () => {
      const mockUseUpdateCallPurpose = useUpdateCallPurpose as jest.Mock

      mockUseUpdateCallPurpose.mockReturnValue([() => {}])

      arrangeTest({
        customPurpose: 'somecustomPurpose',
        purpose: 'somepurpose',
        callId: 'someCallId',
        counterparty: {
          phoneNumber: 'somePHoneNumber',
          roleId: 'roleId',
          roleType: 'roleType',
          fullName: 'full name'
        }
      })

      expect(screen.getByText('somepurpose')).toBeInTheDocument()
    })

    it('renders with customPurpose', () => {
      const mockUseUpdateCallPurpose = useUpdateCallPurpose as jest.Mock

      mockUseUpdateCallPurpose.mockReturnValue([() => {}])

      arrangeTest({
        customPurpose: 'somecustomPurpose',
        purpose: '',
        callId: 'someCallId',
        counterparty: {
          phoneNumber: 'somePHoneNumber',
          roleId: 'roleId',
          roleType: 'roleType',
          fullName: 'full name'
        }
      })

      expect(screen.getByText('somecustomPurpose')).toBeInTheDocument()
    })
  })

  describe('on submit', () => {
    it('calls UpdateCallPurpose with purposeId', async () => {
      const mockUseUpdateCallPurpose = useUpdateCallPurpose as jest.Mock
      const mutationCallMock = jest.fn(() => ({
        data: { updateCallPurpose: { success: true } }
      }))

      mockUseUpdateCallPurpose.mockReturnValue([mutationCallMock])

      arrangeTest({
        customPurpose: '',
        purpose: '',
        callId: 'someCallId',
        counterparty: {
          phoneNumber: 'somePHoneNumber',
          roleId: 'roleId',
          roleType: 'roleType',
          fullName: 'full name'
        }
      })
      fireEvent.click(screen.getByTestId('EditableField-toggle-button-purpose'))

      fireEvent.change(
        screen
          .getByTestId('select-purpose')
          .querySelector('input') as HTMLInputElement,
        {
          target: { value: 'nodeId#1' }
        }
      )

      await act(() => Promise.resolve())

      expect(mutationCallMock).toHaveBeenCalledTimes(1)
      expect(mutationCallMock).toHaveBeenCalledWith({
        variables: {
          input: {
            callId: 'someCallId',
            purposeId: 'nodeId#1'
          }
        }
      })
    })

    it('calls UpdateCallPurpose with customPurpose', async () => {
      const mockUseUpdateCallPurpose = useUpdateCallPurpose as jest.Mock
      const mutationCallMock = jest.fn(() => ({
        data: { updateCallPurpose: { success: true } }
      }))

      mockUseUpdateCallPurpose.mockReturnValue([mutationCallMock])

      arrangeTest({
        customPurpose: 'customValue',
        purpose: '',
        callId: 'someCallId',
        counterparty: {
          phoneNumber: 'somePHoneNumber',
          roleId: 'roleId',
          roleType: 'roleType',
          fullName: 'full name'
        }
      })
      fireEvent.click(screen.getByTestId('EditableField-toggle-button-purpose'))

      fireEvent.change(
        screen
          .getByTestId('text-input-purpose')
          .querySelector('input') as HTMLInputElement,
        {
          target: { value: 'newCustomValue' }
        }
      )

      fireEvent.click(screen.getByTestId('button-input-purpose'))

      await act(() => Promise.resolve())

      expect(mutationCallMock).toHaveBeenCalledTimes(1)
      expect(mutationCallMock).toHaveBeenCalledWith({
        variables: {
          input: {
            callId: 'someCallId',
            customPurpose: 'newCustomValue'
          }
        }
      })
    })
  })
})
