import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'

import TalentAutocompleteItem, { TalentItem } from './TalentAutocompleteItem'

const arrangeTest = (item: TalentItem) =>
  render(
    <TestWrapper>
      <TalentAutocompleteItem
        item={item}
        onDelete={() => {}}
        displayValue='test-display-value'
      />
    </TestWrapper>
  )

describe('TalentAvailabilityRequests', () => {
  it('shows just the display value when talent activity is normal', () => {
    arrangeTest({
      text: 'Niesha Breitenberg',
      value: 'VjEtVGFsZW50LTc1NTc5NA',
      label: 'Niesha Breitenberg',
      node: {
        id: 'VjEtVGFsZW50LTc1NTc5NA',
        availabilityRequestMetadata: {
          lowActivity: false,
          pending: 0,
          prediction: 0.4085468267014902,
          recentConfirmed: 3,
          recentRejected: 0
        }
      }
    })

    fireEvent.mouseOver(
      screen.getByTestId('talent-autocomplete-item:display-value')
    )

    expect(
      screen.queryByTestId('talent-autocomplete-item:tooltip')
    ).not.toBeInTheDocument()
  })

  it('shows tooltip with activity data when talent activity is low', () => {
    arrangeTest({
      text: 'Shante Weber',
      value: 'VjEtVGFsZW50LTExNDY1ODg',
      label: 'Shante Weber',
      node: {
        id: 'VjEtVGFsZW50LTExNDY1ODg',
        availabilityRequestMetadata: {
          lowActivity: true,
          pending: 3,
          prediction: 0.06159860143787212,
          recentConfirmed: 0,
          recentRejected: 1
        }
      }
    })

    assertOnTooltip(
      screen.getByTestId('talent-autocomplete-item:display-value'),
      tooltip => {
        expect(tooltip).toHaveTextContent(
          'Talent has low-activity, he is not likely to accept a new AR.Acceptance prediction rate: 6%Pending: 3Recently accepted: 0Recently rejected: 1'
        )
      }
    )
  })
})
