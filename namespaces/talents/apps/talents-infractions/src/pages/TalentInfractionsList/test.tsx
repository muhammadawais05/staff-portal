import React from 'react'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import { MemoryRouter, useLocation } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createGetInfractionsListMock } from './data/get-infractions-list/mocks'
import TalentInfractionsList from './TalentInfractionsList'

jest.mock('@staff-portal/navigation', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: jest.fn()
}))

const mockUseLocation = useLocation as jest.Mock

const arrangeTest = ({ mocks = [] }: { mocks?: MockedResponse[] }) =>
  render(
    <MemoryRouter>
      <TestWrapperWithMocks mocks={mocks}>
        <TalentInfractionsList />
      </TestWrapperWithMocks>
    </MemoryRouter>
  )

describe('<TalentInfractionsList />', () => {
  it('decodes search bar query params', async () => {
    mockUseLocation.mockReturnValue({
      search: '?badges[keywords][]=Javascript&badges[keywords][]=PHP'
    })

    const { container } = arrangeTest({
      mocks: [createGetInfractionsListMock()]
    })

    await act(() => Promise.resolve())

    expect(container.textContent).toContain('"Javascript" keywords')
    expect(container.textContent).toContain('"PHP" keywords')
  })
})
