import React, { FC } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import WorkEligibility, { Props } from './WorkEligibility'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: () => jest.fn(() => '20 Nov 2021')
}))

const SHOW_MORE = 'Show More'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  ShowMore: (({ children }) => (
    <>
      {children}
      <div>{SHOW_MORE}</div>
    </>
  )) as FC
}))

const travelVisas = [
  {
    id: 'aa',
    expiryDate: 'Sat Nov 20 2021 00:27:16 GMT+0100',
    visaType: 'Travel',
    country: {
      id: 'c-id1',
      name: 'Croatia'
    }
  },
  {
    id: 'bb',
    expiryDate: null,
    visaType: 'B1/B2',
    country: {
      id: 'c-id2',
      name: 'United States'
    }
  },
  {
    id: 'cc',
    expiryDate: 'Sat Nov 20 2021 00:27:16 GMT+0100',
    visaType: 'EU Citizenship',
    country: {
      id: 'c-id3',
      name: 'Brasil'
    }
  },
  {
    id: 'dd',
    expiryDate: null,
    visaType: 'Identity card',
    country: {
      id: 'c-id4',
      name: 'Poland'
    }
  }
]

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <WorkEligibility {...props} />
    </TestWrapper>
  )

describe('WorkEligibility', () => {
  it('renders work eligibility items', () => {
    const { container } = arrangeTest({
      travelVisas: [travelVisas[0], travelVisas[1]]
    })

    expect(container).toHaveTextContent(
      'Croatia - based on Travel, expires at 20 Nov 2021'
    )

    expect(container).toHaveTextContent('United States - based on B1/B2')
  })

  it('displays show more in case of more than 3 items', () => {
    const { getByText } = arrangeTest({ travelVisas })

    expect(getByText(SHOW_MORE)).toBeInTheDocument()
  })
})
