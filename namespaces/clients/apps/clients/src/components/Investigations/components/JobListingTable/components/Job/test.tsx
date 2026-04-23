import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Job from '.'

const arrangeTest = (props: ComponentProps<typeof Job>) =>
  render(
    <TestWrapper>
      <Job {...props} />
    </TestWrapper>
  )

const title = 'Lead Research Developer (247267)'
const webResource = {
  text: '123',
  url: 'https://staging.toptal.net/platform/staff/jobs/247267'
}

describe('Job', () => {
  it('default render', () => {
    arrangeTest({ title, webResource })

    const link = screen.getByTestId('Job-link')

    expect(link).toHaveAttribute('href', webResource.url)
    expect(link).toHaveTextContent(title)
  })
})
