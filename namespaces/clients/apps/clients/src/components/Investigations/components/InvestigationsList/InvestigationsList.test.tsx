import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EmptyState } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import Investigation from '../Investigation'
import { investigationsDataMock } from '../../data/get-investigations.mock'
import InvestigationsList from '.'

jest.mock(
  '../Investigation'
)
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  EmptyState: { Collection: jest.fn() }
}))

const mockedEmptyStateCollection = EmptyState.Collection as unknown as jest.Mock
const mockedInvestigation = Investigation as jest.Mock

const renderComponent = (props: ComponentProps<typeof InvestigationsList>) =>
  render(
    <TestWrapper>
      <InvestigationsList {...props} />
    </TestWrapper>
  )

describe('InvestigationsList', () => {
  describe('when there are investigations', () => {
    it('default render', () => {
      mockedInvestigation.mockReturnValue(null)

      renderComponent({
        isExpanded: true,
        companyId: investigationsDataMock.id,
        investigations: investigationsDataMock.investigations.nodes,
        operations: investigationsDataMock.operations
      })

      expect(mockedInvestigation).toHaveBeenCalledTimes(2)
      expect(mockedInvestigation).toHaveBeenNthCalledWith(
        1,
        {
          investigation: investigationsDataMock.investigations.nodes[0],
          companyId: investigationsDataMock.id,
          operations: investigationsDataMock.operations
        },
        {}
      )
      expect(mockedInvestigation).toHaveBeenNthCalledWith(
        2,
        {
          investigation: investigationsDataMock.investigations.nodes[1],
          companyId: investigationsDataMock.id,
          operations: investigationsDataMock.operations
        },
        {}
      )
    })
  })

  describe('when there are no investigations', () => {
    it('renders empty state list', () => {
      mockedEmptyStateCollection.mockReturnValue(null)
      mockedInvestigation.mockReturnValue(null)

      renderComponent({
        isExpanded: false,
        companyId: investigationsDataMock.id,
        investigations: []
      })

      expect(mockedInvestigation).not.toHaveBeenCalled()
      expect(mockedEmptyStateCollection).toHaveBeenCalledWith(
        {
          children: 'Currently there are no investigations.'
        },
        {}
      )
    })
  })
})
