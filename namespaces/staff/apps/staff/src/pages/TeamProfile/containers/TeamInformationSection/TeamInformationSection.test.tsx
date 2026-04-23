import React, { ComponentProps } from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { Link } from '@staff-portal/navigation'
import { getEditPermissionsPath } from '@staff-portal/routes'

import TeamInformationSection from './TeamInformationSection'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  decodeEntityId: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: jest.fn()
}))
jest.mock('@staff-portal/routes', () => ({
  getEditPermissionsPath: jest.fn()
}))

const decodeEntityIdMock = decodeEntityId as jest.Mock
const getEditPermissionsPathMock = getEditPermissionsPath as jest.Mock

const MockLink = Link as unknown as jest.Mock

const renderComponent = ({
  manager,
  coreTeam,
  ability,
  emailTracking,
  escalationPath,
  roles
}: ComponentProps<typeof TeamInformationSection>) =>
  render(
    <TestWrapper>
      <TeamInformationSection
        manager={manager}
        coreTeam={coreTeam}
        ability={ability}
        emailTracking={emailTracking}
        escalationPath={escalationPath}
        roles={roles}
      />
    </TestWrapper>
  )

const managerMock = {
  id: '234',
  name: 'VP of Jest',
  role: {
    fullName: 'Elvis Presley',
    webResource: {
      url: 'https://staff-portal.toptal.net/staff/9234'
    }
  }
}
const abilityMock = {
  id: '1',
  name: 'Ability'
}
const escalationPathMock = {
  nodes: [
    {
      id: '1',
      role: {
        webResource: {
          text: 'James Bond',
          url: 'https://staff-portal.toptal.net/staff/1111111'
        }
      }
    },
    {
      id: '2',
      role: {
        webResource: {
          text: 'Johnny Depp',
          url: 'https://staff-portal.toptal.net/staff/2222222'
        }
      }
    }
  ]
}

describe('TeamInformationSection', () => {
  beforeEach(() => {
    decodeEntityIdMock.mockReturnValue({ type: 'Team', id: '1' })
    getEditPermissionsPathMock.mockImplementation((path: string) => path)
    MockLink.mockReturnValue(null)
  })

  it('displays the proper data', () => {
    renderComponent({
      manager: managerMock,
      coreTeam: true,
      emailTracking: false,
      roles: { totalCount: 2 },
      ability: abilityMock,
      escalationPath: escalationPathMock
    })

    // Team Lead
    expect(MockLink).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Elvis Presley',
        href: 'https://staff-portal.toptal.net/staff/9234'
      }),
      {}
    )

    expect(screen.getByTestId('item-field: Position')).toHaveTextContent(
      'VP of Jest'
    )

    expect(screen.getByTestId('item-field: Core Team')).toHaveTextContent('Yes')

    expect(
      screen.getByTestId('item-field: Number of Members')
    ).toHaveTextContent('2')

    expect(screen.getByTestId('item-field: Email Tracking')).toHaveTextContent(
      'No'
    )

    // Escalation Path
    expect(MockLink).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: 'James Bond',
        href: 'https://staff-portal.toptal.net/staff/1111111'
      }),
      {}
    )
    expect(MockLink).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: 'Johnny Depp',
        href: 'https://staff-portal.toptal.net/staff/2222222'
      }),
      {}
    )
  })
})
