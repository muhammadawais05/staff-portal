import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { investigationsDataMock } from '../../data/get-investigations.mock'
import InvestigationResolution from '.'

jest.mock(
  '../../utils',
  () => ({
    getResolutionItems: () => [
      ['label1', 'value1'],
      ['label2', 'value2']
    ]
  })
)

const arrangeTest = (props: ComponentProps<typeof InvestigationResolution>) =>
  render(
    <TestWrapper>
      <InvestigationResolution {...props} />
    </TestWrapper>
  )

const resolution = investigationsDataMock.investigations.nodes[1].resolution

describe('InvestigationResolution', () => {
  it('default render', () => {
    arrangeTest({ resolution })

    const labels = screen.getAllByTestId('InvestigationResolution-label')
    const values = screen.getAllByTestId('InvestigationResolution-value')

    expect(labels[0]).toHaveTextContent('label1')
    expect(labels[1]).toHaveTextContent('label2')
    expect(values[0]).toHaveTextContent('value1')
    expect(values[1]).toHaveTextContent('value2')
  })
})
