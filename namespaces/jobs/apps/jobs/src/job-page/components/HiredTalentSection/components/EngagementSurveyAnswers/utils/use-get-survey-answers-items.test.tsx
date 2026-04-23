import { renderHook } from '@testing-library/react-hooks'
import { render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedListItem } from '@staff-portal/ui'

import {
  createEngagementSurveyAnswerMock,
  createEngagementSurveyAnswersMock
} from '../data/get-other-engagement-survey-answers/mocks'
import useGetSurveyAnswersItems from './use-get-survey-answers-items'
import EngagementSurveyItemAnswer from '../components/EngagementSurveyItemAnswer'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Container: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Typography: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

jest.mock('../components/EngagementSurveyItemAnswer', () => ({
  __esModule: true,
  default: jest.fn()
}))

const EngagementSurveyItemAnswerMock = EngagementSurveyItemAnswer as jest.Mock

const arrangeTest = (item: DetailedListItem) =>
  render(
    <TestWrapper>
      <span>{item.label}</span>
      <span>{item.value}</span>
    </TestWrapper>
  )

describe('#useGetSurveyAnswersItems', () => {
  beforeEach(() => {
    EngagementSurveyItemAnswerMock.mockImplementation(
      ({ children }: { children: ReactNode }) => <div>{children}</div>
    )
  })

  describe('when there is no items', () => {
    it('returns empty array', async () => {
      const { answers } = createEngagementSurveyAnswersMock()
      const { result } = renderHook(() => useGetSurveyAnswersItems(answers))

      expect(result.current).toEqual([])
    })
  })

  describe('when there is no "question" key', () => {
    it('returns empty array', async () => {
      const item = createEngagementSurveyAnswerMock({ type: 'radio' })
      const { answers } = createEngagementSurveyAnswersMock({ answers: [item] })
      const { result } = renderHook(() => useGetSurveyAnswersItems(answers))

      expect(result.current).toEqual([])
    })
  })

  describe('when there is no "type" key', () => {
    it('returns empty array', async () => {
      const item = createEngagementSurveyAnswerMock({
        question: 'some question'
      })
      const { answers } = createEngagementSurveyAnswersMock({ answers: [item] })
      const { result } = renderHook(() => useGetSurveyAnswersItems(answers))

      expect(result.current).toEqual([])
    })
  })

  describe('when answer is empty', () => {
    describe('when "decoratedAnswer" value is null', () => {
      it('returns proper item', async () => {
        const item = createEngagementSurveyAnswerMock({
          type: 'radio',
          question: 'some question',
          decoratedAnswer: null
        })
        const { answers } = createEngagementSurveyAnswersMock({
          answers: [item]
        })
        const { result } = renderHook(() => useGetSurveyAnswersItems(answers))
        const [radio] = result.current

        arrangeTest(radio)

        expect(screen.getByText('some question')).toBeInTheDocument()
        expect(screen.getByText('—')).toBeInTheDocument()
      })
    })

    describe('when "decoratedAnswer.value" value is null', () => {
      it('returns proper item', async () => {
        const item = createEngagementSurveyAnswerMock({
          type: 'radio',
          question: 'some question',
          decoratedAnswer: {
            value: null
          }
        })
        const { answers } = createEngagementSurveyAnswersMock({
          answers: [item]
        })
        const { result } = renderHook(() => useGetSurveyAnswersItems(answers))
        const [radio] = result.current

        arrangeTest(radio)

        expect(screen.getByText('some question')).toBeInTheDocument()
        expect(screen.getByText('—')).toBeInTheDocument()
      })
    })
  })

  describe('when answer has "textarea" type', () => {
    it('returns proper item', async () => {
      const item = createEngagementSurveyAnswerMock({
        type: 'textarea',
        question: 'some question',
        decoratedAnswer: {
          value: 'some answer'
        }
      })
      const { answers } = createEngagementSurveyAnswersMock({ answers: [item] })
      const { result } = renderHook(() => useGetSurveyAnswersItems(answers))
      const [textarea] = result.current

      arrangeTest(textarea)

      expect(textarea.isFullWidthLabel).toBe(true)
      expect(screen.getByText('some question')).toBeInTheDocument()
      expect(screen.getByText('some answer')).toBeInTheDocument()
      expect(EngagementSurveyItemAnswerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          weight: 'regular'
        }),
        expect.anything()
      )
    })
  })

  describe('when answer has "radio" type', () => {
    it('returns proper item', async () => {
      const item = createEngagementSurveyAnswerMock({
        type: 'radio',
        question: 'some question',
        decoratedAnswer: {
          value: 'some answer'
        }
      })
      const { answers } = createEngagementSurveyAnswersMock({ answers: [item] })
      const { result } = renderHook(() => useGetSurveyAnswersItems(answers))
      const [radio] = result.current

      arrangeTest(radio)

      expect(radio.hasHalfWidthItems).toBe(true)
      expect(screen.getByText('some question')).toBeInTheDocument()
      expect(screen.getByText('some answer')).toBeInTheDocument()
      expect(EngagementSurveyItemAnswerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          weight: 'semibold'
        }),
        expect.anything()
      )
    })
  })

  describe('when answer has "engagement_slider" type', () => {
    it('returns proper item', async () => {
      const item = createEngagementSurveyAnswerMock({
        type: 'engagement_slider',
        question: 'some question',
        decoratedAnswer: {
          value: 'some answer'
        }
      })
      const { answers } = createEngagementSurveyAnswersMock({ answers: [item] })
      const { result } = renderHook(() => useGetSurveyAnswersItems(answers))
      const [engagementSlider] = result.current

      arrangeTest(engagementSlider)

      expect(engagementSlider.hasHalfWidthItems).toBe(true)
      expect(screen.getByText('some question')).toBeInTheDocument()
      expect(screen.getByText('some answer')).toBeInTheDocument()
      expect(EngagementSurveyItemAnswerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          weight: 'semibold'
        }),
        expect.anything()
      )
    })
  })

  describe('when answer has `alerted` flag', () => {
    it.each([true, false])('passes this flag to answer item', alerted => {
      const item = createEngagementSurveyAnswerMock({
        type: 'textarea',
        question: 'some question',
        decoratedAnswer: {
          value: 'some answer',
          alerted
        }
      })
      const { answers } = createEngagementSurveyAnswersMock({ answers: [item] })
      const { result } = renderHook(() => useGetSurveyAnswersItems(answers))
      const [textarea] = result.current

      arrangeTest(textarea)

      expect(EngagementSurveyItemAnswerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          alerted
        }),
        expect.anything()
      )
    })
  })
})
