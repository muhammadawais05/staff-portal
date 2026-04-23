import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { QuizItem } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentQASection from './'
import {
  createGetTalentQAMock,
  createGetTalentQAFailedMock
} from './data/mocks'

const arrangeTest = (talentId: string, mocks: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentQASection talentId={talentId} />
    </TestWrapperWithMocks>
  )
}

describe('TalentQASection', () => {
  it('lists the Q&As', async () => {
    const talentId = 'some-id'
    const quizItems = [
      {
        questionLabel: 'Question 1',
        readableValue: ['Answer 1']
      },
      {
        questionLabel: 'Question 2',
        readableValue: ['Answer 2.0', 'Answer 2.1']
      }
    ]
    const mocks = [createGetTalentQAMock({ talentId, quizItems })]

    arrangeTest(talentId, mocks)

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading...'))

    expect(screen.getByText(quizItems[0].questionLabel)).toBeInTheDocument()
    expect(screen.getByText(quizItems[0].readableValue[0])).toBeInTheDocument()
    expect(screen.getByText(quizItems[1].questionLabel)).toBeInTheDocument()
    expect(screen.getByText(quizItems[1].readableValue[0])).toBeInTheDocument()
    expect(screen.getByText(quizItems[1].readableValue[1])).toBeInTheDocument()
  })

  it('is closed by default', async () => {
    const talentId = 'some-id'
    const mocks = [createGetTalentQAMock({ talentId })]

    arrangeTest(talentId, mocks)

    expect(await screen.findByTestId('talent-qa-section')).toBeTruthy()
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('shows an error when unable to fetch Q&As', async () => {
    const talentId = 'some-id'
    const mocks = [createGetTalentQAFailedMock({ talentId })]

    arrangeTest(talentId, mocks)

    expect(
      await screen.findByText('Unable to fetch questions and answers.')
    ).toBeInTheDocument()
  })

  it('hides the section when the Q&A list is empty', async () => {
    const talentId = 'some-id'
    const quizItems: QuizItem[] = []

    const mocks = [createGetTalentQAMock({ talentId, quizItems })]

    arrangeTest(talentId, mocks)

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading...'))

    expect(screen.queryByText('Q&A')).not.toBeInTheDocument()
  })
})
