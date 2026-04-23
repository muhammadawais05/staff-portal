import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { FinalForm } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import EducationListField, {
  EducationListFieldProps
} from './EducationListField'
import getProfileEducationMock from '../../mocks/get-profile-education-mock/get-profile-education-mock'

const renderComponent = (props: Pick<EducationListFieldProps, 'data'>) =>
  render(
    <TestWrapper>
      <FinalForm onSubmit={jest.fn()} initialValues={{ educations: [] }}>
        {({ values }) => (
          <>
            <EducationListField name='educations' {...props} />
            <span data-testid='preview'>
              {values.educations
                .map((item: { id: string }) => item.id)
                .join(',')}
            </span>
          </>
        )}
      </FinalForm>
    </TestWrapper>
  )

describe('EducationListField', () => {
  it('toggles the item on click', () => {
    const educations = [
      getProfileEducationMock({
        id: 'education-1',
        fieldOfStudy: 'Information Systems',
        degree: "Master's Degree"
      })
    ]

    renderComponent({
      data: educations
    })

    expect(screen.getByTestId('preview').textContent).toBe('')

    fireEvent.click(screen.getByText("Master's Degree in Information Systems"))

    expect(screen.getByTestId('preview').textContent).toBe('education-1')
  })
})
