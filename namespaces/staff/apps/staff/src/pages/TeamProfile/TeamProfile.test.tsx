import React from 'react'
import { when } from 'jest-when'
import { render } from '@testing-library/react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { useParams } from '@staff-portal/navigation'

import TeamProfile from './TeamProfile'
import { GetTeamInfoDocument } from './data/get-team-info/get-team-info.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/navigation')
jest.mock('@staff-portal/page-wrapper', () => ({
  ...jest.requireActual('@staff-portal/page-wrapper'),
  ContentWrapper: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseParams = useParams as jest.Mock

const MockContentWrapper = ContentWrapper as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <TeamProfile />
    </TestWrapper>
  )

describe('TeamProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseParams.mockReturnValue({ id: '1' })
    MockContentWrapper.mockImplementation(({ children }) => children)
  })

  it('renders title', () => {
    when(mockUseQuery)
      .calledWith(GetTeamInfoDocument, expect.anything())
      .mockImplementation(() => ({
        data: {
          node: {
            id: '1',
            name: 'Staff Portal Tango',
            __typename: 'Team'
          }
        },
        loading: false,
        initialLoading: false
      }))

    renderComponent()

    expect(MockContentWrapper).toHaveBeenCalledTimes(1)
    expect(MockContentWrapper).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Staff Portal Tango',
        titleLoading: false
      }),
      {}
    )
  })
})
