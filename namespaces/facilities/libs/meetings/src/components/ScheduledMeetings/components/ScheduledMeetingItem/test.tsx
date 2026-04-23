import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import ScheduledMeetingItem from './ScheduledMeetingItem'

jest.mock('../../../MeetingHeader', () => () => <>MeetingHeader</>)

jest.mock('../../../MeetingItemWithKnownAttendeeFields', () => () => (
  <>MeetingItemWithKnownAttendeeFields</>
))

describe('ScheduledMeetingItem', () => {
  it('consist of 2 required components', () => {
    const { container } = render(
      <TestWrapper>
        <ScheduledMeetingItem
          meeting={{ subject: 'test subject' } as MeetingFragment}
        />
      </TestWrapper>
    )

    expect(container.textContent).toContain('MeetingHeader')
    expect(container.textContent).toContain(
      'MeetingItemWithKnownAttendeeFields'
    )
  })
})
