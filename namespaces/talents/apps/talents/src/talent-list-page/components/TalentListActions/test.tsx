import React from 'react'
import { screen, render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetUserVerticals } from '@staff-portal/verticals'

import { useGetUserOperations } from '../../data/get-user-operations'
import TalentListActions from './TalentListActions'

jest.mock('../../data/get-user-operations', () => ({
  useGetUserOperations: jest.fn()
}))

jest.mock('@staff-portal/verticals', () => ({
  ...jest.requireActual('@staff-portal/verticals'),
  useGetUserVerticals: jest.fn()
}))

jest.mock('../AddTalentButton', () => ({
  __esModule: true,
  default: () => <div data-testid='add-talent-button' />
}))

const mockedUseGetUserOperations = useGetUserOperations as jest.Mock
const mockedUseGetUserVerticals = useGetUserVerticals as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TalentListActions />
    </TestWrapper>
  )

describe('ConditionalRenderAddTalentButton', () => {
  beforeEach(() => {
    mockedUseGetUserVerticals.mockReturnValue({})
  })

  it('renders AddTalentButton if user has createTalent permission', () => {
    mockedUseGetUserOperations.mockReturnValue({
      data: {
        createTalent: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        }
      }
    })

    arrangeTest()

    expect(screen.queryByTestId('add-talent-button')).toBeInTheDocument()
  })

  it('hides AddTalentButton if user has not createTalent permission', () => {
    mockedUseGetUserOperations.mockReturnValue({
      data: {
        createTalent: {
          callable: OperationCallableTypes.HIDDEN,
          messages: [],
          __typename: 'Operation'
        }
      }
    })

    arrangeTest()

    expect(screen.queryByTestId('add-talent-button')).not.toBeInTheDocument()
  })
})
