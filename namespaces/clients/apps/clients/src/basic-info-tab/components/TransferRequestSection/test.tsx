import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetTransferRequest } from './data'
import TransferRequestSection from './TransferRequestSection'
import { createTransferRequestMock } from './data/mocks'

jest.mock('./data')
const useGetTransferRequestMock = useGetTransferRequest as jest.Mock

jest.mock('./components/TransferRequestList/TransferRequestList', () => ({
  __esModule: true,
  default: () => <div data-testid='TransferRequestList' />
}))

const COMPANY_ID = 'company-123'

const arrangeTest = (
  result: Partial<ReturnType<typeof useGetTransferRequest>> = {}
) => {
  useGetTransferRequestMock.mockReturnValue({
    transferRequests: [],
    loading: false,
    initialLoading: false,
    ...result
  } as ReturnType<typeof useGetTransferRequest>)

  render(
    <TestWrapper>
      <TransferRequestSection companyId={COMPANY_ID} />
    </TestWrapper>
  )
}

describe('TransferRequestSection', () => {
  describe('when initially loading', () => {
    it('displays section with skeleton loader only', () => {
      arrangeTest({
        transferRequests: [],
        loading: true,
        initialLoading: true
      })

      expect(
        screen.getByTestId('TransferRequestListSkeleton')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('TransferRequestList')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `transferRequests` exists', () => {
    it('displays section with data list', () => {
      arrangeTest({
        transferRequests: [createTransferRequestMock()]
      })

      expect(
        screen.queryByTestId('TransferRequestListSkeleton')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('TransferRequestList')).toBeInTheDocument()
    })
  })
})
