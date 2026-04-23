import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { TaskMetadataFragment } from '@staff-portal/tasks'

import { TaskCardProps } from '../../../../types'
import DetailsTaskCard from './DetailsTaskCard'

jest.mock('../DetailsTaskCardActions', () => () => (
  <>DetailsTaskCardActions Component</>
))

jest.mock('../DetailsTaskCardContent', () => () => (
  <>DetailsTaskCardContent Component</>
))

const arrangeTest = (operations: TaskMetadataFragment) => {
  const options = {
    task: {
      id: 'taskId',
      description: 'Just a task',
      ...operations
    }
  } as TaskCardProps

  const {
    container: { textContent }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <DetailsTaskCard {...options} />
    </TestWrapperWithMocks>
  )

  return textContent
}

describe('DetailsTaskCard', () => {
  it('renders just content', () => {
    const textContent = arrangeTest({
      operations: {
        disputeTask: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        cancelTask: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      }
    } as unknown as TaskMetadataFragment)

    expect(textContent).not.toContain('DetailsTaskCardActions Component')
    expect(textContent).toContain('DetailsTaskCardContent Component')
  })

  it('renders content and actions', () => {
    const textContent = arrangeTest({
      operations: {
        disputeTask: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        },
        cancelTask: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    } as unknown as TaskMetadataFragment)

    expect(textContent).toContain('DetailsTaskCardActions Component')
    expect(textContent).toContain('DetailsTaskCardContent Component')
  })
})
