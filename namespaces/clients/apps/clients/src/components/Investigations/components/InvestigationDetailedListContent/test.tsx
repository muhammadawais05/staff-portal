import React, { ComponentProps } from 'react'
import { render, screen, within } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { TestWrapper } from '@staff-portal/test-utils'

import { investigationsDataMock } from '../../data/get-investigations.mock'
import InvestigationDetailedListContent from '.'

jest.mock('@staff-portal/current-user')
jest.mock('../InvestigationComment')
jest.mock('../InvestigationResolution')
jest.mock('../JobListingTable')

const arrangeTest = (
  props: ComponentProps<typeof InvestigationDetailedListContent>
) =>
  render(
    <TestWrapper>
      <InvestigationDetailedListContent {...props} />
    </TestWrapper>
  )

describe('InvestigationDetailedListContent', () => {
  it('default render', () => {
    const investigation = investigationsDataMock.investigations.nodes[1]

    arrangeTest({
      investigation,
      isResolutionExpanded: true,
      isJobsExpanded: true
    })

    const startedAtField = screen.getByTestId('item-field: Started at')

    expect(
      within(startedAtField).getByTestId('item-field-label')
    ).toHaveTextContent('Started at')
    expect(
      within(startedAtField).getByTestId('item-field-value')
    ).toHaveTextContent('Mar 18, 2020 at 10:21 AM')

    const resolvedAtField = screen.getByTestId('item-field: Resolved at')

    expect(
      within(resolvedAtField).getByTestId('item-field-label')
    ).toHaveTextContent('Resolved at')
    expect(
      within(resolvedAtField).getByTestId('item-field-value')
    ).toHaveTextContent('Mar 23, 2020 at 9:01 AM')

    const assigneeField = screen.getByTestId('item-field: CS team assignee')

    const assigneeLink = within(assigneeField).getByTestId(
      'InvestigationDetailedListContent-csTeamAssignee-link'
    )

    expect(
      within(assigneeField).getByTestId('item-field-label')
    ).toHaveTextContent('CS team assignee')
    expect(assigneeLink).toHaveAttribute(
      'href',
      investigation.clientSpecialistTeamAssignee?.webResource.url
    )
    expect(assigneeLink).toHaveTextContent(
      investigation.clientSpecialistTeamAssignee?.webResource.text || ''
    )

    expect(
      within(
        screen.getByTestId('InvestigationDetailedListContent-comment')
      ).getByTestId('InvestigationComment-comment')
    ).toHaveTextContent(JSON.stringify(investigation.comment))

    expect(
      screen.getByTestId('InvestigationResolution-resolution')
    ).toHaveTextContent(JSON.stringify(investigation.resolution))

    expect(screen.getByTestId('JobListingTable-jobs')).toHaveTextContent(
      JSON.stringify(investigation.jobs.nodes)
    )
  })

  describe('when data is missing', () => {
    it('returns all placeholders', () => {
      const investigation = {
        ...investigationsDataMock.investigations.nodes[1],
        clientSpecialistTeamAssignee: null,
        resolvedAt: null
      }

      arrangeTest({
        investigation,
        isResolutionExpanded: true,
        isJobsExpanded: true
      })

      const assigneeField = screen.getByTestId('item-field: CS team assignee')

      expect(
        within(assigneeField).getByTestId('item-field-value')
      ).toHaveTextContent(NO_VALUE)

      const resolvedAtField = screen.getByTestId('item-field: Resolved at')

      expect(
        within(resolvedAtField).getByTestId('item-field-value')
      ).toHaveTextContent(NO_VALUE)
    })
  })
})
