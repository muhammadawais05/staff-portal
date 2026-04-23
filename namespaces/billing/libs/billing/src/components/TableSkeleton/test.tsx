import React, { ComponentProps } from 'react'

import TableSkeleton from '.'
import renderComponent from '../../utils/tests'

const exampleComponent = (
  <thead data-testid='example'>
    <tr>
      <td>Example</td>
    </tr>
  </thead>
)

const render = (props: ComponentProps<typeof TableSkeleton>) =>
  renderComponent(<TableSkeleton {...props} />)

describe('TableSkeleton', () => {
  it('renders TableSkeleton properly', () => {
    const { getAllByTestId, getByTestId } = render({
      row: 2,
      column: 3,
      children: exampleComponent
    })

    expect(getByTestId('example')).toBeInTheDocument()
    expect(getAllByTestId('TableSkeleton-row')?.length).toBe(2)
    expect(getAllByTestId('TableSkeleton-cell')?.length).toBe(6)
  })
})
