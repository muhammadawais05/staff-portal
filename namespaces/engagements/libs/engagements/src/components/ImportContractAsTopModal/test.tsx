import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import React from 'react'
import { when } from 'jest-when'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import ImportContractAsTopModal from './ImportContractAsTopModal'
import { ImportContractAsTopDocument } from './data/import-contract-as-top/import-contract-as-top.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../messages'

jest.mock('@staff-portal/data-layer-service')
jest.mock('../../services', () => ({
  useNavigateToJobPage: () => ({ navigateToJobPage: () => null })
}))
const mockUseMutation = useMutation as jest.Mock

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(ImportContractAsTopDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          importContractAsTop: {
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
    .calledWith(ImportContractAsTopDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ImportContractAsTopModal engagementId='test' hideModal={() => {}} />
    </TestWrapper>
  )

describe('ImportContractAsTopModal', () => {
  describe('When contract was successfully imported', () => {
    beforeEach(() => {
      mockSuccessImplementation()
    })

    it('renders and shows the success message after submit', async () => {
      arrangeTest()

      expect(screen.getByText('Import STA as TOP')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Import Contract'))

      expect(
        await screen.findByText('The STA was successfully imported as TOP.')
      ).toBeInTheDocument()
    })

    it('calls the event emitter', async () => {
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      arrangeTest()

      await waitFor(() => {
        fireEvent.click(screen.getByText('Import Contract'))
      })

      expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
        engagementId: 'test'
      })
    })
  })

  describe('When contract was imported with error', () => {
    it('shows the error message', async () => {
      mockErrorImplementation()
      arrangeTest()

      fireEvent.click(screen.getByText('Import Contract'))

      expect(
        await screen.findByText(
          'An error occurred, unable to import STA as TOP.'
        )
      ).toBeInTheDocument()
    })

    it('shows the error message received from the API', async () => {
      const ERROR_MESSAGE = 'Server error message'

      mockUseMutation.mockReturnValue([
        () => ({
          data: {
            importContractAsTop: {
              success: false,
              errors: [
                {
                  code: 'code',
                  key: 'base',
                  message: ERROR_MESSAGE
                }
              ]
            }
          }
        }),
        { loading: false }
      ])

      arrangeTest()

      fireEvent.click(screen.getByText('Import Contract'))

      expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
    })

    it("doesn't call the event emitter", async () => {
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockErrorImplementation()
      arrangeTest()

      await waitFor(() => {
        fireEvent.click(screen.getByText('Import Contract'))
      })

      expect(emitMessage).not.toHaveBeenCalled()
    })
  })
})
