import { render, screen } from '@testing-library/react'
import React from 'react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import StaffTreeModal from './StaffTreeModal'
import {
  createGetOperationalIssuesStaffTreeFailedMock,
  createGetOperationalIssuesStaffTreeMock
} from './data/get-operational-issues-staff-tree/mocks'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  TreeView: () => null,
  TreeViewContainer: () => null
}))

const onModalLoadedMock = jest.fn()

const arrangeTest = (mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <StaffTreeModal hideModal={() => {}} onModalLoaded={onModalLoadedMock} />
    </TestWrapperWithMocks>
  )

describe('StaffTreeModal', () => {
  beforeEach(() => {
    onModalLoadedMock.mockClear()
  })

  it('should load staff tree data and render the organizational chart', async () => {
    arrangeTest([
      createGetOperationalIssuesStaffTreeMock([
        {
          issuesCount: null,
          parentIndex: 1,
          positions: [],
          role: {
            id: 'abc100',
            photo: null,
            fullName: 'Abc 100',
            __typename: 'Staff'
          },
          __typename: 'OperationalIssuesStaffTreeCardNode'
        },
        {
          issuesCount: null,
          parentIndex: null,
          positions: [],
          role: {
            id: 'abc200',
            photo: null,
            fullName: 'Abc 200',
            __typename: 'Staff'
          },
          __typename: 'OperationalIssuesStaffTreeCardNode'
        },
        {
          issuesCount: null,
          parentIndex: 1,
          positions: [],
          role: {
            id: 'abc300',
            photo: null,
            fullName: 'Abc 300',
            __typename: 'Staff'
          },
          __typename: 'OperationalIssuesStaffTreeCardNode'
        }
      ])
    ])

    expect(
      await screen.findByText('Operational Issues Tree View')
    ).toBeInTheDocument()
  })

  it('should show error if the staff tree data loading fails', async () => {
    arrangeTest([createGetOperationalIssuesStaffTreeFailedMock()])
    await screen.findByText('Unable to load staff tree data.')
    expect(
      screen.queryByText('Operational Issues Tree View')
    ).not.toBeInTheDocument()
    expect(onModalLoadedMock).toHaveBeenCalledTimes(1)
  })
})
