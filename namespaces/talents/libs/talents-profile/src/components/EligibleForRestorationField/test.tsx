import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { waitForElementToBeRemoved } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import EligibleForRestorationField, {
  Props
} from './EligibleForRestorationField'
import {
  createUpdateEligibleForRestorationFailedMock,
  createUpdateEligibleForRestorationMock
} from './data/update-eligible-for-restoration/mocks'

jest.unmock('@staff-portal/editable')

const arrangeTest = (
  { talentId, value, operation }: Props,
  mocks: MockedResponse[] = []
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <EligibleForRestorationField
        talentId={talentId}
        value={value}
        operation={operation}
      />
    </TestWrapperWithMocks>
  )

describe('EligibleForRestorationField', () => {
  it('updates field value', async () => {
    const TALENT_ID = 'asjd72'

    arrangeTest(
      {
        talentId: TALENT_ID,
        value: false,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      [
        createUpdateEligibleForRestorationMock({
          eligibleForRestoration: true,
          talentId: TALENT_ID
        })
      ]
    )

    const checkbox = screen
      .getByTestId('inline-switch-editor-checkbox')
      .querySelector('input') as Element

    fireEvent.click(checkbox)
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('inline-switch-editor-loader')
    )
    waitFor(() => expect(checkbox).toBeChecked())
  })

  describe('when field update request fails', () => {
    it('shows error', async () => {
      const TALENT_ID = 'aoc820'

      arrangeTest(
        {
          talentId: TALENT_ID,
          value: false,
          operation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        },
        [
          createUpdateEligibleForRestorationFailedMock({
            eligibleForRestoration: true,
            talentId: TALENT_ID
          })
        ]
      )

      const checkbox = screen
        .getByTestId('inline-switch-editor-checkbox')
        .querySelector('input') as Element

      fireEvent.click(checkbox)
      expect(
        await screen.findByText(
          'Unable to update Eligible for Restoration field.'
        )
      ).toBeInTheDocument()
    })
  })
})
