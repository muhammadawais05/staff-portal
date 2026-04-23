import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { waitForElementToBeRemoved } from '@toptal/picasso/test-utils'
import { NO_VALUE } from '@staff-portal/config'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import SpecialHandlingField, { Props } from './SpecialHandlingField'
import {
  createUpdateTalentSpecialHandlingMock,
  createUpdateTalentSpecialHandlingFailedMock
} from './data/update-talent-special-handling/mocks'

jest.unmock('@staff-portal/editable')

const arrangeTest = (props: Props, mocks?: MockedResponse[]) => {
  const { talentId, specialHandling, operation } = props

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SpecialHandlingField
        talentId={talentId}
        specialHandling={specialHandling}
        operation={operation}
      />
    </TestWrapperWithMocks>
  )
}

describe('SpecialHandlingField', () => {
  const talentId = 'some-id'

  it('enables special handling', async () => {
    arrangeTest(
      {
        talentId,
        specialHandling: false,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      [
        createUpdateTalentSpecialHandlingMock({
          specialHandling: true,
          talentId
        })
      ]
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

    waitFor(() => expect(checkbox).toBeChecked())
  })

  it('disables special handling', async () => {
    arrangeTest(
      {
        talentId,
        specialHandling: true,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      [
        createUpdateTalentSpecialHandlingMock({
          specialHandling: false,
          talentId
        })
      ]
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

    waitFor(() => expect(checkbox).not.toBeChecked())
  })

  it('disables special handling field when the operation is disabled', async () => {
    arrangeTest(
      {
        talentId,
        specialHandling: true,
        operation: {
          callable: OperationCallableTypes.DISABLED,
          messages: []
        }
      },
      [
        createUpdateTalentSpecialHandlingMock({
          specialHandling: false,
          talentId
        })
      ]
    )

    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('shows no value when the operation is hidden', async () => {
    arrangeTest(
      {
        talentId,
        specialHandling: true,
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      },
      [
        createUpdateTalentSpecialHandlingMock({
          specialHandling: false,
          talentId
        })
      ]
    )

    expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
  })

  it('shows error message when unable to update special handling', async () => {
    const ERROR_MESSAGE = 'Failed updating special handling.'

    arrangeTest(
      {
        talentId,
        specialHandling: true,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      },
      [
        createUpdateTalentSpecialHandlingFailedMock(
          {
            specialHandling: false,
            talentId
          },
          ERROR_MESSAGE
        )
      ]
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
