import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import AutocompleteHighlightOptionSubLabel, {
  Props
} from './AutocompleteHighlightOptionSubLabel'

const arrangeTest = ({ nodeTypes, nodeTypeTitles, status }: Props) =>
  render(
    <TestWrapper>
      <AutocompleteHighlightOptionSubLabel
        status={status}
        nodeTypes={nodeTypes}
        nodeTypeTitles={nodeTypeTitles}
      />
    </TestWrapper>
  )

describe('AutocompleteHighlightOptionSubLabel', () => {
  it('renders titleized node types', async () => {
    arrangeTest({
      nodeTypes: ['type_1', 'type_2']
    })

    expect(screen.getByText('Type 1, Type 2')).toBeInTheDocument()
  })

  it('renders titleized node type titles if they are provided', async () => {
    arrangeTest({
      nodeTypes: ['type_1', 'type_2', 'top_screen'],
      nodeTypeTitles: ['Title string 1', 'Title string 2', 'TopScreen']
    })

    expect(
      screen.getByText('Title String 1, Title String 2, TopScreen')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('Type 1, Type 2, Top Screen')
    ).not.toBeInTheDocument()
  })

  it('renders titleized status for companies', () => {
    arrangeTest({
      nodeTypes: ['company'],
      status: 'test_status'
    })

    expect(screen.getByText('Company - Test Status')).toBeInTheDocument()
  })
})
