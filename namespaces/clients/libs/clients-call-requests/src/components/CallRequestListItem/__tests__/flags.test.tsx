import React from 'react'
import { screen, render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  assertOnTooltipText,
  assertOnTooltip,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'

import CallRequestListItem from '../CallRequestListItem'
import { createCallRequestMock } from '../../../data/call-request-fragment/mocks'
import { CallRequestFragment } from '../../../data/call-request-fragment'

const arrangeTest = (data: CallRequestFragment) => {
  render(
    <TestWrapperWithMocks>
      <CallRequestListItem data={data} />
    </TestWrapperWithMocks>
  )
}

const assertFlag = async (flagText: string, flagTooltipText?: string) => {
  const flag = screen.getByText(flagText)

  expect(flag).toBeInTheDocument()

  if (flagTooltipText) {
    assertOnTooltipText(flag, flagTooltipText)
  }
}

describe('Call Request List Item', () => {
  // eslint-disable-next-line jest/expect-expect
  it('should show "Late" flag for late call requests', async () => {
    const callRequest = createCallRequestMock({ late: true })

    arrangeTest(callRequest)

    await assertFlag(
      'Late',
      `This company has a callback request that hasn't been claimed in a timely manner.`
    )
  })

  // eslint-disable-next-line jest/expect-expect
  it('should show "New" flag for new call requests', async () => {
    const callRequest = createCallRequestMock({ isNew: true })

    arrangeTest(callRequest)

    await assertFlag('New')
  })

  it('should show manually added flags', async () => {
    const CREATED_AT = {
      ISO_FORMAT: '2020-03-04T10:30:00+02:00',
      USER_FORMAT: 'Mar 4, 2020'
    } as const
    const UPDATED_AT = {
      ISO_FORMAT: '2020-03-06T10:30:00+02:00',
      USER_FORMAT: 'Mar 6, 2020'
    } as const
    const FLAG_AUTHOR = 'Flag author sp4'
    const FLAG_TITLE = 'Flag title ao4'
    const FLAG_COMMENT = 'Flag comment bj3'

    const defaultCallRequestMock = createCallRequestMock()
    const callRequestMock = createCallRequestMock({
      client: {
        ...(defaultCallRequestMock.client as NonNullable<
          CallRequestFragment['client']
        >),
        roleFlags: {
          nodes: [
            {
              id: 'flag-id',
              comment: FLAG_COMMENT,
              flaggedBy: {
                id: 'test_id',
                fullName: FLAG_AUTHOR
              },
              createdAt: CREATED_AT.ISO_FORMAT,
              updatedAt: UPDATED_AT.ISO_FORMAT,
              flag: {
                id: 'flag-id',
                title: FLAG_TITLE
              },
              operations: {
                updateRoleFlag: {
                  callable: OperationCallableTypes.ENABLED,
                  messages: []
                },
                removeRoleFlag: {
                  callable: OperationCallableTypes.ENABLED,
                  messages: []
                }
              }
            }
          ]
        }
      }
    })

    arrangeTest(callRequestMock)

    const flag = screen.getByText(FLAG_TITLE)

    expect(flag).toBeInTheDocument()

    assertOnTooltip(flag, tooltip => {
      expect(tooltip).toHaveTextContent(FLAG_TITLE)
      expect(tooltip).toHaveTextContent(FLAG_COMMENT)
      expect(tooltip).toHaveTextContent(
        `Updated by ${FLAG_AUTHOR} on ${UPDATED_AT.USER_FORMAT}`
      )
    })
  })
})
