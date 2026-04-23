import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { TalentProfileIndustrySetFragment } from '../../../../data'
import TalentIndustries, { Props } from './TalentIndustries'

jest.mock('../IndustryTagWithTooltip', () => ({
  __esModule: true,
  default: ({ industryName }: { industryName: string }) => (
    <div data-testid='industry-tag'>{industryName}</div>
  )
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapperWithMocks>
      <TalentIndustries {...props} />
    </TestWrapperWithMocks>
  )

describe('TalentIndustries', () => {
  it('render all provided industries', () => {
    arrangeTest({
      industrySets: [
        {
          industry: {
            id: 'VjEtSW5kdXN0cnktODM4',
            name: 'Video Streaming'
          },
          connections: {
            nodes: [
              {
                id: 'VjEtRW1wbG95bWVudC0xNzc2Njc',
                company: 'ClipIt, Inc (via Toptal)',
                __typename: 'Employment'
              }
            ],
            totalCount: 1
          }
        },
        {
          industry: {
            id: 'VjEtSW5kdXN0cnktODE2',
            name: 'Mobile'
          },
          connections: {
            nodes: [
              {
                id: 'VjEtRW1wbG95bWVudC0xNjQ5MjM',
                company: '7 Dragons, Inc',
                __typename: 'Employment'
              }
            ],
            totalCount: 1
          }
        }
      ] as TalentProfileIndustrySetFragment[]
    })

    expect(screen.queryAllByTestId('industry-tag')).toHaveLength(2)
    expect(screen.getByText('Video Streaming')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
  })
})
