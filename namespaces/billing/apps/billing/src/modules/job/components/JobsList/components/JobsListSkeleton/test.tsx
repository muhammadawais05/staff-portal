import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import JobsListSkeleton from '.'

const render = () => renderComponent(<JobsListSkeleton />)

describe('JobsListSkeleton', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })
})
