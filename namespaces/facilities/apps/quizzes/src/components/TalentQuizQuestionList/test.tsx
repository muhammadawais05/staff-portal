import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'

import { TalentQuizQuestionFragment } from '../../data/talent-quiz-question-fragment'
import { crateTalentQuizQuestionMock } from '../../data/get-talent-quiz-questions-list/mocks'
import { TalentQuizQuestionItem } from '../../components'
import TalentQuizQuestionList from './TalentQuizQuestionList'

jest.mock('../../components', () => ({
  TalentQuizQuestionItem: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  ItemsList: jest.fn(),
  NoSearchResultsMessage: jest.fn()
}))

const MockItemsList = ItemsList as jest.Mock
const MockNoSearchResultsMessage = NoSearchResultsMessage as jest.Mock
const MockTalentQuizQuestionItem = TalentQuizQuestionItem as jest.Mock

const getTalentQuizQuestion = () => crateTalentQuizQuestionMock()

const arrangeTest = (
  talentQuizQuestions: TalentQuizQuestionFragment[],
  loading: boolean
) => {
  MockItemsList.mockImplementation(({ data, renderItem, notFoundMessage }) => {
    return (
      <>
        <span>{notFoundMessage}</span>
        {data.map((item: TalentQuizQuestionFragment) => (
          <span key={item.id}>{renderItem(item)}</span>
        ))}
      </>
    )
  })

  MockNoSearchResultsMessage.mockImplementation(() => null)

  MockTalentQuizQuestionItem.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <TalentQuizQuestionList
        talentQuizQuestions={talentQuizQuestions}
        loading={loading}
      />
    </TestWrapper>
  )
}

describe('TalentQuizQuestionList', () => {
  it('passes correct properties', () => {
    const talentQuizQuestion = getTalentQuizQuestion()

    arrangeTest([talentQuizQuestion], true)

    expect(MockItemsList).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [talentQuizQuestion],
        loading: true
      }),
      {}
    )

    expect(MockNoSearchResultsMessage).toHaveBeenCalledWith(
      { message: 'No quizzes found' },
      {}
    )

    expect(MockTalentQuizQuestionItem).toHaveBeenCalledWith(
      {
        talentQuizQuestion
      },
      {}
    )
  })
})
