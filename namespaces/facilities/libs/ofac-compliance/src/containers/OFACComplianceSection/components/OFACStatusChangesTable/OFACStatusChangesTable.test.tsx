import React from 'react'
import { render, screen } from '@testing-library/react'
import { OfacStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import OFACStatusChangesTable, { Props } from './OFACStatusChangesTable'
import { createOfacStatusChangeFragment } from '../../data/ofac-status-change-fragment/mocks'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateTimeFormatter: () => (date: string) => date
}))

const arrangeTest = ({ items }: Props) =>
  render(
    <TestWrapper>
      <OFACStatusChangesTable items={items} />
    </TestWrapper>
  )

const prefix = 'ofac-status-change'

describe('OFACStatusChangesTable', () => {
  it('shows OFAC status changes', () => {
    const COMMENT = 'Test Comment as4'
    const PERFORMER_NAME = 'Test Name pf3'
    const PERFORMER_URL = 'https://example.com/id/1'
    const displayedChanges = [
      createOfacStatusChangeFragment({
        comment: COMMENT,
        createdAt: '2020-03-11T09:49:20+0000',
        status: OfacStatus.NORMAL,
        performer: {
          id: 'test-id',
          fullName: PERFORMER_NAME,
          webResource: {
            url: PERFORMER_URL
          }
        }
      })
    ]

    arrangeTest({ items: displayedChanges })

    const createdAtNode = screen.getByTestId(`${prefix}-createdAt`)

    expect(createdAtNode).toBeInTheDocument()
    expect(createdAtNode.textContent).toBe('2020-03-11T09:49:20+0000')

    const statusNode = screen.getByTestId(`${prefix}-value`)

    expect(statusNode).toBeInTheDocument()
    expect(statusNode.textContent).toBe('Normal')

    const performerNode = screen.getByTestId(`${prefix}-performer-link`)

    expect(performerNode).toBeInTheDocument()
    expect(performerNode.textContent).toBe(PERFORMER_NAME)
    expect(performerNode).toHaveAttribute('href', PERFORMER_URL)

    const commentNode = screen.getByTestId(`${prefix}-comment`)

    expect(commentNode).toBeInTheDocument()
    expect(commentNode.textContent).toBe(COMMENT)
  })

  describe('when there is no performer data', () => {
    it("displays performer name as 'System' plaintext", () => {
      const displayedChanges = [
        createOfacStatusChangeFragment({
          comment: 'Comment text',
          createdAt: '2020-03-11T09:49:20+0000',
          status: OfacStatus.NORMAL,
          performer: null
        })
      ]

      arrangeTest({ items: displayedChanges })

      expect(
        screen.queryByTestId(`${prefix}-performer-link`)
      ).not.toBeInTheDocument()
      expect(screen.getByTestId(`${prefix}-performer`)).toHaveTextContent(
        'System'
      )
    })
  })
})
