import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import talentMock from '../../../../data/talent-fragment/mocks'
import { TaskTalentFragment } from '../../../../data/talent-fragment'
import TalentTaskCardJobs from './TalentTaskCardJobs'

const ACTIVE_JOB_COUNTER = 1
const REMOVED_JOB_COUNTER = 2
const CLOSED_JOB_COUNTER = 3

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TalentTaskCardJobs
        talent={
          {
            ...talentMock,
            engagements: {
              jobCounters: {
                active: ACTIVE_JOB_COUNTER,
                removed: REMOVED_JOB_COUNTER,
                closed: CLOSED_JOB_COUNTER
              }
            }
          } as unknown as TaskTalentFragment
        }
      />
    </TestWrapper>
  )

describe('TalentTaskCardJobs', () => {
  it('renders', () => {
    arrangeTest()

    expect(
      screen.getByText(
        `${ACTIVE_JOB_COUNTER} / ${REMOVED_JOB_COUNTER} / ${CLOSED_JOB_COUNTER}`
      )
    ).toBeInTheDocument()
  })
})
