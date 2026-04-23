import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { act, fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import MockDate from 'mockdate'
import { parseISO } from '@staff-portal/date-time-utils'

import { CLIENT_UPDATED } from '../../messages'
import { useRepauseClient } from './data'
import RepauseCompanyModal from './RepauseCompanyModal'

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

jest.mock('@toptal/staff-portal-message-bus')
jest.mock('@staff-portal/data-layer-service')
jest.mock('./data', () => ({
  useRepauseClient: jest.fn()
}))
jest.mock('@staff-portal/tasks', () => ({
  ...jest.requireActual('@staff-portal/tasks'),
  FormTaskTagSelector: () => <div />
}))

const useQueryMock = useQuery as jest.Mock
const useMessageEmitterMock = useMessageEmitter as jest.Mock
const useRepauseClientMock = useRepauseClient as jest.Mock

const mockSuccessImplementation = (mutationFunction?: () => void) => {
  useRepauseClientMock.mockImplementation(() => [
    mutationFunction ??
      (() => ({
        data: {
          repauseClient: {
            success: true,
            errors: []
          }
        }
      })),
    { loading: false }
  ])
}

const mockErrorImplementation = () => {
  useRepauseClientMock.mockImplementation(
    ({ onError }: { onError: () => void }) => [onError, { loading: false }]
  )
}

const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) => {
  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          repauseClient: {
            callable: 'ENABLED'
          }
        }
      }
    },
    loading: false
  }))

  return render(
    <TestWrapper>
      <RepauseCompanyModal companyId='123' hideModal={hideModal} />
    </TestWrapper>
  )
}

describe('RepauseCompanyModal', () => {
  beforeAll(() => {
    MockDate.set('2021-12-01')
  })

  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      arrangeTest({ hideModal })

      fireEvent.click(screen.getByTestId('RepauseCompanyModal-cancel-button'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when pressing submit button', () => {
    const DUE_DATE = parseISO('2021-12-31')
    const DETAILS = 'Some details'

    describe('when repause company was successfully', () => {
      it('shows success notification message', async () => {
        const emitMessage = jest.fn()

        useMessageEmitterMock.mockReturnValue(emitMessage)

        mockSuccessImplementation()
        arrangeTest()

        fireEvent.change(screen.getByLabelText(/Due Date/), {
          target: { value: DUE_DATE }
        })
        fireEvent.change(screen.getByLabelText(/Details/), {
          target: { value: DETAILS }
        })

        fireEvent.click(screen.getByTestId('RepauseCompanyModal-submit-button'))

        expect(
          await screen.findByText('Company has been repaused.')
        ).toBeInTheDocument()

        expect(emitMessage).toHaveBeenCalledWith(CLIENT_UPDATED, {
          companyId: '123'
        })
      })

      it('calls `repauseClient` mutation function with valid variables', async () => {
        const emitMessage = jest.fn()
        const repauseClientMutationFunction = jest.fn()

        useMessageEmitterMock.mockReturnValue(emitMessage)

        mockSuccessImplementation(repauseClientMutationFunction)
        arrangeTest()

        fireEvent.change(screen.getByLabelText(/Due Date/), {
          target: { value: DUE_DATE }
        })
        fireEvent.change(screen.getByLabelText(/Details/), {
          target: { value: DETAILS }
        })

        await act(async () => {
          await fireEvent.click(
            screen.getByTestId('RepauseCompanyModal-submit-button')
          )
        })

        expect(repauseClientMutationFunction).toHaveBeenCalledWith({
          variables: {
            input: expect.objectContaining({
              clientId: '123',
              comment: 'Some details',
              dueDate: '2021-12-31'
            })
          }
        })
      })
    })

    describe('when repause company failed', () => {
      it('shows error notification message', async () => {
        const emitMessage = jest.fn()

        useMessageEmitterMock.mockReturnValue(emitMessage)

        mockErrorImplementation()
        arrangeTest()

        fireEvent.change(screen.getByLabelText(/Due Date/), {
          target: { value: DUE_DATE }
        })
        fireEvent.change(screen.getByLabelText(/Details/), {
          target: { value: DETAILS }
        })

        fireEvent.click(screen.getByTestId('RepauseCompanyModal-submit-button'))

        expect(
          await screen.findByText(
            'An error occurred, the company has not been repaused.'
          )
        ).toBeInTheDocument()

        expect(emitMessage).not.toHaveBeenCalled()
      })
    })
  })
})
