import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useQuery } from '@staff-portal/data-layer-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import InviteNewStaffModal from './InviteNewStaffModal'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: () => <div data-testid='modal-suspender' />
}))
jest.mock(
  './components/InviteNewStaffModalContent/InviteNewStaffModalContent',
  () => ({
    __esModule: true,
    default: () => <div data-testid='invite-new-staff-modal-content' />
  })
)

const useQueryMock = useQuery as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <InviteNewStaffModal hideModal={() => {}} />
    </TestWrapper>
  )

describe('InviteNewStaffModal', () => {
  describe('when `useQuery` hook returns `loading` equals `true`', () => {
    it('renders ModalSuspender', () => {
      useQueryMock.mockReturnValue({ loading: true })
      renderComponent()

      expect(screen.getByTestId('modal-suspender')).toBeInTheDocument()
    })
  })

  describe('when `useQuery` hook returns hidden operation', () => {
    it('renders modal error message', () => {
      useQueryMock.mockReturnValue({
        data: {
          operations: {
            inviteStaff: createOperationMock({
              callable: OperationCallableTypes.HIDDEN,
              messages: ['hidden message']
            })
          }
        }
      })
      renderComponent()

      expect(screen.getByText('hidden message.')).toBeInTheDocument()
    })
  })

  describe('when `useQuery` hook returns enabled operation', () => {
    it('renders modal component', () => {
      useQueryMock.mockReturnValue({
        data: {
          operations: { inviteStaff: createOperationMock() }
        }
      })
      renderComponent()

      expect(
        screen.getByTestId('invite-new-staff-modal-content')
      ).toBeInTheDocument()
    })
  })
})
