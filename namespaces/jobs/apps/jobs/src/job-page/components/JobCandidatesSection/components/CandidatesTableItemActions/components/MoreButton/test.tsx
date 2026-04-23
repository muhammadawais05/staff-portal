import React, { ComponentProps, ReactNode } from 'react'
import { screen, render } from '@testing-library/react'
import {
  EngagementStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  AcceptCandidateItem,
  CancelInterviewMenuItem,
  ChangeEngagementCommitmentMenuItem,
  ExpireEngagementItem,
  RejectEngagementCandidateMenuItem,
  SendEngagementClientEmailItem,
  SendEngagementTalentEmailItem
} from '@staff-portal/engagements'
import {
  createEngagementOperationsFragmentMock
} from '@staff-portal/engagements/src/mocks'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import {
  EngagementFragment,
  RescheduleInterviewItem,
  ScheduleInterviewItem
} from '@staff-portal/engagements-interviews'
import {
  createEngagementFragmentFragmentMock
} from '@staff-portal/engagements-interviews/src/mocks'
import { StaffCommitmentChangeWidget } from '@staff-portal/billing-widgets'

import MoreButton from '.'

jest.mock('@staff-portal/billing-widgets', () => ({
  StaffCommitmentChangeWidget: (
    props: ComponentProps<typeof StaffCommitmentChangeWidget>
  ) => <div data-testid='CommitmentChangeWidget'>{props.children(jest.fn)}</div>
}))

jest.mock('@staff-portal/engagements', () => ({
  SendEngagementClientEmailItem: jest.fn(),
  SendEngagementTalentEmailItem: jest.fn(),
  CancelInterviewMenuItem: jest.fn(),
  ChangeEngagementCommitmentMenuItem: jest.fn(),
  ExpireEngagementItem: jest.fn(),
  RejectEngagementCandidateMenuItem: jest.fn(),
  AcceptCandidateItem: jest.fn()
}))

jest.mock('@staff-portal/engagements-interviews', () => ({
  RescheduleInterviewItem: jest.fn(),
  ScheduleInterviewItem: jest.fn()
}))

const MockSendEngagementClientEmailItem =
  SendEngagementClientEmailItem as jest.Mock
const MockSendEngagementTalentEmailItem =
  SendEngagementTalentEmailItem as jest.Mock
const MockCancelInterviewMenuItem = CancelInterviewMenuItem as jest.Mock
const MockChangeEngagementCommitmentMenuItem =
  ChangeEngagementCommitmentMenuItem as jest.Mock
const MockExpireEngagementItem = ExpireEngagementItem as jest.Mock
const MockRejectEngagementCandidateMenuItem =
  RejectEngagementCandidateMenuItem as jest.Mock
const MockAcceptCandidateItem = AcceptCandidateItem as jest.Mock
const MockRescheduleInterviewItem = RescheduleInterviewItem as jest.Mock
const MockScheduleInterviewItem = ScheduleInterviewItem as jest.Mock

jest.mock('../../hooks', () => ({
  useGetRenderMoreButtonActions: () => ({
    loading: false,
    isInInterviewStatus: true,
    handleOperationClick: () => {},
    renderEditInterviewDetailsLazyOperation: () => null
  })
}))

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  MoreButton: ({ children }: { children: ReactNode[] }) => <div>{children}</div>
}))

const arrangeTest = ({
  partialEngagement,
  engagementStatus
}: {
  partialEngagement?: Partial<EngagementFragment>
  engagementStatus?: EngagementStatus
} = {}) => {
  const engagement = createEngagementFragmentFragmentMock({
    engagement: partialEngagement,
    engagementStatus
  })

  return render(
    <TestWrapperWithMocks>
      <MoreButton engagement={engagement} />
    </TestWrapperWithMocks>
  )
}

