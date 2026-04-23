import React, { ComponentProps } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import InvestigationsContent from '.'
import { investigationsDataMock } from '../../data/get-investigations.mock'

jest.mock('../InvestigationsToggleButton')

const arrangeTest = (
  props: Omit<
    ComponentProps<typeof InvestigationsContent>,
    'createClientInvestigationOperation'
  >
) =>
  render(
    <TestWrapper>
      <InvestigationsContent
        operations={investigationsDataMock.operations}
        {...props}
      />
    </TestWrapper>
  )

const investigations = investigationsDataMock.investigations.nodes

describe('InvestigationsContent', () => {
  it('default render', () => {
    arrangeTest({
      totalCount: 5,
      companyId: 'test',
      investigations
    })

    expect(screen.getByTestId('Section-title')).toHaveTextContent(
      'Investigations'
    )
    expect(screen.getByTestId('investigation-start-button')).toHaveTextContent(
      'Start Investigation'
    )
    expect(
      screen.getByTestId('InvestigationsToggleButton-isExpanded')
    ).toHaveTextContent('false')
  })

  describe('when there are investigations', () => {
    it('renders a button to show investigations', () => {
      arrangeTest({
        totalCount: 5,
        companyId: 'test',
        investigations
      })

      expect(
        screen.getByTestId('InvestigationsToggleButton-totalCount')
      ).toHaveTextContent('5')
    })
  })

  describe('when there are no investigations', () => {
    it('renders a tooltip showing that there are no investigations', () => {
      arrangeTest({
        totalCount: 0,
        companyId: 'test',
        investigations
      })
      fireEvent.mouseEnter(screen.getByTestId('InvestigationsToggleButton'))

      expect(screen.getByTestId('Tooltip-content')).toHaveTextContent(
        "This client hasn't had any investigations yet"
      )
      expect(
        screen.getByTestId('InvestigationsToggleButton-totalCount')
      ).toHaveTextContent('0')
    })
  })
})
