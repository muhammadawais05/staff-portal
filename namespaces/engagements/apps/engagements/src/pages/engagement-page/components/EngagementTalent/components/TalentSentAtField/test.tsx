import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import { NO_VALUE } from '@staff-portal/config'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetCurrentUserMock } from '@staff-portal/current-user/src/mocks'

import TalentSentAtField from '.'

jest.unmock('@staff-portal/current-user')

const arrangeTest = (
  props: ComponentProps<typeof TalentSentAtField>,
  timeZone = 'Europe/Moscow'
) =>
  render(
    <TestWrapperWithMocks mocks={[createGetCurrentUserMock({ timeZone })]}>
      <TalentSentAtField {...props} />
    </TestWrapperWithMocks>
  )

describe('TalentSentAtField', () => {
  MockDate.set('2021-06-22T05:55:00+00:00')

  it.each([
    [
      '2021-06-22T05:51:00+04:00',
      'Jun 22, 2021 at 4:51 AM (about 4 hours ago)'
    ],
    ['2021-05-20T01:15:00+08:00', 'May 19, 2021 at 8:15 PM (about 1 month ago)']
  ])(
    'should display formatted %s date in `Europe/Moscow` (UTC+3) timeZone',
    async (date, expectedFormattedDate) => {
      const { findByText } = arrangeTest(
        { talentSentAt: date },
        'Europe/Moscow'
      )

      expect(await findByText(expectedFormattedDate)).toBeInTheDocument()
    }
  )

  it.each([
    ['2021-06-22T05:51:00+04:00', 'Jun 22, 2021 at 8:51 AM (about 4 hours ago)']
  ])(
    'should display formatted %s date in `Asia/Bangkok` (UTC+7) timeZone',
    async (date, expectedFormattedDate) => {
      const { findByText } = arrangeTest({ talentSentAt: date }, 'Asia/Bangkok')

      expect(await findByText(expectedFormattedDate)).toBeInTheDocument()
    }
  )

  it('should render NO_VALUE', () => {
    arrangeTest({ talentSentAt: null })

    expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
  })
})
