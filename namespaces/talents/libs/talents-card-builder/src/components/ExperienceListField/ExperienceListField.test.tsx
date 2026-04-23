import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { FinalForm } from '@toptal/picasso-forms'

import ExperienceListField from './ExperienceListField'
import getProfileExperienceMock from '../../mocks/get-profile-experience-mock/get-profile-experience-mock'
import getProfilePublicationMock from '../../mocks/get-profile-publication-mock/get-profile-publication-mock'

describe('ExperienceListField', () => {
  it('toggles the item on click', () => {
    const experience = getProfileExperienceMock({
      id: 'ex1',
      title: 'Item'
    })

    const publication = getProfilePublicationMock({
      id: 'p1',
      title: 'Blog post title'
    })

    render(
      <FinalForm onSubmit={jest.fn()} initialValues={{ experience: [] }}>
        {({ values }) => (
          <>
            <ExperienceListField
              talentId='id'
              name='experience'
              experiences={[experience]}
              title='Experience'
              approvedMentor
              fullName='Talent Name'
              publications={[publication]}
            />
            <span data-testid='preview'>
              {JSON.stringify(values.experience)}
            </span>
          </>
        )}
      </FinalForm>
    )

    expect(screen.getByTestId('preview').textContent).toBe('[]')

    fireEvent.click(screen.getByText('Item'))

    expect(screen.getByTestId('preview').textContent).toBe(
      '[{"type":"portfolio","id":"ex1"}]'
    )

    fireEvent.click(screen.getByText(/Blog post title/))

    expect(screen.getByTestId('preview').textContent).toBe(
      '[{"type":"portfolio","id":"ex1"},{"type":"publication","id":"p1"}]'
    )

    fireEvent.click(screen.getByText(/Blog post title/))

    expect(screen.getByTestId('preview').textContent).toBe(
      '[{"type":"portfolio","id":"ex1"}]'
    )

    fireEvent.click(screen.getByText('Toptal Mentor'))

    expect(screen.getByTestId('preview').textContent).toBe(
      '[{"type":"portfolio","id":"ex1"},{"type":"mentorship","id":"id"}]'
    )
  })
})
