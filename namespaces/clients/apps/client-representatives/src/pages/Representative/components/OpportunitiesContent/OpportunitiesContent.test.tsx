import React from 'react'
import { EmptyState } from '@toptal/picasso'
import { RepresentativeFragment } from '@staff-portal/client-representatives'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { Opportunity } from '../Opportunity'
import OpportunitiesContent from './OpportunitiesContent'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  EmptyState: {
    Collection: jest.fn()
  }
}))
jest.mock('../Opportunity', () => ({
  Opportunity: jest.fn()
}))

const EmptyStateCollectionMock = EmptyState.Collection as unknown as jest.Mock
const OpportunityMock = Opportunity as unknown as jest.Mock

const renderComponent = (representative: RepresentativeFragment) =>
  render(
    <TestWrapper>
      <OpportunitiesContent representative={representative} />
    </TestWrapper>
  )

const EMPTY_OPPORTUNITIES_REPRESENTATIVE =
  {} as unknown as RepresentativeFragment

const OPPORTUNITIES = [{ id: 'opportunity-1' }, { id: 'opportunity-2' }]

const REPRESENTATIVE = {
  opportunities: {
    nodes: OPPORTUNITIES
  }
} as unknown as RepresentativeFragment

describe('OpportunityContent', () => {
  describe('when representative has no opportunities', () => {
    it('shows empty message', () => {
      EmptyStateCollectionMock.mockReturnValue(null)

      renderComponent(EMPTY_OPPORTUNITIES_REPRESENTATIVE)

      expect(EmptyStateCollectionMock).toHaveBeenCalledWith(
        {
          children: 'No related opportunities.'
        },
        {}
      )
    })
  })

  describe('when representative has opportunities', () => {
    it('shows the table with opportunities', () => {
      OpportunityMock.mockReturnValue(null)

      renderComponent(REPRESENTATIVE)

      expect(OpportunityMock).toHaveBeenNthCalledWith(
        1,
        {
          representative: REPRESENTATIVE,
          opportunity: OPPORTUNITIES[0]
        },
        {}
      )

      expect(OpportunityMock).toHaveBeenNthCalledWith(
        2,
        {
          representative: REPRESENTATIVE,
          opportunity: OPPORTUNITIES[1]
        },
        {}
      )
    })
  })
})
