import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  mockedShortRequest,
  mockedMessageMeta
} from '@staff-portal/talents-gigs/src/mocks'
import { useGetGigReachOutMessageMeta } from '@staff-portal/talents-gigs'
import { useModal } from '@staff-portal/modals-service'

import CandidateListItemActions from './CandidateListItemActions'

jest.mock(
  '@staff-portal/talents-gigs/src/data/get-gig-reach-out-message-meta',
  () => ({
    useGetGigReachOutMessageMeta: jest.fn()
  })
)

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockedGetGigReachOutMessageMeta =
  useGetGigReachOutMessageMeta as jest.Mock
const TALENT_NAME = 'Test Talent'
const useModalMock = useModal as jest.Mock
const showModal = jest.fn()

const arrangeTest = () =>
  render(
    <TestWrapperWithMocks>
      <CandidateListItemActions
        request={mockedShortRequest}
        talentId='test-talent-id'
        talentName={TALENT_NAME}
        talentResumeUrl='http://test.talent.net'
        operations={{
          subscribeToTalentAvailabilityUpdates: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          createP2PReachOut: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }}
      />
    </TestWrapperWithMocks>
  )

describe('CandidateListItemActions', () => {
  beforeEach(() => {
    useModalMock.mockReturnValue({ showModal })
  })

  it('renders Send Request button', () => {
    arrangeTest()

    expect(screen.queryByTestId('reach-out-send-button')).toBeInTheDocument()
  })

  it('displays modal confirmation before submittion', () => {
    arrangeTest()
    mockedGetGigReachOutMessageMeta.mockClear()
    mockedGetGigReachOutMessageMeta.mockReturnValue({
      gigReachOutMessageMeta: mockedMessageMeta,
      loading: false
    })

    fireEvent.click(screen.getByTestId('reach-out-send-button'))

    expect(showModal).toHaveBeenCalled()
  })

  it('renders Subscribe to availability button', () => {
    arrangeTest()

    expect(
      screen.queryByTestId('subscribe-to-availability-button')
    ).toBeInTheDocument()
  })
})
