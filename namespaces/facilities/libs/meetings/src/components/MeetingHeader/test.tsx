import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { MeetingFragment } from '../../data/meeting-fragment'
import MeetingHeader from './MeetingHeader'

jest.mock('../MeetingActions', () => () => <>MeetingActions</>)

const MEETING_SUBJECT = 'test subject'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <MeetingHeader
        size='small'
        meeting={{ subject: MEETING_SUBJECT } as MeetingFragment}
      />
    </TestWrapper>
  )

describe('MeetingHeader', () => {
  it('renders meeting subject and actions', () => {
    const {
      container: { textContent }
    } = arrangeTest()

    expect(textContent).toContain(MEETING_SUBJECT)
    expect(textContent).toContain('MeetingActions')
  })
})
