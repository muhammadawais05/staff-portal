import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { FinalForm } from '@toptal/picasso-forms'

import TagListField from './TagListField'
import getTagItemMock from '../../mocks/get-tag-item-mock/get-tag-item-mock'

describe('TagListField', () => {
  it('toggles the item on click', () => {
    const industry = getTagItemMock({
      id: 'industry-1',
      name: 'Industry Name'
    })

    render(
      <FinalForm onSubmit={jest.fn()} initialValues={{ industries: [] }}>
        {({ values }) => (
          <>
            <TagListField
              name='industries'
              data={[industry]}
              title='test'
              testId='1'
            />
            <span data-testid='preview'>{values.industries.join(',')}</span>
          </>
        )}
      </FinalForm>
    )

    expect(screen.getByTestId('preview').textContent).toBe('')

    fireEvent.click(screen.getByText('Industry Name'))

    expect(screen.getByTestId('preview').textContent).toBe('industry-1')

    fireEvent.click(screen.getByText('Industry Name'))

    expect(screen.getByTestId('preview').textContent).toBe('')
  })
})
