import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import ViewBillingOptionsContainer from './ViewBillingOptionsContainer'
import { useGetBillingPermits } from './data'

jest.mock('./data', () => ({
  useGetBillingPermits: jest.fn()
}))

const Test = jest.fn()

const renderComponent = () =>
  render(
    <TestWrapper>
      <ViewBillingOptionsContainer skeletonRowsSize={1}>
        <Test />
      </ViewBillingOptionsContainer>
    </TestWrapper>
  )

const mockedUseGetBillingPermits = useGetBillingPermits as jest.Mock

describe('ViewBillingOptionsContainer', () => {
  beforeEach(() => Test.mockReturnValueOnce(null))

  describe('when permissions not loaded yet', () => {
    it('does not render child component', () => {
      mockedUseGetBillingPermits.mockReturnValueOnce({
        loading: true,
        initialLoading: true
      })

      renderComponent()

      expect(Test).toHaveBeenCalledTimes(0)
    })
  })

  describe('when permissions loaded, but user is not allowed to view a section', () => {
    it('does not render child component', () => {
      mockedUseGetBillingPermits.mockReturnValueOnce({
        loading: false,
        initialLoading: false,
        permits: {
          canViewBillingOptions: false
        }
      })

      renderComponent()

      expect(Test).toHaveBeenCalledTimes(0)
    })
  })

  describe('when permissions loaded and user is allowed to view a section', () => {
    it('renders child component', () => {
      mockedUseGetBillingPermits.mockReturnValueOnce({
        loading: false,
        initialLoading: false,
        permits: {
          canViewBillingOptions: true
        }
      })

      renderComponent()

      expect(Test).toHaveBeenCalledTimes(1)
    })
  })
})
