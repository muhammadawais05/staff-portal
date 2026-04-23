import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { TaskWithOptionalMetadata } from '@staff-portal/tasks'

import DetailsTaskCardContent from './DetailsTaskCardContent'

jest.mock('../TaskPlaybook', () => () => <>TaskPlaybook Component</>)
jest.mock('../TaskHistory', () => () => <>TaskHistory Component</>)
jest.mock('../AddCommentForm', () => () => <>AddCommentForm Component</>)
jest.mock('../TaskTags', () => () => <>TaskTags Component</>)
jest.mock('../TaskWatchers', () => () => <>TaskWatchers Component</>)

jest.mock('@staff-portal/operations', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/operations'),
  Operation: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

const arrangeTest = (customOptions: Partial<TaskWithOptionalMetadata> = {}) => {
  const task = {
    id: 'taskId',
    description: 'Just a task',
    performer: { id: 'performerId' },
    ...customOptions
  } as TaskWithOptionalMetadata

  const {
    container: { textContent }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <DetailsTaskCardContent
        task={task}
        onCommentAdd={jest.fn()}
        historyPollInterval={10}
      />
    </TestWrapperWithMocks>
  )

  return textContent
}

describe('DetailsTaskCardContent', () => {
  it('has required sub-components', () => {
    const textContent = arrangeTest()

    expect(textContent).toContain('TaskHistory Component')
    expect(textContent).toContain('AddCommentForm Component')
    expect(textContent).toContain('TaskTags Component')
  })

  it('does not have TaskPlaybook', () => {
    const textContent = arrangeTest({
      playbookTemplate: undefined
    })

    expect(textContent).not.toContain('TaskPlaybook Component')
  })

  it('has TaskPlaybook', () => {
    const textContent = arrangeTest({
      playbookTemplate: {}
    } as TaskWithOptionalMetadata)

    expect(textContent).toContain('TaskPlaybook Component')
  })
})
