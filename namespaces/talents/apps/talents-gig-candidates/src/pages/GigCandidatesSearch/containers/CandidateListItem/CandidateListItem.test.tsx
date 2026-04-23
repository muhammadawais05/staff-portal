import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetRoleFlagsMock } from '@staff-portal/role-flags/src/mocks'
import { mockedShortRequest } from '@staff-portal/talents-gigs/src/mocks'

import CandidateListItem from './CandidateListItem'
import { useGetCandidateListItem } from './data/get-candidate-list-item/get-candidate-list-item.staff.gql'
import CANDIDATE_LIST_ITEM from './data/get-candidate-list-item/fixtures/candidate-list-item.json'

jest.mock(
  './data/get-candidate-list-item/get-candidate-list-item.staff.gql',
  () => ({
    useGetCandidateListItem: jest.fn()
  })
)
jest.mock(
  './components/CandidateListItemContent/CandidateListItemContent',
  () => ({
    __esModule: true,
    default: () => <div />
  })
)
jest.mock(
  './components/CandidateListItemActions/CandidateListItemActions',
  () => ({
    __esModule: true,
    default: () => <div />
  })
)

jest.mock('@staff-portal/talents-list', () => ({
  TalentListItemHeader: () => <div />,
  TalentListItemSkeletonLoader: () => <div />
}))

const arrangeTest = () => {
  ;(useGetCandidateListItem as jest.Mock).mockReturnValue({
    data: CANDIDATE_LIST_ITEM,
    loading: false,
    initialLoading: false,
    refetch: jest.fn()
  })

  const ROLE_ID = 'VjEtVGFsZW50LTI1MjEyMzA'
  const mocks = [
    createGetRoleFlagsMock({ roleId: ROLE_ID }, { flagId: '', flagTitle: '' })
  ]

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <CandidateListItem
        request={mockedShortRequest}
        talentId='test-talent-id'
        isBestMatchQueryEnabled={false}
        talentIndex={0}
      />
    </TestWrapperWithMocks>
  )
}

describe('CandidateListItem', () => {
  it('renders talent name', async () => {
    arrangeTest()

    expect(await screen.findByText('Rena Bins')).toBeInTheDocument()
  })
})
