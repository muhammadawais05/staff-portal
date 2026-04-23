import { render } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'
import { NodeType } from '@staff-portal/graphql'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'

import SendEngagementTalentEmailItem from './SendEngagementTalentEmailItem'

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  SendEmailActionItem: jest.fn()
}))

const MockSendEmailActionItem = SendEmailActionItem as jest.Mock

const OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: ['Some mock message']
}

const arrangeTest = (
  props: ComponentProps<typeof SendEngagementTalentEmailItem>
) =>
  render(
    <TestWrapper>
      <SendEngagementTalentEmailItem {...props} />
    </TestWrapper>
  )

describe('SendEngagementTalentEmailItem', () => {
  beforeEach(() => {
    MockSendEmailActionItem.mockReturnValue(null)
  })

  describe('pass correct props to the `SendEmailActionItem`', () => {
    it('shows the tooltip', async () => {
      const ID = 'some_id'

      arrangeTest({
        componentType: 'button',
        size: 'medium',
        emailMessagingEngagementTalentId: ID,
        operation: OPERATION
      })

      expect(MockSendEmailActionItem).toHaveBeenCalledWith(
        expect.objectContaining({
          nodeId: ID,
          operationVariables: {
            nodeId: ID,
            nodeType: NodeType.EMAIL_MESSAGING_ENGAGEMENT_TALENT,
            operationName: 'sendEmailTo'
          },
          'data-testid': 'send-engagement-talent-email-item',
          operation: OPERATION
        }),
        {}
      )
    })
  })
})
