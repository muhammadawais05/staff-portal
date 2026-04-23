import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import Claimer from '.'

const arrangeTest = (props: ComponentProps<typeof Claimer>) =>
  render(
    <TestWrapper>
      <Claimer {...props} />
    </TestWrapper>
  )

const claimer = {
  id: 'VjEtU3RhZmYtNjg1NzI2',
  fullName: 'Hugo Vaquera',
  webResource: {
    text: '123',
    url: 'https://staging.toptal.net/platform/staff/staff/2425877'
  }
}

describe('Claimer', () => {
  it('default render', () => {
    arrangeTest({
      claimer
    })

    const link = screen.getByTestId('Claimer-link')

    expect(link).toHaveAttribute('href', claimer.webResource.url)
    expect(link).toHaveTextContent(claimer.fullName)
  })

  describe('when claimer is not passed', () => {
    it('render placeholder', () => {
      arrangeTest({
        claimer: null
      })

      expect(screen.getByTestId('Claimer-text')).toHaveTextContent(NO_VALUE)
    })
  })
})
