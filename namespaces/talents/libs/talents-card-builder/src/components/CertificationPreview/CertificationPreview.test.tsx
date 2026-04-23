import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'
import CertificationPreview from './CertificationPreview'

jest.mock('../HighlightItemPreview/HighlightItemPreview')

const mockHighlightItemPreview = HighlightItemPreview as jest.Mock

const renderComponent = () => {
  mockHighlightItemPreview.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <CertificationPreview
        data={{
          id: '1',
          type: 'certification',
          certificate: 'Certification Title',
          institution: 'Institution Name',
          validFromMonth: 1,
          validFromYear: 2021,
          validToMonth: 4,
          validToYear: 2022
        }}
      />
    </TestWrapper>
  )
}

describe('CertificationPreview', () => {
  it('calls the HighlightItemPreview', () => {
    renderComponent()

    expect(mockHighlightItemPreview).toHaveBeenCalledWith(
      {
        endDate: 'May 2022',
        startDate: 'February 2021',
        title: 'Certification Title at Institution Name'
      },
      expect.anything()
    )
  })
})
