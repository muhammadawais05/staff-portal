import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useForm } from '@toptal/picasso-forms'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import CandidateSendingDraftButton from '../CandidateSendingDraftButton'
import CandidateSendingPendingApprovalButton from '../CandidateSendingPendingApprovalButton'
import CandidateSendingSendButton from '../CandidateSendingSendButton'
import CandidateSendingPitchStepActions, {
  Props
} from './CandidateSendingPitchStepActions'

jest.mock('@toptal/picasso-forms')
jest.mock('../CandidateSendingDraftButton')
jest.mock('../CandidateSendingPendingApprovalButton')
jest.mock('../CandidateSendingSendButton')

const mockUseForm = useForm as jest.Mock
const mockCandidateSendingDraftButton = CandidateSendingDraftButton as jest.Mock
const mockCandidateSendingPendingApprovalButton =
  CandidateSendingPendingApprovalButton as jest.Mock
const mockCandidateSendingSendButton = CandidateSendingSendButton as jest.Mock

const renderComponent = ({
  draftStakeholderId,
  engagementId = '123',
  hasPendingAssignment = false,
  talentType = 'developer',
  toptalProjects,
  enterprise
}: Partial<Props> = {}) => {
  mockUseForm.mockImplementation(() => ({
    submit: jest.fn()
  }))

  mockCandidateSendingDraftButton.mockImplementation(() => null)
  mockCandidateSendingPendingApprovalButton.mockImplementation(() => null)
  mockCandidateSendingSendButton.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <CandidateSendingPitchStepActions
        draftStakeholderId={draftStakeholderId}
        engagementId={engagementId}
        hasPendingAssignment={hasPendingAssignment}
        talentType={talentType}
        toptalProjects={toptalProjects}
        enterprise={enterprise}
      />
    </TestWrapper>
  )
}

describe('CandidateSendingPitchStepActions', () => {
  describe('default render', () => {
    it('shows the sending button', () => {
      renderComponent()

      expect(mockCandidateSendingDraftButton).not.toHaveBeenCalled()
      expect(mockCandidateSendingPendingApprovalButton).not.toHaveBeenCalled()

      expect(mockCandidateSendingSendButton).toHaveBeenCalledWith(
        {
          hasPendingAssignment: false,
          talentType: 'developer',
          onClick: expect.anything()
        },
        expect.anything()
      )
    })
  })

  describe('when `toptalProjects` or `enterprise` flags are `falsy`', () => {
    it('hides additional buttons', () => {
      renderComponent({ toptalProjects: false, enterprise: false })

      expect(mockCandidateSendingPendingApprovalButton).not.toHaveBeenCalled()
      expect(mockCandidateSendingDraftButton).not.toHaveBeenCalled()

      expect(mockCandidateSendingSendButton).toHaveBeenCalledWith(
        {
          hasPendingAssignment: false,
          talentType: 'developer',
          onClick: expect.anything()
        },
        expect.anything()
      )
    })
  })

  describe.each([
    {
      toptalProjects: false,
      enterprise: true
    },
    {
      toptalProjects: true,
      enterprise: false
    },
    {
      toptalProjects: true,
      enterprise: true
    }
  ])(
    'whe `toptalProjects` or `enterprise` flags are `truthy`',
    ({ toptalProjects, enterprise }) => {
      describe('when current use is not draft stakeholder', () => {
        it('shows additional buttons', () => {
          renderComponent({ toptalProjects, enterprise })

          expect(mockCandidateSendingDraftButton).toHaveBeenCalledWith(
            { engagementId: '123', onClick: expect.anything() },
            expect.anything()
          )

          expect(
            mockCandidateSendingPendingApprovalButton
          ).toHaveBeenCalledWith(
            { engagementId: '123', onClick: expect.anything() },
            expect.anything()
          )

          expect(mockCandidateSendingSendButton).toHaveBeenCalledWith(
            {
              hasPendingAssignment: false,
              talentType: 'developer',
              onClick: expect.anything()
            },
            expect.anything()
          )
        })
      })

      describe('when current use is draft stakeholder', () => {
        it('shows the update draft button onlu', () => {
          renderComponent({
            toptalProjects,
            enterprise,
            draftStakeholderId: encodeEntityId('123', 'Staff')
          })

          expect(mockCandidateSendingDraftButton).toHaveBeenCalledWith(
            { engagementId: '123', onClick: expect.anything() },
            expect.anything()
          )

          expect(
            mockCandidateSendingPendingApprovalButton
          ).not.toHaveBeenCalled()

          expect(mockCandidateSendingSendButton).toHaveBeenCalledWith(
            {
              hasPendingAssignment: false,
              talentType: 'developer',
              onClick: expect.anything()
            },
            expect.anything()
          )
        })
      })
    }
  )
})
