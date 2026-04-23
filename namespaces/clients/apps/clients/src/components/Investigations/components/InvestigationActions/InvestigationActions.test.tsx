import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { investigationsDataMock } from '../../data/get-investigations.mock'
import InvestigationActions from '.'

jest.mock(
  '../ResolutionToggleButton'
)
jest.mock(
  '../JobsToggleButton'
)

const { operations, id: clientId } = investigationsDataMock

const renderComponent = (
  props: Pick<ComponentProps<typeof InvestigationActions>, 'investigation'>
) =>
  render(
    <TestWrapper>
      <InvestigationActions
        operations={operations}
        clientId={clientId}
        toggleResolutionSection={() => {}}
        isResolutionExpanded={false}
        toggleJobsSection={() => {}}
        isJobsExpanded={false}
        {...props}
      />
    </TestWrapper>
  )

describe('InvestigationActions', () => {
  it('default render', () => {
    const investigation = {
      ...investigationsDataMock.investigations.nodes[0],
      resolvedAt: null
    }

    renderComponent({
      investigation
    })

    expect(screen.getByTestId('JobsToggleButton-totalCount')).toHaveTextContent(
      investigation.jobs.totalCount.toString()
    )
    expect(screen.getByTestId('JobsToggleButton-isExpanded')).toHaveTextContent(
      'false'
    )
  })

  describe('when resolution is present', () => {
    it('renders a button to toggle resolution', () => {
      renderComponent({
        investigation: investigationsDataMock.investigations.nodes[1]
      })

      expect(
        screen.getByTestId('ResolutionToggleButton-isExpanded')
      ).toHaveTextContent('false')
    })
  })

  describe('when resolution or resolvedAt is not present', () => {
    it('does not render a button to toggle resolution', () => {
      renderComponent({
        investigation: {
          ...investigationsDataMock.investigations.nodes[0],
          resolvedAt: '2021-05-11T21:04:14+03:00'
        }
      })

      expect(
        screen.queryByTestId('ResolutionToggleButton')
      ).not.toBeInTheDocument()

      renderComponent({
        investigation: {
          ...investigationsDataMock.investigations.nodes[1],
          resolvedAt: null
        }
      })

      expect(
        screen.queryByTestId('ResolutionToggleButton')
      ).not.toBeInTheDocument()
    })
  })
})
