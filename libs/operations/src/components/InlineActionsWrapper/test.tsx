import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'

import OperationWrapper from '../OperationWrapper'
import LazyOperation, { GetLazyOperationVariables } from '../LazyOperation'
import InlineActionsWrapper from '.'

const getLazyOperationVariables: GetLazyOperationVariables = {
  nodeId: '123',
  nodeType: NodeType.CLIENT,
  operationName: 'markClientAsBadLead'
}

const arrangeTest = (
  props: Omit<ComponentProps<typeof InlineActionsWrapper>, 'children'> = {}
) =>
  render(
    <TestWrapper>
      <InlineActionsWrapper {...props}>
        <OperationWrapper
          operation={{
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }}
        >
          <Button data-testid='button-enabled'>Example Enabled</Button>
        </OperationWrapper>
        <OperationWrapper
          operation={{
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          }}
        >
          <Button data-testid='button-hidden'>Example Hidden</Button>
        </OperationWrapper>
        <LazyOperation
          initialOperation={{
            callable: OperationCallableTypes.DISABLED,
            messages: []
          }}
          getLazyOperationVariables={getLazyOperationVariables}
        >
          {() => (
            <Button data-testid='button-disabled'>Example Disabled</Button>
          )}
        </LazyOperation>
        <div data-testid='just-an-element'>Test</div>
      </InlineActionsWrapper>
    </TestWrapper>
  )

describe('InlineActionsWrapper', () => {
  it('renders InlineActionsWrapper properly', () => {
    arrangeTest()

    expect(screen.queryByTestId('just-an-element')).toBeInTheDocument()
    expect(screen.queryByTestId('button-enabled')).toBeInTheDocument()
    expect(screen.queryByTestId('button-disabled')).toBeInTheDocument()
    expect(screen.queryByTestId('button-hidden')).toBeNull()

    const items = screen.queryAllByTestId('InlineActionsWrapper-item')

    expect(items[0]).not.toHaveClass('Container-leftsmallMargin')
    expect(items[1]).toHaveClass('PicassoContainer-leftsmallMargin-26')
    expect(items[2]).toHaveClass('PicassoContainer-leftsmallMargin-26')
    expect(items).toHaveLength(3)
  })
})
