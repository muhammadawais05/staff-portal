import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { OfacStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import LogSalesCallBusinessActions, {
  Props
} from './LogSalesCallBusinessActions'

const arrangeTest = ({
  clientPaused = false,
  clientStatus = 'some',
  ofacStatus,
  ofacStatusSuccess = false,
  ofacCheckNotStarted = false,
  ofacCheckInProgress = false,
  ofacFullyChecked = false
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <LogSalesCallBusinessActions
          clientPaused={clientPaused}
          clientStatus={clientStatus}
          ofacStatus={ofacStatus}
          ofacStatusSuccess={ofacStatusSuccess}
          ofacCheckNotStarted={ofacCheckNotStarted}
          ofacCheckInProgress={ofacCheckInProgress}
          ofacFullyChecked={ofacFullyChecked}
          operations={{
            approveClient: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            markClientAsBadLead: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            checkClientCompliance: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            pauseClient: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            repauseClient: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            resumeClient: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            createClientClaimer: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            sendClientClaimEmail: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }}
        />
      </Form>
    </TestWrapper>
  )

describe('LogSalesCallActions', () => {
  it('shows the default radio buttons', () => {
    arrangeTest()

    expect(screen.getByLabelText('Approve')).toBeInTheDocument()
    expect(screen.getByLabelText('Pause Lead')).toBeInTheDocument()
    expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
  })

  it('shows the OFAC in progress radio buttons', () => {
    arrangeTest({ ofacCheckInProgress: true })

    expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
    expect(screen.getByLabelText('Pause Lead')).toBeInTheDocument()
  })

  it('shows the active client radio buttons', () => {
    arrangeTest({ clientStatus: 'active' })

    expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
    expect(screen.getByLabelText('Pause Lead')).toBeInTheDocument()
  })

  it('shows the investigation  OFAC status radio buttons', () => {
    arrangeTest({
      ofacStatus: OfacStatus.INVESTIGATION,
      ofacFullyChecked: true
    })

    expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
    expect(screen.getByLabelText('Pause Lead')).toBeInTheDocument()
  })

  it('shows the OFAC not started radio buttons', () => {
    arrangeTest({ ofacCheckNotStarted: true })

    expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
    expect(screen.getByLabelText('Pause Lead')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Initiate Compliance Check')
    ).toBeInTheDocument()
  })

  describe('Paused Client', () => {
    it('shows the default paused client radio buttons', () => {
      arrangeTest({ clientPaused: true })

      expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
      expect(screen.getByLabelText('Resume')).toBeInTheDocument()
      expect(screen.getByLabelText('Repause')).toBeInTheDocument()
    })

    it('shows the paused client with OFAC success status radio buttons', () => {
      arrangeTest({ clientPaused: true, ofacStatusSuccess: true })

      expect(screen.getByLabelText('Approve')).toBeInTheDocument()
      expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
      expect(screen.getByLabelText('Resume')).toBeInTheDocument()
      expect(screen.getByLabelText('Repause')).toBeInTheDocument()
    })

    it('shows the paused client with OFAC check not started radio buttons', () => {
      arrangeTest({ clientPaused: true, ofacCheckNotStarted: true })

      expect(screen.getByLabelText('Mark as Bad Lead')).toBeInTheDocument()
      expect(screen.getByLabelText('Resume')).toBeInTheDocument()
      expect(screen.getByLabelText('Repause')).toBeInTheDocument()
      expect(
        screen.getByLabelText('Initiate Compliance Check')
      ).toBeInTheDocument()
    })
  })
})
