import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'

import HighlightItemPreview from '../HighlightItemPreview/HighlightItemPreview'
import EmploymentPreview from './EmploymentPreview'

jest.mock('../HighlightItemPreview/HighlightItemPreview')

const mockHighlightItemPreview = HighlightItemPreview as jest.Mock

const renderComponent = () => {
  mockHighlightItemPreview.mockImplementation(
    ({ children }: { children: ReactNode }) => <>{children}</>
  )

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <EmploymentPreview
          data={{
            id: '1',
            type: 'employment',
            position: 'Project Manager',
            experienceItems: ['Hello World'],
            startDate: 2021,
            endDate: 2022,
            company: 'Company Name'
          }}
        />
      </Form>
    </TestWrapper>
  )
}

describe('EmploymentPreview', () => {
  it('calls the HighlightItemPreview', () => {
    renderComponent()

    expect(mockHighlightItemPreview).toHaveBeenCalledWith(
      {
        endDate: 2022,
        startDate: 2021,
        title: 'Project Manager at Company Name',
        children: expect.anything()
      },
      expect.anything()
    )

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
