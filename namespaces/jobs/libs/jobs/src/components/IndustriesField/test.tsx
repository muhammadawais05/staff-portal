import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import { IndustryFragment } from '../../data'
import IndustriesField from '.'

const arrangeTest = (industries: IndustryFragment[]) =>
  render(
    <TestWrapper>
      <IndustriesField industries={industries} />
    </TestWrapper>
  )

describe('IndustriesField', () => {
  it('renders industries list with tag as link', () => {
    arrangeTest([
      {
        id: 'gderssawww',
        name: 'Retail'
      }
    ])

    const TAG_URL =
      '/talents?badges%5Bindustries%5D%5B%5D=Retail&logic=and&sort%5Border%5D=desc&sort%5Btarget%5D=relevance'

    expect(screen.getByTestId('industries-list')).toBeInTheDocument()
    expect(screen.getByTestId('industry-tag-link')).toBeInTheDocument()
    expect(screen.getByTestId('industry-tag-link')).toHaveAttribute(
      'href',
      TAG_URL
    )
  })

  it('does not render industries list when it not provided', () => {
    arrangeTest([])

    expect(screen.queryByTestId('industries-list')).not.toBeInTheDocument()
  })
})
