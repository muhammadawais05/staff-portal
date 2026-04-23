import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import InternalTeam from '.'
import { internalTeamFragmentMock } from '../../data/internal-team-fragment.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/DetailedList')

jest.mock('../../utils', () => ({
  useGetInternalTeamItems: () => ['a', 'b']
}))

const renderComponent = (props: ComponentProps<typeof InternalTeam>) =>
  render(
    <TestWrapper>
      <InternalTeam {...props} />
    </TestWrapper>
  )

describe('InternalTeam', () => {
  it('renders list of internal team fields', () => {
    renderComponent({
      data: internalTeamFragmentMock
    })

    expect(screen.getByTestId('DetailedList')).toBeInTheDocument()
  })
})
