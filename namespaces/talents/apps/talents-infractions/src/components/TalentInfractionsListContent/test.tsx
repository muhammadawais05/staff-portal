import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentInfractionFragment } from '@staff-portal/talents-infractions'

import TalentInfractionsListContent from './TalentInfractionsListContent'
import { createGetInfractionsListMock } from '../../pages/TalentInfractionsList/data/get-infractions-list/mocks'

const arrangeTest = (talentInfractions: TalentInfractionFragment[] = []) => {
  render(
    <TestWrapper>
      <TalentInfractionsListContent
        talentInfractions={talentInfractions}
        totalCount={talentInfractions.length}
        loading={false}
        onPageChange={jest.fn()}
        onRemove={jest.fn()}
      />
    </TestWrapper>
  )
}

describe('TalentInfractionsListContent', () => {
  it('shows no results message when there is no data', () => {
    arrangeTest()
    expect(
      screen.queryByText('There are no infractions for this search criteria.')
    ).toBeInTheDocument()
  })

  it('renders infractions when data is available', () => {
    const {
      result: { data }
    } = createGetInfractionsListMock()

    arrangeTest(data.talentInfractions.nodes as TalentInfractionFragment[])

    expect(screen.queryByText(/Bad Interview/)).toBeInTheDocument()
  })
})
