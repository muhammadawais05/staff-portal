import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { useMutation } from '@staff-portal/data-layer-service'

import EmailComposerEmailPreview from './EmailComposerEmailPreview'
import { useCandidateSendingContext } from '../../hooks'
import { GenerateEmailPreviewMutation } from '../../data/generate-email-preview/generate-email-preview.staff.gql.types'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useFormState: () => ({ submitting: false })
}))

const mockUseMutation = useMutation as jest.Mock
const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  data,
  loading
}: {
  data?: GenerateEmailPreviewMutation
  loading: boolean
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    stepsAttributes: {}
  }))
  mockUseMutation.mockImplementation(() => [
    jest.fn(),
    {
      data,
      loading
    }
  ])

  return render(
    <TestWrapper>
      <EmailComposerEmailPreview />
    </TestWrapper>
  )
}

describe('EmailComposerEmailPreview', () => {
  describe('when data is loading', () => {
    it('renders loader', () => {
      renderComponent({ loading: true })

      expect(screen.getByTestId('email-preview-loader')).toBeInTheDocument()
      expect(
        screen.queryByTestId('email-composer-email-preview')
      ).not.toBeInTheDocument()
    })
  })

  describe('when data is missing', () => {
    it('does not render anything', () => {
      renderComponent({ loading: false })

      expect(
        screen.queryByTestId('email-preview-loader')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('email-composer-email-preview')
      ).not.toBeInTheDocument()
    })
  })

  describe('when data is loaded', () => {
    it('does not render anything', () => {
      renderComponent({
        data: {
          generateEmailPreview: { emailPreviewHtml: 'email-preview' }
        } as GenerateEmailPreviewMutation,
        loading: false
      })

      expect(
        screen.queryByTestId('email-preview-loader')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('email-composer-email-preview')
      ).toBeInTheDocument()
    })
  })
})
