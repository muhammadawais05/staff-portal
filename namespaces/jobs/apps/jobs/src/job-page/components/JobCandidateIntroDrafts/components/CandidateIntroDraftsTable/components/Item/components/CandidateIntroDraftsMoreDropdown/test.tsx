import React from 'react'
import { render, screen } from '@testing-library/react'
import { MessagesProvider } from '@toptal/staff-portal-message-bus'
import { createMemoryHistory } from 'history'
import { Router } from '@staff-portal/navigation'
import { ModalProvider, useModalRegistry } from '@staff-portal/modals-service'
import {
  EngagementStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CandidateIntroDraftsMoreDropdown, {
  Props
} from './CandidateIntroDraftsMoreDropdown'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: () => ({ pathname: '/', search: '' })
}))
// hack to fix package circular dependency issue
jest.mock('@staff-portal/talents')

type PartialProps = Partial<Omit<Props['candidate'], 'operations'>> & {
  operations?: Partial<Props['candidate']['operations']>
}

const ENABLED_OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const HIDDEN_OPERATION = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}

const DISABLED_OPERATION = {
  callable: OperationCallableTypes.DISABLED,
  messages: ['This operation is disabled.']
}

const TestApp = ({ candidate }: { candidate: Props['candidate'] }) => {
  const history = createMemoryHistory()
  const registry = useModalRegistry()

  return (
    <Router history={history}>
      <TestWrapper>
        <MessagesProvider>
          <ModalProvider registry={registry}>
            <CandidateIntroDraftsMoreDropdown candidate={candidate} />
          </ModalProvider>
        </MessagesProvider>
      </TestWrapper>
    </Router>
  )
}

const arrangeTest = (props: PartialProps = {}) => {
  const candidate = {
    id: '123',
    viewIntroDraft: {
      enabled: true,
      tooltip: null,
      url: ''
    },
    latestInternalInterview: { nodes: [] },
    newInternalInterview: {
      id: '1',
      operations: {
        proposeInternalInterviewTimeSlots: HIDDEN_OPERATION,
        clearAndChangeInternalInterviewProposedTimeSlots: HIDDEN_OPERATION
      }
    },
    status: EngagementStatus.ACTIVE,
    ...props,
    operations: {
      sendEngagementTalentIntroductionTestEmail: HIDDEN_OPERATION,
      rejectDraftEngagement: HIDDEN_OPERATION,
      approveDraftEngagement: HIDDEN_OPERATION,
      cancelEngagementDraftInInterview: HIDDEN_OPERATION,
      restoreCancelledEngagement: HIDDEN_OPERATION,
      ...props.operations
    }
  } as Props['candidate']

  return render(<TestApp candidate={candidate} />)
}

