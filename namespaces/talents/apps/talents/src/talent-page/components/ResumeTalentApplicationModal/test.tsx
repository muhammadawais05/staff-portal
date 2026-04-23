import { render } from '@testing-library/react'
import React from 'react'
import { ResumeTalentApplicationNextActions } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { useResumeTalentApplication } from './data'
import ResumeTalentApplicationModal from './ResumeTalentApplicationModal'
import { ResumeTalentApplicationModalProps } from './types'
import { useGetResumeTalentApplicationDetails } from '../ResumeTalentApplicationGenericModal/data'
import { ResumeTalentApplicationGenericModalContentProps } from '../ResumeTalentApplicationGenericModal/types'
import ResumeTalentApplicationGenericModal from '../ResumeTalentApplicationGenericModal'

jest.mock('../ResumeTalentApplicationGenericModal')
const ResumeTalentApplicationGenericModalMock =
  ResumeTalentApplicationGenericModal as jest.Mock

jest.mock('../ResumeTalentApplicationGenericModal/data', () => ({
  __esModule: true,
  useGetResumeTalentApplicationDetails: jest.fn()
}))
const mockUseGetResumeTalentApplicationDetails =
  useGetResumeTalentApplicationDetails as jest.Mock

jest.mock('./data', () => ({
  __esModule: true,
  useResumeTalentApplication: jest.fn()
}))
const mockUseResumeTalentApplication = useResumeTalentApplication as jest.Mock

const mockReturnValues = ({
  manualRestorationAvailable
}: Partial<ResumeTalentApplicationGenericModalContentProps>) => {
  ResumeTalentApplicationGenericModalMock.mockImplementation(() => <div />)

  mockUseGetResumeTalentApplicationDetails.mockReturnValue({
    applicationManualRestorationAvailable: manualRestorationAvailable,
    loading: false
  })

  mockUseResumeTalentApplication.mockReturnValue([
    () => ({
      data: {
        resumeTalentApplication: {
          success: true,
          errors: [],
          nextAction:
            ResumeTalentApplicationNextActions.SEND_TALENT_TO_PORTFOLIO_REVIEW
        }
      }
    }),
    { loading: false }
  ])
}

const arrangeTest = ({
  talentId = '123',
  manualRestorationAvailable,
  onSendToPortfolioReview
}: Partial<ResumeTalentApplicationGenericModalContentProps> &
  Partial<ResumeTalentApplicationModalProps> = {}) => {
  mockReturnValues({
    manualRestorationAvailable
  })

  return render(
    <TestWrapperWithMocks>
      <ResumeTalentApplicationModal
        isTopModal={true}
        hideModal={jest.fn()}
        talentId={talentId}
        onSendToPortfolioReview={onSendToPortfolioReview}
      />
    </TestWrapperWithMocks>
  )
}

describe('ResumeTalentApplicationModal', () => {
  it('calls generic modal with correct props', () => {
    arrangeTest({ talentId: '111' })

    expect(ResumeTalentApplicationGenericModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        talentId: '111',
        onSubmit: expect.any(Function),
        isSubmitting: false,
        isResumeTalentApplicationModal: true
      }),
      expect.anything()
    )
  })
})
