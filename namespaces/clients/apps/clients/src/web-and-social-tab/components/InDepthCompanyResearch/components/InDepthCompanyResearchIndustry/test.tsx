import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetClientIndustries } from '../../../../utils'
import InDepthCompanyResearchIndustry from '.'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'

jest.mock('../../../../utils')

type Props = ComponentProps<typeof InDepthCompanyResearchIndustry>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearchIndustry {...props} />
    </TestWrapper>
  )

const mockUseGetClientIndustries = useGetClientIndustries as jest.Mock

describe('InDepthCompanyResearchIndustry', () => {
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
      company: {
        industry: 'test'
      } as GetInDepthCompanyResearchClientFragment
    })

    expect(getByTestId('EditableField-industry-value')).toHaveTextContent(
      'test'
    )
  })
})
