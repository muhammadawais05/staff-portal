import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import InDepthCompanyResearchBusinessModels from '.'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useLazyQuery: () => [jest.fn(), { data: {} }]
}))
jest.mock('@staff-portal/editable/src/inline-edit/components/', () => ({
  InlineTagSelector: jest
    .fn()
    .mockImplementation(() => <div data-testid='InlineTagSelector' />)
}))

type Props = ComponentProps<typeof InDepthCompanyResearchBusinessModels>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearchBusinessModels {...props} />
    </TestWrapper>
  )

describe('InDepthCompanyResearchBusinessModels', () => {
  it('displays editor', () => {
    const { getByTestId } = arrangeTest({
      clientId: '123',
      name: 'businessModels',
      onChange: jest.fn(),
      value: [{ text: 'test', value: 'test' }]
    })

    expect(getByTestId('EditableField-businessModels-name')).toHaveTextContent(
      'businessModels'
    )
  })
})
