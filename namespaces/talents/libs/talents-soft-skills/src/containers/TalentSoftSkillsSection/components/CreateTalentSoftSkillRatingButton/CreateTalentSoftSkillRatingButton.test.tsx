import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import {
  OperationCallableTypes,
  SoftSkillRatingValue
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import CreateTalentSoftSkillRatingButton, {
  Props
} from './CreateTalentSoftSkillRatingButton'
import CreateTalentSoftSkillRatingModal from '../CreateTalentSoftSkillRatingModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()

const modalProps = {
  talentId: 'talent-id',
  talentName: 'talent name',
  softSkill: {
    id: 'soft-skill-id',
    name: 'soft skill name',
    cumulativeRating: 3,
    ratings: [],
    ratingHints: [
      {
        description: 'Some description',
        title: 'Some title',
        value: SoftSkillRatingValue.RATING_1
      }
    ]
  }
}

const buttonProps: Props = {
  ...modalProps,
  operation: {
    messages: [],
    callable: OperationCallableTypes.ENABLED
  }
}

const arrangeTest = (props = buttonProps) => {
  useModalMock.mockReturnValue({ showModal })

  render(
    <TestWrapper>
      <CreateTalentSoftSkillRatingButton {...props} />
    </TestWrapper>
  )
}

describe('CreateTalentSoftSkillRatingButton', () => {
  it('calls the modal with correct props', async () => {
    arrangeTest()

    fireEvent.click(screen.getByRole('button', { name: 'Rate' }))

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(
      CreateTalentSoftSkillRatingModal,
      modalProps
    )
  })

  it('disables the button', async () => {
    arrangeTest({
      ...buttonProps,
      operation: {
        ...buttonProps.operation,
        callable: OperationCallableTypes.DISABLED
      }
    })

    expect(screen.getByRole('button', { name: 'Rate' })).toBeDisabled()
  })
})
