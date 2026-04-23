import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { CompanyCallRequests } from '@staff-portal/clients-call-requests'

import CallRequestsSection from './CallRequestsSection'
import { useGetCompanyCallbackRequests } from './data'

jest.mock('@staff-portal/clients-call-requests', () => ({
  CompanyCallRequests: jest.fn()
}))
jest.mock('./data', () => ({
  useGetCompanyCallbackRequests: jest.fn()
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CallRequestsSection companyId='test-id' />
    </TestWrapper>
  )

const mockedUseGetCompanyCallbackRequests =
  useGetCompanyCallbackRequests as jest.Mock
const mockedCompanyCallRequests = CompanyCallRequests as jest.Mock

describe('CallRequestsSection', () => {
  describe('when loading callback requests', () => {
    it('shows skeleton', () => {
      mockedUseGetCompanyCallbackRequests.mockReturnValueOnce({
        loading: true,
        initialLoading: true
      })

      arrangeTest()

      expect(
        screen.getByTestId('CallRequestsSectionSkeleton')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('CallRequestsSection-section')).toBeNull()
    })
  })

  describe('when callback requests loaded', () => {
    it('shows callback requests section', () => {
      const callbackRequests = [{}]

      mockedUseGetCompanyCallbackRequests.mockReturnValueOnce({
        loading: false,
        initialLoading: false,
        callbackRequests
      })
      mockedCompanyCallRequests.mockReturnValueOnce(null)

      arrangeTest()

      expect(screen.queryByTestId('CallRequestsSectionSkeleton')).toBeNull()
      expect(
        screen.getByTestId('CallRequestsSection-section')
      ).toBeInTheDocument()
      expect(mockedCompanyCallRequests).toHaveBeenCalledTimes(1)
      expect(mockedCompanyCallRequests).toHaveBeenCalledWith(
        {
          callbackRequests
        },
        {}
      )
    })
  })
})
