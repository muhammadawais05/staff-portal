import React, { ComponentProps } from 'react'
import { noop } from '@toptal/picasso/utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import PlacementFeesList from '.'
import { useGetPlacementFeesQuery } from '../../../placementFees/data/getPlacementFees.graphql.types'

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../../../placementFees/data/getPlacementFees.graphql.types')
jest.mock('../PlacementFeesAddInlineForm')

const mockedUseGetPlacementFeesQuery = useGetPlacementFeesQuery as jest.Mock

const render = (props: ComponentProps<typeof PlacementFeesList>) =>
  renderComponent(<PlacementFeesList {...props} />)

describe('PlacementFees', () => {
  describe('when data is received', () => {
    it('renders components properly', () => {
      mockedUseGetPlacementFeesQuery.mockReturnValue({
        data: {
          node: {
            placementFees: {
              ...fixtures.MockPlacementFees,
              operations: {
                __typename: 'PlacementFeeOperations',
                createAndConfirmPlacementFee: {
                  __typename: 'Operation',
                  callable: 'DISABLED',
                  messages: []
                }
              }
            }
          }
        },
        loading: false,
        initialLoading: false,
        refetch: noop
      })

      const { getByTestId, getAllByTestId } = render({
        engagementId: fixtures.MockEngagement.id
      })

      expect(useRefetch).toHaveBeenCalledWith(
        { metaData: 'placementFee:create' },
        noop
      )

      expect(getByTestId('BillingDetailsPlacementFees-title')).toContainHTML(
        'Placement Fees'
      )
      expect(getByTestId('Table')).toBeInTheDocument()
      expect(
        getAllByTestId('TableRow-invoice-tooltip_tooltip-text')[0]
      ).toHaveTextContent(
        fixtures.MockPlacementFees.nodes[0].invoice.subjectObject.fullName
      )
    })
  })

  describe('when data is null', () => {
    it('renders components properly', () => {
      mockedUseGetPlacementFeesQuery.mockReturnValue({
        data: {
          node: null
        },
        loading: false,
        initialLoading: false,
        refetch: noop
      })

      const { getByTestId, queryByTestId } = render({
        engagementId: fixtures.MockEngagement.id
      })

      expect(useRefetch).toHaveBeenCalledWith(
        { metaData: 'placementFee:create' },
        noop
      )

      expect(getByTestId('BillingDetailsPlacementFees-title')).toContainHTML(
        'Placement Fees'
      )
      expect(queryByTestId('placement-fees-add')).not.toBeInTheDocument()
      expect(getByTestId('BillingDetailsPlacementFees-empty')).toContainHTML(
        'No related placement fees'
      )
    })
  })
})
