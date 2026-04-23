import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { FinalForm } from '@toptal/picasso-forms'

import EmploymentListField from './EmploymentListField'
import getProfileEmploymentMock from '../../mocks/get-profile-employment-mock/get-profile-employment-mock'

describe('EmploymentListField', () => {
  it('toggles the item on click', () => {
    const employment = getProfileEmploymentMock({
      id: 'e1',
      position: 'Lead developer',
      experienceItems: ['Line 1', 'Line 2']
    })

    render(
      <FinalForm onSubmit={jest.fn()} initialValues={{ employments: [] }}>
        {({ values }) => (
          <>
            <EmploymentListField name='employments' data={[employment]} />
            <span data-testid='preview'>
              {JSON.stringify(values.employments)}
            </span>
          </>
        )}
      </FinalForm>
    )

    expect(screen.getByTestId('preview').textContent).toBe('[]')

    fireEvent.click(screen.getByText('Line 1'))

    expect(screen.getByTestId('preview').textContent).toBe(
      '[{"id":"e1","description_items":["Line 1"],"type":"employment"}]'
    )

    fireEvent.click(screen.getByText('Line 2'))

    expect(screen.getByTestId('preview').textContent).toBe(
      '[{"id":"e1","description_items":["Line 1","Line 2"],"type":"employment"}]'
    )

    fireEvent.click(screen.getByText('Line 1'))

    expect(screen.getByTestId('preview').textContent).toBe(
      '[{"id":"e1","description_items":["Line 2"],"type":"employment"}]'
    )

    fireEvent.click(screen.getByText('Lead developer'))

    expect(screen.getByTestId('preview').textContent).toBe('[]')
  })
})
