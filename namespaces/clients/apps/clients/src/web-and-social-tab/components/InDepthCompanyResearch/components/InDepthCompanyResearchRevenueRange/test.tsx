import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetClientRevenueRanges } from '../../../../utils'
import InDepthCompanyResearchRevenueRange from '.'
import { GetInDepthCompanyResearchClientFragment } from '../../../../data'

jest.mock('../../../../utils')

const arrangeTest = (
  props: ComponentProps<typeof InDepthCompanyResearchRevenueRange>
) =>
  render(
    <TestWrapper>
      <InDepthCompanyResearchRevenueRange {...props} />
    </TestWrapper>
  )

const mockUseGetClientRevenueRanges = useGetClientRevenueRanges as jest.Mock

describe('InDepthCompanyResearchRevenueRange', () => {
  it('displays editor', () => {
    mockUseGetClientRevenueRanges.mockImplementation(() => ({
      request: jest.fn(),
      options: ['1', '2', '3']
    }))

    arrangeTest({
      name: 'revenueRange',
      onChange: jest.fn(),
      queryValue: jest.fn(),
      company: {
        revenueRange: 'test'
      } as GetInDepthCompanyResearchClientFragment
    })

    expect(
      screen.getByTestId('EditableField-revenueRange-value')
    ).toHaveTextContent('test')
  })
})
