import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { GetEmailPreviewQueryVariables } from './data/get-email-preview'
import { useGetEmailPreview } from './data'
import EmailPreview from './EmailPreview'

jest.mock('../EmailPreviewContent', () => ({
  __esModule: true,
  default: () => <div data-testid='email-preview-content' />
}))

jest.mock('./data', () => ({
  __esModule: true,
  useGetEmailPreview: jest.fn()
}))

const mockReturnValues = (withError = false) => {
  const mockedUseGetEmailPreview = useGetEmailPreview as jest.Mock

  mockedUseGetEmailPreview.mockImplementation(
    ({
      onError
    }: {
      variables: GetEmailPreviewQueryVariables
      onError: (error: Error) => void
    }) => {
      if (withError) {
        onError(new Error())
      }

      return {}
    }
  )
}

const arrangeTest = (withError = false) => {
  mockReturnValues(withError)

  return render(
    <TestWrapper>
      <EmailPreview roleId='' body='' />
    </TestWrapper>
  )
}

describe('EmailPreview', () => {
  it('fetch the email preview', async () => {
    arrangeTest()

    expect(
      await screen.findByTestId('email-preview-content')
    ).toBeInTheDocument()
  })
})
