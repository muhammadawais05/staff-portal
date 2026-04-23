import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import { useResumeTalent } from './data'
import ResumeTalentModal from './ResumeTalentModal'

jest.mock('./data', () => ({
  useResumeTalent: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ConfirmationModal: jest.fn()
}))
const ConfirmationModalMock = ConfirmationModal as jest.Mock

const mockReturnValues = () => {
  const mockUseResumeTalent = useResumeTalent as jest.Mock

  ConfirmationModalMock.mockImplementation(() => (
    <div data-testid='confirmation-modal' />
  ))

  mockUseResumeTalent.mockReturnValue([
    () => ({
      data: {
        resumeTalent: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ResumeTalentModal talentId='1' hideModal={() => {}} isTopModal={true} />
    </TestWrapper>
  )

describe('ResumeTalentModal', () => {
  it('shows the resume talent modal', async () => {
    mockReturnValues()
    arrangeTest()

    expect(ConfirmationModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'negative',
        label: 'Comment',
        textFieldName: 'comment',
        title: 'Resume Application',
        submitText: 'Resume Application',
        message: 'Do you really want to resume this application?',
        placeholder: 'Please specify a reason.',
        operationVariables: {
          nodeId: '1',
          nodeType: NodeType.TALENT,
          operationName: 'resumeTalent'
        }
      }),
      expect.anything()
    )
  })
})
