import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import {
  Operation,
  OperationCallableTypes,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'
import { when } from 'jest-when'

import IdVerificationField, { Props } from './IdVerificationField'
import ApproveIdVerificationModal from './components/ApproveIdVerificationModal'
import { getOperationMock } from './mocks'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const generateOperation = (
  callable: OperationCallableTypes,
  messages: string[] = []
): Operation => ({ callable, messages })

const TALENT_ID = '123'

const arrangeTest = (
  operationType: OperationCallableTypes,
  talentCumulativeStatus: TalentCumulativeStatus,
  mocks?: MockedResponse[]
) => {
  const recentIdVerification = {
    id: '123',
    status: 'pending',
    legalName: 'B LEE',
    selfieUrl: 'TEST_LINK',
    automaticMeetingCancellationCount: 0,
    remainingAttempts: 3,
    statusDisplayKey: 'pending',
    reasonForPausingDisplayKey: 'verification_failure'
  }

  const operation = generateOperation(operationType)

  const props: Props = {
    recentIdVerification,
    operation,
    cumulativeStatus: talentCumulativeStatus,
    talentId: TALENT_ID
  }

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <IdVerificationField {...props} />
    </TestWrapperWithMocks>
  )
}

describe('IdVerificationField', () => {
  let showModal: () => void

  beforeEach(() => {
    showModal = jest.fn()

    when(useModal as jest.Mock)
      .calledWith(ApproveIdVerificationModal, { talentId: TALENT_ID })
      .mockReturnValue({ showModal })
  })

  it('Renders id verification data', async () => {
    arrangeTest(OperationCallableTypes.ENABLED, TalentCumulativeStatus.APPLIED)

    const idVerificationField = await screen.findByTestId(
      /id-verification-field/i
    )
    const selfieField = within(idVerificationField).getByTestId(
      'recent-id-verification-selfie'
    )

    expect(idVerificationField).toBeInTheDocument()
    expect(idVerificationField).toHaveTextContent('Status: Pending')
    expect(idVerificationField).toHaveTextContent('Legal name from ID: B LEE')
    expect(selfieField).toBeInTheDocument()
  })

  describe('when Talent has status "paused"', () => {
    it('Shows reason for pausing', async () => {
      arrangeTest(OperationCallableTypes.ENABLED, TalentCumulativeStatus.PAUSED)

      const idVerificationField = await screen.findByTestId(
        /id-verification-field/i
      )

      expect(idVerificationField).toHaveTextContent(
        'Reason for pausing: Verification failure'
      )
    })
  })

  describe('when Talent has status "applied"', () => {
    it('Does not show reason for pausing', async () => {
      arrangeTest(
        OperationCallableTypes.ENABLED,
        TalentCumulativeStatus.APPLIED
      )

      const idVerificationField = await screen.findByTestId(
        /id-verification-field/i
      )

      expect(idVerificationField).not.toHaveTextContent('Reason for pausing:')
    })
  })

  describe('ApproveIdVerificationButton', () => {
    describe('Operations', () => {
      it('Disables the button if operation is disabled', () => {
        arrangeTest(
          OperationCallableTypes.DISABLED,
          TalentCumulativeStatus.APPLIED
        )

        expect(screen.queryByRole('button', { name: 'Approve' })).toBeDisabled()
      })

      it('Hides the button if operation is hidden', () => {
        arrangeTest(
          OperationCallableTypes.HIDDEN,
          TalentCumulativeStatus.APPLIED
        )

        expect(
          screen.queryByRole('button', { name: 'Approve' })
        ).not.toBeInTheDocument()
      })

      it('Shows the button if operation is enabled', () => {
        arrangeTest(
          OperationCallableTypes.ENABLED,
          TalentCumulativeStatus.APPLIED
        )

        expect(
          screen.queryByRole('button', { name: 'Approve' })
        ).toBeInTheDocument()
      })
    })

    it('Opens id-verification-modal on click', async () => {
      const operationMock = getOperationMock(
        TALENT_ID,
        OperationCallableTypes.ENABLED
      )

      arrangeTest(
        OperationCallableTypes.ENABLED,
        TalentCumulativeStatus.APPLIED,
        [operationMock]
      )

      fireEvent.click(screen.getByTestId('open-approve-id-verification-modal'))

      expect(showModal).toHaveBeenCalled()
    })
  })
})
