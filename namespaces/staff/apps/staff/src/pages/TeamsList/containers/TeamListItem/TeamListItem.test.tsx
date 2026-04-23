import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { Link } from '@staff-portal/navigation'

import { TeamListItemFragment } from '../../data/get-teams-list/get-teams-list.staff.gql.types'
import TeamListItem from './TeamListItem'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  decodeEntityId: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: jest.fn()
}))

const decodeEntityIdMock = decodeEntityId as jest.Mock

const MockLink = Link as unknown as jest.Mock

const renderComponent = (team: TeamListItemFragment) =>
  render(
    <TestWrapper>
      <TeamListItem team={team} />
    </TestWrapper>
  )

const teamMock = {
  id: '123',
  name: 'Staff Portal Tango',
  coreTeam: false,
  manager: {
    id: '234',
    role: {
      fullName: 'Elvis Presley',
      webResource: {
        url: 'https://staff-portal.toptal.net/staff/9234'
      }
    }
  },
  roles: {
    totalCount: 1,
    nodes: [
      {
        id: '345',
        fullName: 'Andrei Mocanu',
        webResource: {
          text: 'Andrei Mocanu',
          url: 'https://staff-portal.toptal.net/staff/23456'
        }
      }
    ]
  }
}

describe('TeamListItem', () => {
  beforeEach(() => {
    decodeEntityIdMock.mockReturnValue({ type: 'Team', id: '1' })
    MockLink.mockReturnValue(null)
  })

  describe('when we receive the proper data', () => {
    it('calls the components and displays the data', () => {
      renderComponent(teamMock as TeamListItemFragment)

      // Section Link
      expect(MockLink).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          children: 'Staff Portal Tango',
          href: 'teams/1'
        }),
        {}
      )
      // Team Lead Link
      expect(MockLink).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          children: 'Elvis Presley',
          href: 'https://staff-portal.toptal.net/staff/9234'
        }),
        {}
      )
      // Members Link
      expect(MockLink).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          children: 'Andrei Mocanu',
          href: 'https://staff-portal.toptal.net/staff/23456'
        }),
        {}
      )
      expect(screen.getByTestId('item-field: Core Team')).toHaveTextContent(
        'No'
      )
    })
  })
})
