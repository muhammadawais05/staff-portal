import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { useQuery } from '@staff-portal/data-layer-service'

import { useCandidateSendingContext } from '../../hooks'
import { getDisplayStatusMessage } from '../../utils'
import ContentStatusMessage from './ContentStatusMessage'
import { CandidateSendingContextType } from '../../containers/CandidateSendingProvider/types'
import { GetContentStatusMessageDataQuery } from '../../data/get-content-status-message-data'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))
jest.mock('../../utils', () => ({
  getDisplayStatusMessage: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')

const useQueryMock = useQuery as jest.Mock
const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const getDisplayStatusMessageMock = getDisplayStatusMessage as jest.Mock

const renderComponent = ({
  data,
  loading,
  displayStatusMessage,
  contextProps
}: {
  data?: GetContentStatusMessageDataQuery
  loading?: boolean
  displayStatusMessage?: boolean
  contextProps?: Pick<CandidateSendingContextType, 'clientId'>
} = {}) => {
  useQueryMock.mockImplementation(() => ({ data, loading }))
  useCandidateSendingContextMock.mockImplementation(() => ({
    clientId: contextProps?.clientId ?? null
  }))
  getDisplayStatusMessageMock.mockImplementation(() => displayStatusMessage)

  return render(
    <TestWrapper>
      <ContentStatusMessage />
    </TestWrapper>
  )
}

describe('ContentStatusMessage', () => {
  describe('when `loading` equals `true`', () => {
    it('does not render message', () => {
      renderComponent({ loading: true })

      expect(
        screen.queryByText('Company has an unpaid deposit.')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `displayStatusMessage` equals `false`', () => {
    it('does not render message', () => {
      renderComponent({ displayStatusMessage: false })

      expect(
        screen.queryByText('Company has an unpaid deposit.')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `displayStatusMessage` is `true` & `loading` equals `false`', () => {
    it('renders message', () => {
      renderComponent({ displayStatusMessage: true, loading: false })

      expect(
        screen.getByText('Company has an unpaid deposit.')
      ).toBeInTheDocument()
    })
  })
})
