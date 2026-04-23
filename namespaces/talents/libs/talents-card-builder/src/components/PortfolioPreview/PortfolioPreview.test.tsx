import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'

import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'
import PortfolioPreview from './PortfolioPreview'

jest.mock('../HighlightItemPreview/HighlightItemPreview')

const mockHighlightItemPreview = HighlightItemPreview as jest.Mock

const renderComponent = () => {
  mockHighlightItemPreview.mockImplementation(
    ({ children }: { children: ReactNode }) => <>{children}</>
  )

  return render(
    <TestWrapper>
      <PortfolioPreview
        data={{
          id: '1',
          type: 'portfolio',
          title: 'Company Name',
          description: 'Some Description'
        }}
      />
    </TestWrapper>
  )
}

describe('PortfolioPreview', () => {
  it('calls the HighlightItemPreview', () => {
    renderComponent()

    expect(mockHighlightItemPreview).toHaveBeenCalledWith(
      {
        title: 'Worked on Company Name',
        description: 'Some Description'
      },
      expect.anything()
    )
  })
})
