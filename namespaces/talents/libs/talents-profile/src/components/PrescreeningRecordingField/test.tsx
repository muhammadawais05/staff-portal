import React from 'react'
import { render, screen } from '@testing-library/react'
import { waitFor } from '@toptal/picasso/test-utils'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import PrescreeningRecordingField, { Props } from './PrescreeningRecordingField'

jest.mock('./components/DiscardRecordingButton', () => ({
  __esModule: true,
  default: () => <button>Discard Recording</button>
}))

const FIELD_TEST_ID = /prescreening-recording-field/i

const generateOperation = (
  callable: OperationCallableTypes,
  messages: string[] = []
): Operation => ({ callable, messages })

const defaultProps: Props = {
  talentId: '123',
  prescreeningRecordingUrl: 'https://example.com',
  operation: generateOperation(OperationCallableTypes.ENABLED),
  isBeingProcessed: false
}

const arrangeTest = (props = defaultProps, mocks?: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <PrescreeningRecordingField {...props} />
    </TestWrapperWithMocks>
  )

describe('PrescreeningRecordingField', () => {
  it('shows the field with the link to the prescreening recording', async () => {
    const prescreeningRecordingUrl = 'TEST_LINK'

    arrangeTest({ ...defaultProps, prescreeningRecordingUrl })

    await waitFor(() =>
      expect(screen.getByTestId(FIELD_TEST_ID)).toBeInTheDocument()
    )

    expect(screen.getByText('Play recording in a new tab')).toHaveAttribute(
      'href',
      prescreeningRecordingUrl
    )
  })
})
