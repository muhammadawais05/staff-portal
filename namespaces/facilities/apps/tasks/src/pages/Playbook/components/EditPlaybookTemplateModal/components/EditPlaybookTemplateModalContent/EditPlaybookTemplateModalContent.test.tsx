import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  PlaybookTemplatePriority,
  PlaybookTemplateDateRuleUnit
} from '@staff-portal/graphql/staff'

import { PLAYBOOK_TEMPLATE_UPDATED } from '../../../../messages'
import { UpdatePlaybookTemplateDocument } from '../../data/update-playbook-template/update-playbook-template.staff.gql.types'
import EditPlaybookTemplateModalContent, {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
} from './EditPlaybookTemplateModalContent'

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageEmitter: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const PLAYBOOK_TEMPLATE = {
  communication: true,
  description: 'Follow up with an OFAC investigation',
  details:
    'Created when an OFAC investigation is initiated - by the system or manually.\nFinished when the OFAC investigation is over.\n',
  dueDateRuleAmount: 0,
  dueDateRuleUnit: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS,
  finishDisabled: false,
  id: 'test-template-id',
  important: true,
  priority: PlaybookTemplatePriority.LOW,
  recurring: 10,
  rescheduleDisabled: true,
  slackNotificationsEnabled: false,
  stopRecurringAfterDispute: false
}

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(UpdatePlaybookTemplateDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          terminateEngagement: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(UpdatePlaybookTemplateDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EditPlaybookTemplateModalContent
        playbookTemplate={PLAYBOOK_TEMPLATE}
        hideModal={() => {}}
      />
    </TestWrapper>
  )

describe('EditPlaybookTemplateModalContent', () => {
  it('shows the success message', async () => {
    const emitMessage = jest.fn()
    const mockUseMessageEmitter = useMessageEmitter as jest.Mock

    mockUseMessageEmitter.mockReturnValue(emitMessage)

    mockSuccessImplementation()
    arrangeTest()

    fireEvent.click(screen.getByLabelText(/Priority/))

    fireEvent.click(await screen.findByText('High'))

    fireEvent.change(screen.getByLabelText(/Details/i), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(
      screen.getByTestId('update-playbook-template-form-submit-button')
    )

    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument()

    expect(emitMessage).toHaveBeenCalledWith(PLAYBOOK_TEMPLATE_UPDATED, {
      playbookTemplateId: 'test-template-id'
    })
  })

  it('shows error message', async () => {
    mockErrorImplementation()
    arrangeTest()

    fireEvent.click(screen.getByLabelText(/Priority/))

    fireEvent.click(await screen.findByText('High'))

    fireEvent.change(screen.getByLabelText(/Details/i), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(
      screen.getByTestId('update-playbook-template-form-submit-button')
    )

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
