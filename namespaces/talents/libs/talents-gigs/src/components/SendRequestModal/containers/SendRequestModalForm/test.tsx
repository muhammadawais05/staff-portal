import React from 'react'
import { waitFor, fireEvent, render, screen } from '@testing-library/react'
import { GigReachOutStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMutation } from '@staff-portal/data-layer-service'

import { GigReachOutMessageMetaFragment } from '../../../../data/get-gig-reach-out-message-meta'
import { mockedTalent, mockedMessageMeta } from '../../../../data/mocks'
import SendRequestModalForm from './SendRequestModalForm'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useMutation: jest.fn()
}))
const mockUseMutation = useMutation as jest.Mock

const MOCK_GIG_ID = 'VjEtUDJQUmVxdWVzdC0zMA'
const EXPECTED_STATUS = GigReachOutStatus.INTRODUCED
const createReachoutMutation = jest.fn()
const onSuccessCallback = jest.fn()

const noop = () => {}

const arrangeTest = ({
  gigReachOutMessageMeta = mockedMessageMeta,
  talentName = mockedTalent.fullName,
  candidateId = mockedTalent.id,
  gigId = MOCK_GIG_ID,
  hideModal = noop,
  onSuccessAction = noop
}: {
  gigReachOutMessageMeta?: GigReachOutMessageMetaFragment
  talentName?: string
  candidateId?: string
  gigId?: string
  hideModal?: () => void
  onSuccessAction?: () => void
}) => {
  return render(
    <TestWrapper>
      <SendRequestModalForm
        gigReachOutMessageMeta={gigReachOutMessageMeta}
        hideModal={hideModal}
        talentName={talentName}
        candidateId={candidateId}
        gigId={gigId}
        onSuccessAction={onSuccessAction}
      />
    </TestWrapper>
  )
}

const generateGigReachOutMockResponse = (error?: boolean) => ({
  data: {
    createGigReachOut: {
      success: !error,
      errors: error
        ? [{ code: '500', key: '1', message: 'internal error' }]
        : undefined,
      reachOut: {
        status: EXPECTED_STATUS
      }
    }
  }
})

describe('SendRequestModalForm', () => {
  beforeEach(() => {
    onSuccessCallback.mockClear()
    mockUseMutation.mockReturnValue([
      createReachoutMutation,
      { loading: false }
    ])
  })

  describe('form validation', () => {
    it('displays minimum length errors', async () => {
      arrangeTest({
        onSuccessAction: onSuccessCallback,
        gigReachOutMessageMeta: {
          ...mockedMessageMeta,
          messageBody: 'I need someone for C++!'
        }
      })

      fireEvent.click(screen.getByTestId('send-request-modal-confirm'))

      await waitFor(() => {
        expect(
          screen.getByText(
            'Message body needs to be at least 50 characters long.'
          )
        ).toBeInTheDocument()
      })
    })
  })

  describe('form submittion', () => {
    it('sends reach out correctly upon button click', async () => {
      createReachoutMutation.mockResolvedValue(
        generateGigReachOutMockResponse()
      )

      arrangeTest({ onSuccessAction: onSuccessCallback })

      fireEvent.click(screen.getByTestId('send-request-modal-confirm'))

      expect(createReachoutMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            candidateId: mockedTalent.id,
            gigId: MOCK_GIG_ID,
            messageBody: mockedMessageMeta.messageBody
          }
        }
      })

      await waitFor(() => {
        expect(onSuccessCallback).toHaveBeenCalledTimes(1)
        expect(onSuccessCallback).toHaveBeenCalledWith(EXPECTED_STATUS)
      })
    })
  })
})
