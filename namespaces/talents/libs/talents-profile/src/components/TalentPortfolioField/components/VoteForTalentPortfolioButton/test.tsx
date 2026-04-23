import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import VoteForTalentPortfolioModal from '../VoteForTalentPortfolioModal'
import VoteForTalentPortfolioButton, {
  Props
} from './VoteForTalentPortfolioButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()

const talentName = 'Test Talent'
const talentId = '123'
const portfolioFileId = 'Test portfolio'
const specializationApplicationId = 'test application id'

const modalProps = {
  talentId,
  talentName,
  portfolioFileId,
  specializationApplicationId
}

const buttonProps = {
  ...modalProps,
  operation: createOperationMock()
} as Props

const arrangeTest = (props: Props) => {
  useModalMock.mockReturnValue({ showModal })

  render(
    <TestWrapper>
      <VoteForTalentPortfolioButton {...props} />
    </TestWrapper>
  )
}

describe('VoteForTalentPortfolioButton', () => {
  it('opens the vote for talent portfolio modal', () => {
    arrangeTest(buttonProps)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(
      VoteForTalentPortfolioModal,
      modalProps
    )
  })
})
