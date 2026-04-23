import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import { PreviewHighlightType } from '../../types'
import HighlightPreview from '../HighlightPreview/HighlightPreview'
import HighlightsPreview from './HighlightsPreview'

jest.mock('../HighlightPreview/HighlightPreview', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockHighlightPreview = HighlightPreview as unknown as jest.Mock

const renderComponent = () => {
  mockHighlightPreview.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <HighlightsPreview
          fullName='Talent Name'
          highlights={[
            { id: '1', type: 'education' } as PreviewHighlightType,
            { id: '2', type: 'portfolio' } as PreviewHighlightType
          ]}
        />
      </Form>
    </TestWrapper>
  )
}

describe('HighlightsPreview', () => {
  it('calls HighlightPreview', () => {
    renderComponent()

    expect(mockHighlightPreview).toHaveBeenNthCalledWith(
      1,
      {
        sortable: undefined,
        fullName: 'Talent Name',
        highlight: { id: '1', type: 'education' }
      },
      expect.anything()
    )

    expect(mockHighlightPreview).toHaveBeenNthCalledWith(
      2,
      {
        sortable: undefined,
        fullName: 'Talent Name',
        highlight: { id: '2', type: 'portfolio' }
      },
      expect.anything()
    )
  })
})
