import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetClientIndustries } from '../../../../utils'
import InDepthCompanyResearchSecondaryIndustry from '.'

jest.mock('../../../../utils')

type Props = ComponentProps<typeof InDepthCompanyResearchSecondaryIndustry>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearchSecondaryIndustry {...props} />
    </TestWrapper>
  )

const mockUseGetClientIndustries = useGetClientIndustries as jest.Mock

describe('InDepthCompanyResearchSecondaryIndustry', () => {
  it('displays editor', () => {
    mockUseGetClientIndustries.mockImplementation(() => ({
      request: jest.fn(),
      options: ['1', '2', '3']
    }))

    const { getByTestId } = arrangeTest({
      name: 'industry',
      disabled: false,
      onChange: jest.fn(),
      queryValue: jest.fn(),
      value: 'test'
    })

    expect(getByTestId('EditableField-industry-value')).toHaveTextContent(
      'test'
    )
  })
})
