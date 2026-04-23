import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import PageWithOperation from '.'

const arrangeTest = async (props: ComponentProps<typeof PageWithOperation>) => {
  render(
    <TestWrapper>
      <PageWithOperation {...props} />
    </TestWrapper>
  )
}

const mockOperation = (callable: OperationCallableTypes) => ({
  callable,
  messages: []
})

describe('PageWithOperation', () => {
  it('renders page content (children) when operation is enabled', () => {
    const props: ComponentProps<typeof PageWithOperation> = {
      operation: mockOperation(OperationCallableTypes.ENABLED),
      errorContent: 'Access denined',
      children: 'This is page content'
    }

    arrangeTest(props)

    expect(screen.queryByText('Access denined')).not.toBeInTheDocument()
    expect(screen.getByText('This is page content')).toBeInTheDocument()
  })

  it('renders custom error content when operation is not enabled', () => {
    const props: ComponentProps<typeof PageWithOperation> = {
      operation: mockOperation(OperationCallableTypes.HIDDEN),
      errorContent: 'Access denined',
      children: 'This is page content'
    }

    arrangeTest(props)

    expect(screen.getByText('Access denined')).toBeInTheDocument()
    expect(screen.queryByText('This is page content')).not.toBeInTheDocument()
  })

  it('renders default error content when operation is not enabled', () => {
    const props: ComponentProps<typeof PageWithOperation> = {
      operation: mockOperation(OperationCallableTypes.HIDDEN),
      children: 'This is page content'
    }

    arrangeTest(props)

    expect(
      screen.getByText('This operation cannot be performed at this moment.')
    ).toBeInTheDocument()
    expect(screen.queryByText('This is page content')).not.toBeInTheDocument()
  })
})