describe('CandidateIntroDraftsMoreDropdown', () => {
  describe('MoreButton', () => {
    describe('when all operations are hidden', () => {
      it('does not render the button', () => {
        arrangeTest()

        expect(screen.queryByTestId('more-button')).not.toBeInTheDocument()
      })
    })

    describe('when at least one operation is enabled', () => {
      it('renders the button', () => {
        arrangeTest({
          operations: {
            sendEngagementTalentIntroductionTestEmail: ENABLED_OPERATION
          }
        })

        expect(screen.queryByTestId('more-button')).toBeInTheDocument()
      })
    })

    describe('when at least one operation is disabled', () => {
      it('renders the button', () => {
        arrangeTest({
          operations: {
            sendEngagementTalentIntroductionTestEmail: DISABLED_OPERATION
          }
        })

        expect(screen.queryByTestId('more-button')).toBeInTheDocument()
      })
    })

    describe('when all operations are hidden but engagement is a pitch snippet engagement', () => {
      it('renders the button', () => {
        arrangeTest({
          status: EngagementStatus.DRAFT
        })

        expect(screen.queryByTestId('more-button')).toBeInTheDocument()
      })
    })
  })

  describe('`Send Test Email` item', () => {
    describe('when `sendEngagementTalentIntroductionTestEmail` operation is allowed', () => {
      it('renders the `Send Test Email` action', () => {
        arrangeTest({
          operations: {
            sendEngagementTalentIntroductionTestEmail: ENABLED_OPERATION
          }
        })

        screen.getByTestId('more-button').click()
        expect(screen.queryByText('Send Test Email')).toBeInTheDocument()
      })
    })

    describe('when `sendEngagementTalentIntroductionTestEmail` operation is hidden', () => {
      it('does not render the `Send Test Email` action', () => {
        arrangeTest({
          status: EngagementStatus.DRAFT, // to be sure that `more` button will render
          operations: {
            sendEngagementTalentIntroductionTestEmail: HIDDEN_OPERATION
          }
        })

        screen.getByTestId('more-button').click()
        expect(screen.queryByText('Send Test Email')).not.toBeInTheDocument()
      })
    })
  })

  describe('`View Pitch Snippet` item', () => {
    describe('when engagement is a pitch snippet engagement', () => {
      it('renders the `View Pitch Snippet` action', () => {
        arrangeTest({
          status: EngagementStatus.DRAFT
        })

        screen.getByTestId('more-button').click()
        expect(screen.queryByText('View Pitch Snippet')).toBeInTheDocument()
      })
    })

    describe('when engagement is not a pitch snippet engagement', () => {
      it('does not render the `View Pitch Snippet` action', () => {
        arrangeTest({
          status: EngagementStatus.ACTIVE,
          operations: {
            sendEngagementTalentIntroductionTestEmail: ENABLED_OPERATION
          } // to be sure that `more` button will render
        })

        screen.getByTestId('more-button').click()
        expect(screen.queryByText('View Pitch Snippet')).not.toBeInTheDocument()
      })
    })
  })

  describe('`Reject with Feedback` item', () => {
    it('renders the "Reject with Feedback" action when not hidden', () => {
      arrangeTest({
        operations: {
          rejectDraftEngagement: ENABLED_OPERATION
        }
      })

      screen.getByTestId('more-button').click()
      expect(screen.getByText('Reject With Feedback')).toBeInTheDocument()
    })
  })

  describe('`Approve Draft` item', () => {
    it('renders the `Approve Draft` action when not hidden', () => {
      arrangeTest({
        operations: {
          approveDraftEngagement: ENABLED_OPERATION
        }
      })

      screen.getByTestId('more-button').click()
      expect(screen.getByText('Approve Draft')).toBeInTheDocument()
    })
  })

  describe('`Schedule Internal Interview` item', () => {
    it('renders the "Schedule Internal Interview" action when not hidden', () => {
      arrangeTest({
        newInternalInterview: {
          id: '1',
          operations: {
            scheduleInternalSingleCommitInterview: ENABLED_OPERATION,
            proposeInternalInterviewTimeSlots: ENABLED_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: HIDDEN_OPERATION,
            clearAndChangeInternalInterviewProposedTimeSlots: HIDDEN_OPERATION
          }
        }
      })

      screen.getByTestId('more-button').click()
      expect(
        screen.getByText('Schedule Internal Interview')
      ).toBeInTheDocument()
    })
  })

  describe('`Reschedule Internal Interview` item', () => {
    it('renders the "Cancel Draft" action when not hidden', () => {
      arrangeTest({
        newInternalInterview: {
          id: '1',
          operations: {
            scheduleInternalSingleCommitInterview: HIDDEN_OPERATION,
            proposeInternalInterviewTimeSlots: HIDDEN_OPERATION,
            clearAndRescheduleInternalSingleCommitInterview: ENABLED_OPERATION,
            clearAndChangeInternalInterviewProposedTimeSlots: ENABLED_OPERATION
          }
        }
      })

      screen.getByTestId('more-button').click()
      expect(
        screen.getByText('Reschedule Internal Interview')
      ).toBeInTheDocument()
    })
  })

  describe('`Cancel Draft` item', () => {
    it('renders the "Cancel Draft" action when not hidden', () => {
      arrangeTest({
        operations: {
          cancelEngagementDraftInInterview: ENABLED_OPERATION
        }
      })

      screen.getByTestId('more-button').click()
      expect(screen.getByText('Cancel Draft')).toBeInTheDocument()
    })
  })

  describe('`Restore Cancelled Interview` item', () => {
    it('renders the "Restore Cancelled Interview" action when not hidden', () => {
      arrangeTest({
        operations: {
          restoreCancelledEngagement: ENABLED_OPERATION
        }
      })

      screen.getByTestId('more-button').click()
      expect(
        screen.getByText('Restore Cancelled Interview')
      ).toBeInTheDocument()
    })
  })

  describe('`View Resume` item', () => {
    describe('when an engagement resumeUrl differs a talent resumeUrl', () => {
      it('renders the action', () => {
        arrangeTest({
          resumeUrl: 'https://new-resume-url.com',
          talent: {
            id: '',
            fullName: '',
            type: '',
            webResource: { text: '' },
            resumeUrl: 'https://test.com'
          }
        })

        screen.getByTestId('more-button').click()
        expect(screen.getByText('View Resume')).toBeInTheDocument()
      })
    })

    describe('when an engagement resumeUrl is the same a talent resumeUrl', () => {
      it('does not render the action', () => {
        const resumeUrl = 'https://test.com'

        arrangeTest({
          resumeUrl,
          talent: {
            id: '',
            fullName: '',
            type: '',
            webResource: { text: '' },
            resumeUrl
          },
          status: EngagementStatus.DRAFT
        })

        screen.getByTestId('more-button').click()
        expect(screen.queryByText('View Resume')).not.toBeInTheDocument()
      })
    })
  })
})
