import React from 'react'
import { downloadByUrl } from '@staff-portal/utils'
import { waitFor, fireEvent } from '@testing-library/react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import {
  useGetDownloadExpectedCommissionsOperationQuery,
  useDownloadExpectedCommissionsMutation
} from '../../data'
import ExpectedCommissionsPageActions from '.'

const mockNotificationError = jest.fn()

jest.mock('@staff-portal/utils', () => ({
  ...jest.requireActual('@staff-portal/utils'),
  downloadByUrl: jest.fn()
}))

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({
    showError: mockNotificationError
  })
}))

jest.mock('../../data', () => ({
  useGetDownloadExpectedCommissionsOperationQuery: jest.fn().mockReturnValue({
    data: {
      viewer: {
        operations: {
          downloadExpectedCommissions: { callable: 'ENABLED', messages: [] }
        }
      }
    },
    loading: false,
    initialLoading: false
  }),
  useDownloadExpectedCommissionsMutation: jest.fn().mockReturnValue([])
}))

const render = () => renderComponent(<ExpectedCommissionsPageActions />)

const mockedUseDownloadExpectedCommissionsMutation =
  useDownloadExpectedCommissionsMutation as jest.Mock

describe('ExpectedCommissionsPageActions - DownloadExpectedCommissions', () => {
  afterEach(jest.clearAllMocks)
  describe('Download expected commissions button is clicked', () => {
    it('download function is called', async () => {
      mockedUseDownloadExpectedCommissionsMutation.mockReturnValueOnce([
        jest.fn().mockResolvedValueOnce({
          data: {
            downloadExpectedCommissions: { success: true, downloadUrl: 'url' }
          },
          loading: false,
          initialLoading: false
        })
      ])
      const { getByTestId } = render()
      const button = getByTestId('download-expected-commissions')

      fireEvent.click(button)
      await waitFor(() =>
        expect(
          useGetDownloadExpectedCommissionsOperationQuery
        ).toHaveBeenCalled()
      )

      expect(downloadByUrl).toHaveBeenNthCalledWith(1, 'url')
      expect(mockNotificationError).not.toHaveBeenCalled()
    })
  })

  describe('Download expected commissions button is clicked with error', () => {
    it('error is displayed', async () => {
      mockedUseDownloadExpectedCommissionsMutation.mockReturnValueOnce([
        jest.fn().mockResolvedValueOnce({
          data: {
            success: false,
            downloadExpectedCommissions: {
              errors: ['Something went wrong']
            }
          },
          loading: false,
          initialLoading: false
        })
      ])
      const { getByTestId } = render()
      const button = getByTestId('download-expected-commissions')

      fireEvent.click(button)

      await waitFor(() =>
        expect(
          useGetDownloadExpectedCommissionsOperationQuery
        ).toHaveBeenCalled()
      )

      expect(mockNotificationError).toHaveBeenCalled()
      expect(downloadByUrl).not.toHaveBeenCalled()
    })
  })
})
