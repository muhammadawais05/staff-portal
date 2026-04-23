import { useQuery } from '@apollo/client'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import StaffOverviewPage from '.'

const mockShowError = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({
    showError: mockShowError
  })
}))
jest.mock('@apollo/client')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('./data/get-billing-overview-details.graphql', () => ({
  useGetBillingOverviewDetails: () => ({
    manageesHaveSupervisedCompanies: false
  })
}))

const render = (props?: ComponentProps<typeof StaffOverviewPage>) =>
  renderComponent(<StaffOverviewPage {...props} />)

describe('StaffOverviewPage', () => {
  beforeEach(() => mockShowError.mockClear())

  describe('when data exist', () => {
    it('default render', () => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: { overview: fixtures.MockEntOverviewMy },
        error: false,
        loading: false
      })
      const { container } = render()

      expect(container).toMatchSnapshot()
    })
  })

  describe('when data is null', () => {
    it('render null', () => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: { overview: null },
        error: false,
        loading: false
      })

      const { container } = render()

      expect(container).toMatchSnapshot()
    })
  })

  describe('when data is undefined', () => {
    it('render undefined', () => {
      ;(useQuery as jest.Mock).mockReturnValue({
        data: { overview: undefined },
        error: false,
        loading: false
      })

      const { container } = render()

      expect(container).toMatchSnapshot()
    })
  })
})
