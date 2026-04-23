import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'

import { PreviewExperiencePublicationType } from '../../types'
import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'
import PublicationPreview from './PublicationPreview'

jest.mock('../HighlightItemPreview/HighlightItemPreview')

const mockHighlightItemPreview = HighlightItemPreview as jest.Mock

const renderComponent = () => {
  mockHighlightItemPreview.mockImplementation(
    ({ children }: { children: ReactNode }) => <>{children}</>
  )

  return render(
    <TestWrapper>
      <PublicationPreview
        data={
          {
            id: '1',
            type: 'publication',
            title: 'Some Title',
            excerpt: 'Some Description'
          } as PreviewExperiencePublicationType
        }
      />
    </TestWrapper>
  )
}

describe('PublicationPreview', () => {
  it('calls the HighlightItemPreview', () => {
    renderComponent()

    expect(mockHighlightItemPreview).toHaveBeenCalledWith(
      {
        title: 'Some Title (Publication)',
        description: 'Some Description'
      },
      expect.anything()
    )
  })
})
