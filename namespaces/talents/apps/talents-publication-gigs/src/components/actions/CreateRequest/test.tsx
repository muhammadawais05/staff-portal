import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetPublicationOperations } from '@staff-portal/talents-gigs'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import CreateRequest from './CreateRequest'
import RequestModal from '../RequestModal'

jest.mock('@staff-portal/talents-gigs', () => ({
  useGetPublicationOperations: jest.fn()
}))

jest.mock('../RequestModal', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedUseGetPublicationOperations =
  useGetPublicationOperations as jest.Mock

const mockedRequestModal = RequestModal as jest.Mock

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <CreateRequest />
    </TestWrapper>
  )
}

describe('CompleteRequest', () => {
  beforeEach(() => {
    mockedUseGetPublicationOperations.mockReturnValue({
      operations: {
        createPublicationGig: {
          callable: OperationCallableTypes.ENABLED
        }
      }
    })

    mockedRequestModal.mockReturnValue(<div data-testid='request-modal' />)
  })

  describe('renders based on operation status', () => {
    it('renders for enabled operation', () => {
      arrangeTest()

      expect(screen.getByTestId('create-request-button')).toBeInTheDocument()
      expect(screen.getByTestId('request-modal')).toBeInTheDocument()
    })

    it('renders for disabled operation', () => {
      mockedUseGetPublicationOperations.mockReturnValue({
        operations: {
          createPublicationGig: {
            callable: OperationCallableTypes.DISABLED
          }
        }
      })
      arrangeTest()

      expect(screen.getByTestId('create-request-button')).toBeInTheDocument()
      expect(screen.getByTestId('create-request-button')).toHaveAttribute(
        'disabled'
      )
      expect(screen.getByTestId('request-modal')).toBeInTheDocument()
    })

    it('renders for hidden operation', () => {
      mockedUseGetPublicationOperations.mockReturnValue({
        operations: {
          createPublicationGig: {
            callable: OperationCallableTypes.HIDDEN
          }
        }
      })
      arrangeTest()

      expect(screen.getByTestId('create-request-button')).toBeInTheDocument()
      expect(screen.getByTestId('create-request-button')).toHaveAttribute(
        'disabled'
      )
      expect(screen.getByTestId('request-modal')).toBeInTheDocument()
    })
  })

  it('handles button click', () => {
    arrangeTest()

    act(() => {
      fireEvent.click(screen.getByTestId('create-request-button'))
    })

    expect(mockedRequestModal).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
      {}
    )
  })
})