describe('MoreButton', () => {
  beforeEach(() => {
    MockSendEngagementClientEmailItem.mockImplementation(() => (
      <div data-testid='SendEngagementClientEmailItem' />
    ))
    MockSendEngagementTalentEmailItem.mockImplementation(() => (
      <div data-testid='SendEngagementTalentEmailItem' />
    ))
    MockCancelInterviewMenuItem.mockImplementation(() => (
      <div data-testid='CancelInterviewMenuItem' />
    ))
    MockChangeEngagementCommitmentMenuItem.mockImplementation(() => (
      <div data-testid='ChangeEngagementCommitmentMenuItem' />
    ))
    MockExpireEngagementItem.mockImplementation(() => (
      <div data-testid='ExpireEngagementItem' />
    ))
    MockRejectEngagementCandidateMenuItem.mockImplementation(() => (
      <div data-testid='RejectEngagementCandidateMenuItem' />
    ))
    MockAcceptCandidateItem.mockImplementation(() => (
      <div data-testid='AcceptCandidateItem' />
    ))
    MockRescheduleInterviewItem.mockImplementation(() => (
      <div data-testid='RescheduleInterviewItem' />
    ))
    MockScheduleInterviewItem.mockImplementation(() => (
      <div data-testid='ScheduleInterviewItem' />
    ))
  })

  it('shows proper items', () => {
    arrangeTest({
      engagementStatus: EngagementStatus.PENDING,
      partialEngagement: {
        id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk'
      }
    })

    expect(screen.queryByTestId('ExpireEngagementItem')).toBeInTheDocument()
    expect(screen.queryByTestId('AcceptCandidateItem')).toBeInTheDocument()
    expect(
      screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('SendEngagementClientEmailItem')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('SendEngagementTalentEmailItem')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('CancelInterviewMenuItem')).toBeInTheDocument()
    expect(
      screen.queryByTestId('RejectEngagementCandidateMenuItem')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('RescheduleInterviewItem')).toBeInTheDocument()
    expect(screen.queryAllByTestId('ScheduleInterviewItem')).toHaveLength(2)
  })

  it('calls ExpireEngagementItem with correct props', () => {
    const testedOperation = {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }

    arrangeTest({
      engagementStatus: EngagementStatus.PENDING,
      partialEngagement: {
        operations: {
          ...createEngagementOperationsFragmentMock(),
          expireEngagement: testedOperation
        },
        id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk'
      }
    })

    expect(MockExpireEngagementItem).toHaveBeenCalledWith(
      expect.objectContaining({
        initialOperation: testedOperation
      }),
      {}
    )
  })

  it('calls AcceptCandidateItem with correct props', () => {
    const testedOperation = {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }

    arrangeTest({
      engagementStatus: EngagementStatus.PENDING,
      partialEngagement: {
        operations: {
          ...createEngagementOperationsFragmentMock(),
          scheduleEngagementActivationStartDate: testedOperation
        },
        id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk'
      }
    })
    expect(MockAcceptCandidateItem).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: testedOperation
      }),
      {}
    )
  })

  it('calls CancelInterviewMenuItem with correct props', () => {
    const testedOperation = {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }

    arrangeTest({
      engagementStatus: EngagementStatus.PENDING,
      partialEngagement: {
        operations: {
          ...createEngagementOperationsFragmentMock(),
          cancelEngagementInInterview: testedOperation
        },
        id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk'
      }
    })
    expect(MockCancelInterviewMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: testedOperation
      }),
      {}
    )
  })

  it('calls RejectEngagementCandidateMenuItem with correct props', () => {
    const testedOperation = {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }

    arrangeTest({
      engagementStatus: EngagementStatus.PENDING,
      partialEngagement: {
        operations: {
          ...createEngagementOperationsFragmentMock(),
          rejectEngagementOnInterview: testedOperation
        },
        id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk'
      }
    })

    expect(MockRejectEngagementCandidateMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: testedOperation
      }),
      {}
    )
  })

  it('calls ScheduleInterviewItem with correct props', () => {
    const externalInterview = {
      id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk',
      operations: {
        proposeInterviewTimeSlots: createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        }),
        scheduleSingleCommitInterview: createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        }),
        clearAndRescheduleSingleCommitInterview: createOperationMock(),
        clearAndChangeInterviewProposedTimeSlots: createOperationMock()
      }
    }

    arrangeTest({
      engagementStatus: EngagementStatus.PENDING,
      partialEngagement: {
        newExternalInterview: externalInterview,
        id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk'
      }
    })

    expect(MockScheduleInterviewItem.mock.calls[0]).toMatchObject([
      {
        engagementId: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk',
        latestExternalInterview: undefined
      },
      {}
    ])

    expect(MockScheduleInterviewItem.mock.calls[1]).toMatchObject([
      {
        componentType: 'menu-item',
        engagementId: externalInterview.id,
        latestExternalInterview: undefined,
        newExternalInterview: externalInterview
      },
      {}
    ])
  })

  it('calls RescheduleInterviewItem with correct props', () => {
    const newExternalInterview = {
      id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk',
      operations: {
        proposeInterviewTimeSlots: createOperationMock(),
        scheduleSingleCommitInterview: createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        }),
        clearAndRescheduleSingleCommitInterview: createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        }),
        clearAndChangeInterviewProposedTimeSlots: createOperationMock({
          callable: OperationCallableTypes.HIDDEN
        })
      }
    }

    arrangeTest({
      engagementStatus: EngagementStatus.PENDING,
      partialEngagement: {
        id: 'VjEtEW5nYWdlbWVudC0yNzc3Mzk',
        newExternalInterview
      }
    })

    expect(MockRescheduleInterviewItem).toHaveBeenCalledWith(
      expect.objectContaining({
        componentType: 'menu-item',
        latestExternalInterview: undefined,
        newExternalInterview
      }),
      {}
    )
  })
})
