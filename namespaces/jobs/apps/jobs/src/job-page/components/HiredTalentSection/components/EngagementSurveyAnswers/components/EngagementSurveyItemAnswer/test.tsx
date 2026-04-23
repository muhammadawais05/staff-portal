import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Typography } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementSurveyItemAnswer, { Props } from './EngagementSurveyItemAnswer'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Typography: jest.fn()
}))

const TypographyMock = Typography as unknown as jest.Mock

const arrangeTest = (props: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <EngagementSurveyItemAnswer alerted={false} {...props}>
        Some answer
      </EngagementSurveyItemAnswer>
    </TestWrapper>
  )

describe('EngagementSurveyItemAnswer', () => {
  beforeEach(() => {
    TypographyMock.mockImplementation(() => <div />)
  })

  describe('when answer is not `alerted`', () => {
    it('displays answer with inherit color', () => {
      arrangeTest({ alerted: false })

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: 'inherit' }),
        expect.anything()
      )
    })
  })

  describe('when answer is `alerted`', () => {
    it('displays answer with red color', () => {
      arrangeTest({ alerted: true })

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: 'red' }),
        expect.anything()
      )
    })
  })

  describe('when answer text `weight` is set', () => {
    it('displays answer with correct font weight', () => {
      arrangeTest({ weight: 'semibold' })

      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({ weight: 'semibold' }),
        expect.anything()
      )
    })
  })
})
