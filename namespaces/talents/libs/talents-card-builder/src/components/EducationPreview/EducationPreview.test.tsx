import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'
import EducationPreview from './EducationPreview'

jest.mock('../HighlightItemPreview/HighlightItemPreview')

const mockHighlightItemPreview = HighlightItemPreview as jest.Mock

const renderComponent = () => {
  mockHighlightItemPreview.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <EducationPreview
        data={{
          id: '1',
          type: 'education',
          degree: 'Degree Title',
          fieldOfStudy: 'Study Type',
          title: 'University',
          yearFrom: 2021,
          yearTo: 2022,
          location: 'Location'
        }}
      />
    </TestWrapper>
  )
}

describe('EducationPreview', () => {
  it('calls the HighlightItemPreview', () => {
    renderComponent()

    expect(mockHighlightItemPreview).toHaveBeenCalledWith(
      {
        endDate: 2022,
        startDate: 2021,
        title: 'Degree Title in Study Type at University'
      },
      expect.anything()
    )
  })
})
