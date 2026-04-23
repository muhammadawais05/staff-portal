import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  Operation,
  checkIfAllOperationsAreHidden
} from '@staff-portal/operations'
import { MoreButton } from '@staff-portal/ui'

import JobActionsButton from './JobActionsButton'
import useGetJobActions from '../../utils/use-get-job-actions'
import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'

jest.mock('../../utils/use-get-job-actions', () => jest.fn())
jest.mock('@staff-portal/operations', () => ({
  Operation: jest.fn(),
  checkIfAllOperationsAreHidden: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  MoreButton: jest.fn()
}))

const operationMock = Operation as jest.Mock
const useGetJobActionsMock = useGetJobActions as jest.Mock
const moreButtonMock = MoreButton as jest.Mock
const checkIfAllOperationsAreHiddenMock =
  checkIfAllOperationsAreHidden as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <JobActionsButton job={{} as ClientJobFragment} />
    </TestWrapper>
  )

describe('Job Actions Button', () => {
  beforeEach(() => {
    operationMock.mockReturnValue(null)
    useGetJobActionsMock.mockReturnValue({})
    moreButtonMock.mockReturnValue(null)
  })

  it('all operations are hidden', () => {
    checkIfAllOperationsAreHiddenMock.mockReturnValue(true)

    renderComponent()

    expect(moreButtonMock).toHaveBeenCalledTimes(1)
    expect(moreButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        hidden: true
      }),
      {}
    )
  })

  it('more button is visible', () => {
    checkIfAllOperationsAreHiddenMock.mockReturnValue(false)

    renderComponent()

    expect(moreButtonMock).toHaveBeenCalledTimes(1)
    expect(moreButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        hidden: false
      }),
      {}
    )
  })
})
