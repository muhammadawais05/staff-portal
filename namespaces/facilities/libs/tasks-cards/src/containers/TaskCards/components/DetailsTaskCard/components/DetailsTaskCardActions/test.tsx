import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { TaskWithMetadata } from '../../../../types'
import DetailsTaskCardActions from './DetailsTaskCardActions'

jest.mock('../ScheduleTaskNextCheckButton', () => () => (
  <>ScheduleTaskNextCheckButton Component</>
))

jest.mock('../CancelTaskButton', () => () => <>CancelTaskButton Component</>)

jest.mock('../DisputeTaskButton', () => () => <>DisputeTaskButton Component</>)

const arrangeTest = () => {
  const task = {
    id: 'taskId',
    description: 'Just a task',
    operations: {}
  } as TaskWithMetadata

  const {
    container: { textContent }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <DetailsTaskCardActions task={task} onScheduleTaskNextCheck={jest.fn()} />
    </TestWrapperWithMocks>
  )

  return textContent
}

describe('DetailsTaskCardActions', () => {
  it('has required actions', () => {
    const textContent = arrangeTest()

    expect(textContent).toContain('CancelTaskButton Component')
    expect(textContent).toContain('DisputeTaskButton Component')
    expect(textContent).toContain('ScheduleTaskNextCheckButton Component')
  })
})
