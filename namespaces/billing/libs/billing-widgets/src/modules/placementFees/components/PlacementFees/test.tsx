import React, { ComponentProps } from 'react'
import { noop } from '@toptal/picasso/utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import PlacementFees from '.'
import { useGetPlacementFeesQuery } from '../../data/getPlacementFees.graphql.types'

jest.mock('../Table')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../../data/getPlacementFees.graphql.types')

const mockedUseGetPlacementFeesQuery = useGetPlacementFeesQuery as jest.Mock

const render = (props: ComponentProps<typeof PlacementFees>) =>
  renderComponent(<PlacementFees {...props} />)

describe('PlacementFees', () => {
  describe('when data is received', () => {
    it('renders components properly', () => {
      mockedUseGetPlacementFeesQuery.mockReturnValue({
        data: {
          node: { placementFees: fixtures.MockPlacementFees }
        },
        loading: false,
        initialLoading: false,
        refetch: noop
      })

      const { getByTestId } = render({
        engagementId: fixtures.MockEngagement.id
      })

      expect(useRefetch).toHaveBeenCalledWith(
        { metaData: 'placementFee:create' },
        noop
      )

      expect(getByTestId('PlacementFees-title')).toContainHTML('Placement Fees')
      expect(getByTestId('placement-fees-add')).toContainHTML(
        'Add Placement Fee'
      )
      expect(getByTestId('Table')).toBeInTheDocument()
      expect(getByTestId('Table-documents')).toContainHTML('"id":"382007"')
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

      expect(getByTestId('PlacementFees-title')).toContainHTML('Placement Fees')
      expect(queryByTestId('placement-fees-add')).not.toBeInTheDocument()
      expect(getByTestId('PlacementFees-empty')).toContainHTML(
        'No related placement fees'
      )
    })
  })
})
