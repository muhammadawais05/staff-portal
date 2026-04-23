import React, { ComponentProps } from 'react'

import InlineActionsSkeleton from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof InlineActionsSkeleton>) =>
  renderComponent(<InlineActionsSkeleton {...props} />)

describe('InlineActionsSkeleton', () => {
  it('renders InlineActionsSkeleton properly', () => {
    const { getAllByTestId } = render({
      numberOfButtons: 2
    })

    expect(getAllByTestId('InlineActionsWrapper-item')?.length).toBe(2)
    expect(getAllByTestId('SkeletonLoader.Button')?.length).toBe(2)
  })
})
