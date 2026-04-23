import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createSourcingRequestTalentFragmentMock } from '@staff-portal/jobs/src/mocks'

import SourcedTalentsTableItem from '.'

jest.mock('./components/UnlinkSourcingRequestButton', () => ({
  __esModule: true,
  default: () => <div data-testid='unlink-sourcing-request-button'>Unlink</div>
}))
jest.mock('./components/LinkSourcingRequestButton', () => ({
  __esModule: true,
  default: () => <div data-testid='link-sourcing-request-button'>Link</div>
}))
const JOB_ID = 'JOB_ID'

jest.mock('@staff-portal/data-layer-service')

const arrangeTest = (props: ComponentProps<typeof SourcedTalentsTableItem>) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <SourcedTalentsTableItem {...props} />
        </tbody>
      </table>
    </TestWrapper>
  )

describe('SourcedTalentsTableItem', () => {
  it('shows an unlinked sourced talent table item with actions column', () => {
    const { getByText, getByTestId } = arrangeTest({
      jobId: JOB_ID,
      sourcingTalentRequest: createSourcingRequestTalentFragmentMock({}),
      showActionsColumn: true,
      index: 0
    })

    expect(getByTestId('actions-column')).toBeInTheDocument()
    expect(getByTestId('link-sourcing-request-button')).toBeInTheDocument()

    expect(getByText('Link')).toBeInTheDocument()
  })

  it('shows a linked sourced talent table item with actions column', () => {
    const { getByText, getByTestId } = arrangeTest({
      jobId: JOB_ID,
      sourcingTalentRequest: createSourcingRequestTalentFragmentMock({
        deletedAt: null
      }),
      showActionsColumn: true,
      index: 0
    })

    expect(getByTestId('actions-column')).toBeInTheDocument()
    expect(getByTestId('unlink-sourcing-request-button')).toBeInTheDocument()

    expect(getByText('Unlink')).toBeInTheDocument()
  })

  it('shows a sourced talent table item without actions column', () => {
    const { queryByTestId } = arrangeTest({
      jobId: JOB_ID,
      sourcingTalentRequest: createSourcingRequestTalentFragmentMock({}),
      showActionsColumn: false,
      index: 0
    })

    expect(queryByTestId('actions-column')).toBeNull()
  })
})
