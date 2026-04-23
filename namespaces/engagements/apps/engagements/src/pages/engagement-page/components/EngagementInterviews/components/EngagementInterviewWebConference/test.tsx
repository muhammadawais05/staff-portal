import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementInterviewWebConference, {
  Props
} from './EngagementInterviewWebConference'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateTimeFormatter: () => (dateString: string, dateFormat: string) => {
    const { parseAndFormatDateTime } = jest.requireActual(
      '@staff-portal/date-time-utils/src/parse-and-format-date'
    )

    return parseAndFormatDateTime(dateString, {
      timeZone: 'Europe/Moscow',
      dateFormat
    })
  }
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <div data-testid='test-wrapper'>
        <EngagementInterviewWebConference {...props} />
      </div>
    </TestWrapper>
  )

describe('EngagementInterviewWebConference', () => {
  it('renders nothing', () => {
    arrangeTest({
      interview: {
        webConferenceInfo: { url: null },
        occurred: null,
        bluejeansMeetingHistory: null
      }
    })

    expect(screen.getByTestId('test-wrapper')).toBeEmptyDOMElement()
  })

  it('renders only web conference url', () => {
    const URL = 'https://some.url'

    arrangeTest({
      interview: {
        webConferenceInfo: { url: URL },
        occurred: null,
        bluejeansMeetingHistory: {
          startTime: '2021-06-24T00:00:18+03:00',
          durationInSeconds: 3630
        }
      }
    })

    expect(screen.getByTestId('test-wrapper').childElementCount).toBe(1)
    expect(screen.getByText(URL)).toHaveAttribute('href', URL)
  })

  it('renders web conference url bluejeans info', () => {
    const URL = 'https://some.url'

    arrangeTest({
      interview: {
        webConferenceInfo: { url: URL },
        occurred: true,
        bluejeansMeetingHistory: {
          startTime: '2021-06-24T00:00:18+03:00',
          durationInSeconds: 3630
        }
      }
    })

    expect(screen.getByTestId('test-wrapper').childElementCount).toBe(3)
    expect(screen.getByText(URL)).toHaveAttribute('href', URL)
    expect(
      screen.getByText('Jun 24, 2021 at 12:00 AM (UTC +03:00)')
    ).toBeInTheDocument()
    expect(screen.getByText('60 minutes')).toBeInTheDocument()
  })
})
