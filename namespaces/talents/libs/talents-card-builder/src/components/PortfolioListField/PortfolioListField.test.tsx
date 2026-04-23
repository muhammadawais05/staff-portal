import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { FinalForm } from '@toptal/picasso-forms'

import PortfolioListField from '.'
import getProfilePortfolioItemMock from '../../mocks/get-profile-portfolio-item-mock/get-profile-portfolio-item-mock'

describe('PortfolioListField', () => {
  it('toggles the item on click', () => {
    const portfolioItem = getProfilePortfolioItemMock({
      id: 'portfolioItem1',
      title: 'My amazing website'
    })

    render(
      <FinalForm onSubmit={jest.fn()} initialValues={{ portfolio: [] }}>
        {({ values }) => (
          <>
            <PortfolioListField
              name='portfolio'
              title='Mock title'
              data={[portfolioItem]}
            />
            <span data-testid='preview'>{values.portfolio.join(',')}</span>
          </>
        )}
      </FinalForm>
    )

    expect(screen.getByTestId('preview').textContent).toBe('')

    fireEvent.click(screen.getByText('My amazing website'))

    expect(screen.getByTestId('preview').textContent).toBe('portfolioItem1')
  })
})
