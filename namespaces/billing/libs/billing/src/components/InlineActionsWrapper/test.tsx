import React, { ComponentProps } from 'react'
import { Button } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import OperationWrapper from '../OperationWrapper'
import InlineActionsWrapper from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof InlineActionsWrapper>) =>
  renderComponent(
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
      <div data-testid='just-an-element'>Test</div>
    </InlineActionsWrapper>
  )

describe('InlineActionsWrapper', () => {
  it('renders InlineActionsWrapper properly', () => {
    const { getAllByTestId } = render()

    expect(getAllByTestId('InlineActionsWrapper-item')[0]).not.toHaveClass(
      'Container-leftsmallMargin'
    )
    expect(getAllByTestId('InlineActionsWrapper-item')[1]).toHaveClass(
      'PicassoContainer-leftsmallMargin-26'
    )
    expect(getAllByTestId('InlineActionsWrapper-item')?.length).toBe(2)
  })
})
