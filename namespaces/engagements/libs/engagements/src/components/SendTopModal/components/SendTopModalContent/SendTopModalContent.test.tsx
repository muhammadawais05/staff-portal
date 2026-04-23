import { render, screen, waitFor } from '@toptal/picasso/test-utils'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { when } from 'jest-when'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import SendTopModalContent from './SendTopModalContent'
import { SendTopDocument } from '../../data/send-top/send-top.staff.gql.types'
import {
  GetSendTopModalDataDocument,
  GetSendTopModalDataQuery
} from '../../data/get-send-top-modal-data/get-send-top-modal-data.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../../../messages'

jest.mock('@staff-portal/data-layer-service')

jest.mock('../../../../services', () => ({
  ...jest.requireActual('../../../../services'),
  useNavigateToJobPage: () => ({ navigateToJobPage: () => null })
}))

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

const ENGAGEMENT: GetSendTopModalDataQuery['node'] = {
  id: 'VjEtRW5nYWdlbWVudC0yNjk2NjY',
  operations: {
    importContractAsTop: {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
  },
  job: {
    id: 'VjEtSm9iLTI1NTEwMQ',
    descriptionOfService: 'Software Development'
  },
  client: {
    id: 'VjEtQ2xpZW50LTI2MzE4OA',
    legalName: 'Promotion Activators Management, LLC',
    fullName: 'Kihn-Hand SR'
  },
  talent: {
    id: 'VjEtVGFsZW50LTUxOTkwMw',
    fullName: 'Arlean Padberg'
  },
  nextTopNumber: 4,
  nextTopEffectiveDate: '2021-07-30',
  trialLength: 6,
  trialEndDate: '2021-08-06',
  companyHourlyRate: '136',
  companyPartTimeRate: '2584',
  companyFullTimeRate: '4896'
}

const mockUseQuery = useQuery as jest.Mock
const mockGetData = () => {
  when(mockUseQuery)
    .calledWith(GetSendTopModalDataDocument, expect.anything())
    .mockImplementation(() => ({
      data: {
        node: ENGAGEMENT
      },
      loading: false
    }))
}

const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(SendTopDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          sendTop: {
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
    .calledWith(SendTopDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <SendTopModalContent engagementId={ENGAGEMENT.id} hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('SendTopModalContent', () => {
  describe('When form was successfully submitted', () => {
    beforeEach(() => {
      mockGetData()
      mockSuccessImplementation()
    })

    it('shows the modal with all fields correctly', () => {
      arrangeTest()

      expect(screen.getAllByText('Send TOP')).toHaveLength(2)

      expect(screen.getByLabelText(/Number/)).toHaveValue(
        ENGAGEMENT.nextTopNumber
      )

      expect(screen.getByLabelText(/Description of Service/)).toHaveValue(
        ENGAGEMENT.job!.descriptionOfService
      )

      expect(screen.getByLabelText(/Talent Name/)).toHaveValue(
        ENGAGEMENT.talent!.fullName
      )

      expect(screen.getByLabelText(/Effective Date/)).toBeDisabled()
      expect(screen.getByLabelText(/Effective Date/)).toHaveValue(
        'July 30, 2021'
      )

      expect(screen.getByLabelText(/Talent Start Date/)).toBeDisabled()
      expect(screen.getByLabelText(/Talent Start Date/)).toHaveValue(
        'July 30, 2021'
      )

      expect(screen.getByLabelText(/Trial Period Length/)).toBeDisabled()
      expect(screen.getByLabelText(/Trial Period Length/)).toHaveValue(
        '6 business days'
      )

      expect(screen.getByLabelText(/Trial End Date/)).toBeDisabled()
      expect(screen.getByLabelText(/Trial End Date/)).toHaveValue(
        'August 6, 2021'
      )

      expect(screen.getByLabelText(/Hourly Fee/)).toBeDisabled()
      expect(screen.getByLabelText(/Hourly Fee/)).toHaveValue(
        Number(ENGAGEMENT.companyHourlyRate).toFixed(2)
      )

      expect(screen.getByLabelText(/Weekly Part Time Fee/)).toBeDisabled()
      expect(screen.getByLabelText(/Weekly Part Time Fee/)).toHaveValue(
        Number(ENGAGEMENT.companyPartTimeRate).toFixed(2)
      )

      expect(screen.getByLabelText(/Weekly Full Time Fee/)).toBeDisabled()
      expect(screen.getByLabelText(/Weekly Full Time Fee/)).toHaveValue(
        Number(ENGAGEMENT.companyFullTimeRate).toFixed(2)
      )

      expect(screen.getByLabelText(/Company Legal Name/)).toBeDisabled()
      expect(screen.getByLabelText(/Company Legal Name/)).toHaveValue(
        ENGAGEMENT.client!.legalName
      )
    })

    it('calls the event emitter', async () => {
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      arrangeTest()

      await waitFor(() => {
        userEvent.click(screen.getByTestId('SendTopModal-submit-button'))
      })

      expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
        engagementId: 'VjEtRW5nYWdlbWVudC0yNjk2NjY'
      })
    })
  })

  describe('When form was submitted with errors', () => {
    beforeEach(() => {
      mockGetData()
      mockErrorImplementation()
    })

    it("doesn't call the event emitter", async () => {
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      arrangeTest()

      await waitFor(() => {
        userEvent.click(screen.getByTestId('SendTopModal-submit-button'))
      })

      expect(emitMessage).not.toHaveBeenCalled()
    })
  })
})
