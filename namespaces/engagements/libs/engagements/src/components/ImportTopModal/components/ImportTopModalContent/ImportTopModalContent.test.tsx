import { when } from 'jest-when'
import React, { ComponentProps } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@toptal/picasso/test-utils'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { noop, TestWrapper } from '@staff-portal/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import ImportTopModalContent from './ImportTopModalContent'
import { ImportTopDocument } from '../../data/import-top/import-top.staff.gql.types'
import {
  GetImportTopDataDocument,
  GetImportTopDataQuery
} from '../../data/get-import-top-data/get-import-top-data.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../../../messages'

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

jest.mock('@staff-portal/data-layer-service')
jest.mock('../../../../services', () => ({
  useNavigateToJobPage: () => ({ navigateToJobPage: () => null })
}))
const mockUseQuery = useQuery as jest.Mock
const mockGetData = ({ nextTopNumber = 10 } = {}) => {
  const data: GetImportTopDataQuery = {
    node: {
      id: '123',
      nextTopNumber
    }
  }

  when(mockUseQuery)
    .calledWith(GetImportTopDataDocument, expect.anything())
    .mockImplementation(() => ({ data, loading: false }))
}

const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(ImportTopDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          importTop: {
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
    .calledWith(ImportTopDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const fillInDefaultFields = async () => {
  userEvent.type(await screen.findByLabelText(/Contract GUID/), '122a5b2d')

  userEvent.type(screen.getByLabelText(/Contract Number/), '10')

  userEvent.click(screen.getByTestId(`${component}-submit-button`))
}

const arrangeTest = () => {
  const defaultProps: ComponentProps<typeof ImportTopModalContent> = {
    engagementId: '123',
    hideModal: noop
  }

  return render(
    <TestWrapper>
      <ImportTopModalContent {...defaultProps} />
    </TestWrapper>
  )
}

const component = 'ImportTopModal'

describe('ImportTopModal', () => {
  describe('When TOP was successfully imported', () => {
    it('imports TOP with required fields', async () => {
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockGetData()
      mockSuccessImplementation()
      arrangeTest()

      await fillInDefaultFields()

      expect(screen.queryByLabelText(/Provider/)).not.toBeInTheDocument()

      expect(
        await screen.findByText('The TOP was successfully imported.')
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
        engagementId: '123'
      })
    })
  })

  describe('When TOP was imported with error', () => {
    it('handles errors', async () => {
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockGetData()
      mockErrorImplementation()
      arrangeTest()

      await fillInDefaultFields()

      expect(screen.queryByLabelText(/Provider/)).not.toBeInTheDocument()

      expect(
        await screen.findByText('An error occured, the TOP was not imported.')
      ).toBeInTheDocument()

      expect(emitMessage).not.toHaveBeenCalled()
    })
  })
})
