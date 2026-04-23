import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { investigationsDataMock } from '../../data/get-investigations.mock'
import Investigation from '.'

jest.mock(
  '../../utils',
  () => ({
    getInvestigationTitle: () => 'Title'
  })
)
jest.mock(
  '../InvestigationActions'
)
jest.mock('@staff-portal/ui/src/components/DetailedList')
jest.mock(
  '../InvestigationDetailedListContent'
)

const arrangeTest = (props: ComponentProps<typeof Investigation>) =>
  render(
    <TestWrapper>
      <Investigation {...props} />
    </TestWrapper>
  )

const investigation = investigationsDataMock.investigations.nodes[0]

describe('Investigation', () => {
  it('default render', () => {
    arrangeTest({
      investigation,
      companyId: investigationsDataMock.id,
      operations: investigationsDataMock.operations
    })

    expect(screen.getByTestId('Section-title')).toHaveTextContent('Title')
    expect(
      screen.getByTestId('InvestigationsActions-investigation')
    ).toHaveTextContent(JSON.stringify(investigation))
    expect(
      screen.getByTestId('InvestigationsActions-clientId')
    ).toHaveTextContent(investigationsDataMock.id)
    expect(
      screen.getByTestId('InvestigationsActions-isResolutionExpanded')
    ).toHaveTextContent('false')
    expect(
      screen.getByTestId('InvestigationsActions-isJobsExpanded')
    ).toHaveTextContent('false')
    expect(
      screen.getByTestId('InvestigationsActions-operations')
    ).toHaveTextContent(JSON.stringify(investigationsDataMock.operations))
    expect(
      screen.getByTestId('InvestigationDetailedListContent-investigation')
    ).toHaveTextContent(JSON.stringify(investigation))
    expect(
      screen.getByTestId(
        'InvestigationDetailedListContent-isResolutionExpanded'
      )
    ).toHaveTextContent('false')
  })
})
