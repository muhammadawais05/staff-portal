import { quizMock } from '../data/get-quiz.mock'
import { getIsQuizSectionDisplayed } from './getIsQuizSectionDisplayed'

describe('displays the quiz section', () => {
  it('when there are quiz items', () => {
    expect(
      getIsQuizSectionDisplayed({
        quizItems: quizMock.quizItems.nodes
      })
    ).toBe(true)
  })

  it('when there is referral page', () => {
    expect(
      getIsQuizSectionDisplayed({
        quizItems: [],
        referralPage: quizMock.referralPage
      })
    ).toBe(true)
  })

  it('when there is remote quiz url', () => {
    expect(
      getIsQuizSectionDisplayed({
        quizItems: [],
        remoteQuizUrl: quizMock.remoteQuizUrl
      })
    ).toBe(true)
  })
})

describe('does not display the quiz section', () => {
  it('when there are no quiz items, no referral page, and no remote quiz url', () => {
    expect(
      getIsQuizSectionDisplayed({
        quizItems: []
      })
    ).toBe(false)
  })
})
