import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ConsolidationDefaultsTable from '.'

jest.mock('@apollo/client')
jest.mock('../../data', () => ({
  useGetConsolidationDefaults: jest
    .fn()
    .mockReturnValue({
      data: {
        consolidationDefaults: {
          nodes: [
            {
              id: 2,
              engagements: {
                nodes: [{ isWorking: true }]
              }
            },
            {
              id: 3,
              engagements: {
                nodes: [{ isWorking: false }]
              }
            }
          ]
        }
      },
      loading: false,
      initialLoading: false,
      refetch: jest.fn()
    })
    .mockReturnValueOnce({
      data: undefined
    })
    .mockReturnValueOnce({
      data: {
        consolidationDefaults: {
          nodes: [{ id: 2, engagements: { nodes: [{ isWorking: false }] } }]
        }
      }
    })
}))

jest.mock('../ConsolidationDefaultsTableRow')

const render = (
  props?: Pick<ComponentProps<typeof ConsolidationDefaultsTable>, 'showExpired'>
) => renderComponent(<ConsolidationDefaultsTable clientId='123' {...props} />)

describe('ConsolidationDefaultsTable', () => {
  describe('when there is no data', () => {
    it('does not show table', () => {
      const { queryByTestId } = render()

      expect(
        queryByTestId('ConsolidationDefaultsTableRow')
      ).not.toBeInTheDocument()
    })
  })

  describe('when showExpired is false', () => {
    it('does not display expired rows', () => {
      const { queryByTestId } = render({ showExpired: false })

      expect(
        queryByTestId('ConsolidationDefaultsTableRow')
      ).not.toBeInTheDocument()
    })
  })

  describe('when showExpired is true', () => {
    it('displays expired rows', () => {
      const { queryByTestId } = render({ showExpired: true })

      expect(queryByTestId('ConsolidationDefaultsTableRow')).toBeInTheDocument()
    })
  })
})
