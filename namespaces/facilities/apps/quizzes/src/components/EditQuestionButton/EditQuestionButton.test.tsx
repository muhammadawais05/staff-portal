import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  OperationCallableTypes,
  TalentQuizQuestion
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { crateTalentQuizQuestionMock } from '../../data/get-talent-quiz-questions-list/mocks'
import EditQuestionButton from './EditQuestionButton'

const createQuestionMock = (
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED
) =>
  crateTalentQuizQuestionMock({
    operations: { updateTalentQuizQuestion: createOperationMock({ callable }) }
  })

const arrangeTest = (question: TalentQuizQuestion = createQuestionMock()) => {
  return render(
    <TestWrapper>
      <EditQuestionButton question={question} />
    </TestWrapper>
  )
}

describe('EditQuestionButton', () => {
  describe('when operation is enabled', () => {
    it('shows delete button', () => {
      arrangeTest()

      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    })
  })

  describe('when operation is hidden', () => {
    it('hides delete button', () => {
      arrangeTest(createQuestionMock(OperationCallableTypes.HIDDEN))

      expect(
        screen.queryByRole('button', { name: 'Edit' })
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is disabled', () => {
    it('disables delete button', () => {
      arrangeTest(createQuestionMock(OperationCallableTypes.DISABLED))

      expect(screen.getByRole('button', { name: 'Edit' })).toBeDisabled()
    })
  })
})
